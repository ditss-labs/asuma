import '../config.js';
import * as baileys from "@whiskeysockets/baileys";
import chalk from 'chalk';
import { fileTypeFromBuffer } from 'file-type'
import fs from 'fs';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { convertImgToWebp, convertVidToWebp, attachExifToWebp } from '../lib/sticker.js';
//import { getBuffer } from '../lib/fetchBuffer.js';
const { proto, 
       getContentType, 
       areJidsSameUser, 
       generateWAMessage, 
       downloadContentFromMessage,
       jidNormalizedUser,
       generateWAMessageFromContent 
      } = baileys;
import { getBuffer } from '../lib/fetchBuffer.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Serialize Message
 */
export function smsg(Ditss, m, store) {
    if (!m) return m;

    let M = proto?.WebMessageInfo;
    if (!M) {
        console.error("proto.WebMessageInfo tidak tersedia.");
        return m;
    }

    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');
        m.sender = Ditss.decodeJid(m.fromMe ? Ditss.user.id : m.participant || m.key.participant || m.chat || '');
        if (m.isGroup) m.participant = Ditss.decodeJid(m.key.participant) || '';
    }

    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg = (m.mtype === 'viewOnceMessage') ? 
            m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : 
            m.message[m.mtype];

        m.body = m.message.conversation || m.msg.caption || m.msg.text || 
                 (m.mtype === 'listResponseMessage' && m.msg.singleSelectReply.selectedRowId) || 
                 (m.mtype === 'buttonsResponseMessage' && m.msg.selectedButtonId) || 
                 (m.mtype === 'viewOnceMessage' && m.msg.caption) || m.text;

        let quoted = m.quoted = m.msg.contextInfo?.quotedMessage || null;
        m.mentionedJid = m.msg.contextInfo?.mentionedJid || [];

        if (m.quoted) {
            let type = Object.keys(m.quoted)[0];
            m.quoted = m.quoted[type];

            if (type === 'productMessage') {
                type = Object.keys(m.quoted)[0];
                m.quoted = m.quoted[type];
            }
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted };

            m.quoted.mtype = type;
            m.quoted.id = m.msg.contextInfo?.stanzaId;
            m.quoted.chat = m.msg.contextInfo?.remoteJid || m.chat;
            m.quoted.isBaileys = m.quoted.id?.startsWith('BAE5') && m.quoted.id.length === 16;
            m.quoted.sender = Ditss.decodeJid(m.msg.contextInfo?.participant);
            m.quoted.fromMe = m.quoted.sender === Ditss.decodeJid(Ditss.user.id);
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || 
                            m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || '';
            m.quoted.mentionedJid = m.msg.contextInfo?.mentionedJid || [];

            m.getQuotedObj = async () => {
                if (!m.quoted.id) return false;
                let q = await store.loadMessage(m.chat, m.quoted.id, Ditss);
                return smsg(Ditss, q, store);
            };

            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            });

            m.quoted.delete = () => Ditss.sendMessage(m.quoted.chat, { delete: vM.key });
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => Ditss.copyNForward(jid, vM, forceForward, options);
            m.quoted.download = () => Ditss.downloadMediaMessage(m.quoted);
        }
    }

    if (m.msg?.url) m.download = () => Ditss.downloadMediaMessage(m.msg);
    m.text = m.body || m.msg.text || m.msg.caption || m.message.conversation || 
             m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || '';

  /*  m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? 
        Ditss.sendMedia(chatId, text, 'file', '', m, { ...options }) : 
        Ditss.sendText(chatId, text, m, { ...options });*/
    
    		m.reply = async (content, options = {}) => {
	const {
		quoted = m,
		chat = m.chat,
		caption = '',
		ephemeralExpiration = m.expiration || store?.messages[m.chat]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0,
		mentions = (typeof content === 'string' || typeof content.text === 'string' || typeof content.caption === 'string')
			? [...(content.text || content.caption || content).matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')
			: [],
		...validate
	} = options;

	const baseOptions = { ...options, quoted, ephemeralExpiration, ai: !m.isGroup };

	if (typeof content === 'object') {
		return Ditss.sendMessage(chat, content, baseOptions);
	} else if (typeof content === 'string') {
		try {
			if (/^https?:\/\//.test(content)) {
				const data = await axios.get(content, { responseType: 'arraybuffer' });
				const mime = data.headers['content-type'] || (await FileType.fromBuffer(data.data)).mime;

				if (/gif|image|video|audio|pdf|stream/i.test(mime)) {
					return Ditss.sendMedia(chat, data.data, '', caption, quoted, content);
				} else {
					return Ditss.sendMessage(chat, { text: content, mentions, ...options, ai: !m.isGroup }, { quoted, ephemeralExpiration });
				}
			} else {
				return Ditss.sendMessage(chat, { text: content, mentions, ...options, ai: !m.isGroup }, { quoted, ephemeralExpiration });
			}
		} catch (e) {
			return Ditss.sendMessage(chat, { text: content, mentions, ...options, ai: !m.isGroup }, { quoted, ephemeralExpiration });
		}
	}
}    
                Ditss.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
let mime = '';
let res = await axios.head(url)
mime = res.headers['content-type']
if (mime.split("/")[1] === "gif") {
return Ditss.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
}
let type = mime.split("/")[0]+"Message"
if (mime === "application/pdf"){
return Ditss.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
}
if (mime.split("/")[0] === "image"){
return Ditss.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
}
if (mime.split("/")[0] === "video"){
return Ditss.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
}
if (mime.split("/")[0] === "audio"){
return Ditss.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
}
}
            
            Ditss.sendSticker = async (jid, path, quoted, options = {}) => {
  const buff = Buffer.isBuffer(path)
    ? path
    : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split(',')[1], 'base64')
      : /^https?:\/\//.test(path)
        ? await (await getBuffer(path))
        : fs.existsSync(path)
          ? fs.readFileSync(path)
          : Buffer.alloc(0);

  let buffer;
  if (options && (options.packname || options.author)) {
    buffer = await attachExifToWebp(buff, options);
  } else {
    buffer = await (/video/.test((await import('file-type')).fileTypeFromBuffer(buff)?.mime))
      ? await convertVidToWebp(buff)
      : await convertImgToWebp(buff);
  }

  await Ditss.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
  return buffer;
}
            Ditss.downloadMediaMessage = async (message) => {
const msg = message.msg || message;
const mime = msg.mimetype || '';
const messageType = (message.type || mime.split('/')[0]).replace(/Message/gi, '');
const stream = await downloadContentFromMessage(msg, messageType);
let buffer = Buffer.from([]);
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
return buffer
}
            
            Ditss.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]

    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }

    let type = await fileTypeFromBuffer(buffer) || { ext: 'bin', mime: 'application/octet-stream' }
    let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename

    // save to file
    await fs.writeFileSync(trueFileName, buffer)

    return trueFileName
}


                Ditss.sendGroupInvite = async (jid, participant, inviteCode, inviteExpiration, groupName = 'Unknown Subject', caption = 'Invitation to join my WhatsApp group', jpegThumbnail = null, options = {}) => {
		const msg = proto.Message.fromObject({
			groupInviteMessage: {
				inviteCode,
				inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
				groupJid: jid,
				groupName,
				jpegThumbnail: Buffer.isBuffer(jpegThumbnail) ? jpegThumbnail : null,
				caption,
				contextInfo: {
					mentionedJid: options.mentions || []
				}
			}
		});
		const message = generateWAMessageFromContent(participant, msg, options);
		const invite = await Ditss.relayMessage(participant, message.message, { messageId: message.key.id })
		return invite
	}
    
    m.react = (u) => Ditss.sendMessage(m.chat, { react: { text: u, key: m.key }})
    
    Ditss.sendText = (jid, text, quoted = '', options) => Ditss.sendMessage(jid, { text: text, ...options }, { quoted });
    
    m.copy = () => smsg(Ditss, M.fromObject(M.toObject(m)));
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => Ditss.copyNForward(jid, m, forceForward, options);

    Ditss.appendTextMessage = async (text, chatUpdate) => {
        let messages = await generateWAMessage(m.chat, { text, mentions: m.mentionedJid }, {
            userJid: Ditss.user.id,
            quoted: m.quoted?.fakeObj
        });
        messages.key.fromMe = areJidsSameUser(m.sender, Ditss.user.id);
        messages.key.id = m.key.id;
        messages.pushName = m.pushName;
        if (m.isGroup) messages.participant = m.sender;

        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        };
        Ditss.ev.emit('messages.upsert', msg);
    };

    return m;
}
export async function GroupParticipantsUpdate(Ditss, { id, participants, author, action }) {
    try {
        if (!global.db?.groups?.[id]) return;

        if (!global.store) global.store = {};
        if (!global.store.groupMetadata) global.store.groupMetadata = {};

        let metadata;

        if (action === 'add') {
            try {
                metadata = await Ditss.groupMetadata(id);
                global.store.groupMetadata[id] = metadata;
            } catch {
                metadata = global.store.groupMetadata[id];
            }
        } else {
            metadata = global.store.groupMetadata[id];
            if (!metadata) {
                try {
                    metadata = await Ditss.groupMetadata(id);
                    global.store.groupMetadata[id] = metadata;
                } catch {
                    return;
                }
            }
        }

        if (!metadata || !Array.isArray(metadata.participants)) return;

        for (let n of participants) {
            let participantJid = n;
            if (n.includes('@lid') && metadata.addressingMode === 'lid') {
                const participant = metadata.participants.find(p => p && (p.lid === n || p.id === n));
                if (participant && participant.jid) {
                    participantJid = participant.jid;
                }
            }

            const normalizedJid = jidNormalizedUser(participantJid);

            let profile;
            try {
                profile = await Ditss.profilePictureUrl(normalizedJid, 'image');
            } catch {
                profile = 'https://telegra.ph/file/95670d63378f7f4210f03.png';
            }

            let messageText;
            let shouldSend = false;
            const groupSettings = global.db.groups[id];
            const botNumber = Ditss?.user?.id?.split(':')?.[0] || Ditss?.user?.jid?.split('@')?.[0];
            const botPublic = global.db.set?.[botNumber]?.public ?? true;

            if (action === 'add' && groupSettings.welcome) {
                messageText = groupSettings?.text?.setwelcome || `Welcome to ${metadata.subject}\n@`;
                shouldSend = true;
            } 
            else if (action === 'remove' && groupSettings.leave) {
                messageText = groupSettings?.text?.setleave || `@\nLeaving From ${metadata.subject}`;
                shouldSend = true;
                
                if (jidNormalizedUser(Ditss.user.id) === normalizedJid || 
                    jidNormalizedUser(Ditss.user.lid) === normalizedJid) {
                    delete global.store.messages?.[id];
                    delete global.store.presences?.[id];
                    delete global.store.groupMetadata?.[id];
                    return;
                }
                
                metadata.participants = metadata.participants.filter(p => 
                    p && !(p.jid === normalizedJid || p.lid === n || p.id === n)
                );
            } 
            else if (action === 'promote' && groupSettings.promote) {
                messageText = groupSettings?.text?.setpromote || `@\nPromote From ${metadata.subject}\nBy @admin`;
                shouldSend = true;
                
                metadata.participants.forEach(p => {
                    if (p && (p.jid === normalizedJid || p.lid === n || p.id === n)) {
                        p.admin = 'admin';
                    }
                });
            } 
            else if (action === 'demote' && groupSettings.demote) {
                messageText = groupSettings?.text?.setdemote || `@\nDemote From ${metadata.subject}\nBy @admin`;
                shouldSend = true;
                
                metadata.participants.forEach(p => {
                    if (p && (p.jid === normalizedJid || p.lid === n || p.id === n)) {
                        p.admin = null;
                    }
                });
            }

            if (shouldSend && messageText && botPublic) {
                const mentionedJid = [normalizedJid];
                if (author) mentionedJid.push(author);

                const username = normalizedJid.split('@')[0];
                const adminUsername = author ? author.split('@')[0] : 'admin';
                
                const finalText = messageText
                    .replace('@subject', metadata.subject || 'Grup')
                    .replace('@admin', `@${adminUsername}`)
                    .replace(/@/g, `@${username}`);

                await Ditss.sendMessage(id, {
                    text: finalText,
                    mentions: mentionedJid,
                    contextInfo: {
                        mentionedJid: mentionedJid,
                        externalAdReply: {
                            title: action === 'add' ? 'Welcome' : 
                                   action === 'remove' ? 'Leaving' : 
                                   action.charAt(0).toUpperCase() + action.slice(1),
                            mediaType: 1,
                            previewType: 0,
                            thumbnailUrl: profile,
                            renderLargerThumbnail: true,
                            sourceUrl: global.my?.gh || 'https://github.com'
                        }
                    }
                }, { 
                    ephemeralExpiration: metadata?.ephemeralDuration || 0 
                });
            }
        }

        if (metadata) {
            metadata.size = metadata.participants.length;
            global.store.groupMetadata[id] = metadata;
        }

    } catch (error) {
        console.error('Error in GroupParticipantsUpdate:', error);
    }
}

fs.watchFile(__filename, () => {
    fs.unwatchFile(__filename);
    console.log(chalk.redBright(`Update ${__filename}`));
    import(`${import.meta.url}?update=${Date.now()}`)
        .then(() => console.log('Kode diperbarui!'))
        .catch(err => console.error('Gagal memperbarui:', err));
});
			   
