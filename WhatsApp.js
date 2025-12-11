import './config.js';
import { AutoGempa } from "./lib/autoGempa.js";
import chalk from 'chalk';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; 
import { fileTypeFromBuffer } from 'file-type'
import util from 'util';
import axios from 'axios';
import cron from 'node-cron';
import path from 'path';
import similarity from 'similarity';
const threshold = 0.72
import moment from 'moment-timezone';
import { spawn, exec, execSync } from 'child_process';
import ffmpeg from 'fluent-ffmpeg';
import JsConfuser from 'js-confuser'; 
import PhoneNumber from 'awesome-phonenumber';
import { LoadDataBase } from './source/loadDatabase.js';
import { downloadMediaMessage, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { runtime } from './lib/utils/runtime.js'
import { getBuffer } from './lib/fetchBuffer.js';
import { detectOperator } from './lib/func/detectOperator.js';
import { logErrorToFile } from './lib/utils/logErrorToFile.js';
import { fetchJson } from './lib/utils/fetchJson.js';
import { UguuSe, webp2mp4File, CatBox, AsumaCdn } from './lib/utils/uploader.js'
import { getRandom } from './lib/utils.js';
const userCache = {}
import { 
    cmdAdd, 
    cmdDel, 
    cmdAddHit, 
    addExpired, 
    getPosition, 
    getExpired, 
    getStatus, 
    checkStatus, 
    getAllExpired, 
    checkExpired 
} from './source/database.js';
import * as baileys from '@whiskeysockets/baileys';
const { proto, 
       makeWASocket, 
       useMultiFileAuthState, 
       jidDecode,
       delay
} = baileys;
const errorCache = {};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const errorFilePath = join(__dirname, 'database', 'error.json');
const packageJsonPath = join(__dirname, 'package.json');
const pkg = JSON.parse(await fsPromises.readFile(packageJsonPath, 'utf8'));
const folderUsers = path.join(process.cwd(), "database", "users");
/*
 * -----------------------------------------------------------------------------
 *  Author         : Ditss
 *  GitHub         : https://github.com/ditss-dev
 *  WhatsApp       : https://wa.me/6281513607731
 *  Channel        : https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L
 *  File           : WhatsApp.js
 *  Description    : Source code project Asuma - WhatsApp Bot
 *  Created Year   : 2025
 * -----------------------------------------------------------------------------
 *  📌 Feel free to use and modify this script.
 *  ⚠️  Please keep the header intact when redistributing.
 * -----------------------------------------------------------------------------
 */
export default async function (Ditss, m, store) {
    await LoadDataBase(Ditss, m);
    try {
let body = "";

try {
    body =
        (m.mtype === 'interactiveResponseMessage'
            ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson || "{}")?.id
            : "") ||
        m.message?.conversation ||
        m.message?.imageMessage?.caption ||
        m.message?.videoMessage?.caption ||
        m.message?.extendedTextMessage?.text ||
        m.message?.buttonsResponseMessage?.selectedButtonId ||
        m.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
        m.message?.templateButtonReplyMessage?.selectedId ||
        m.message?.messageContextInfo?.buttonsResponseMessage?.selectedButtonId ||
        m.message?.messageContextInfo?.listResponseMessage?.singleSelectReply?.selectedRowId ||
        m.text ||
        "";
} catch {
	body = m.text || "";
}

body = body.trim();
        const budy = (typeof m.text == 'string' ? m.text : '')
		m.device = /^3A/.test(m.id) ? 'ios' : m.id.startsWith('3EB') ? 'web' : /^.{21}/.test(m.id) ? 'android' : /^.{18}/.test(m.id) ? 'desktop' : 'unknown';
        const getGroupAdmins = (participants) =>{
    return participants
        .filter(u => u.admin === 'admin' || u.admin === 'superadmin')
        .map(u => u.jid);
		};
        const normalize = jid => jid.split(':')[0] + '@s.whatsapp.net';
		const botNumber = Ditss.decodeJid(Ditss.user.id);
		const groupMetadata = m.isGroup ? await Ditss.groupMetadata(m.chat).catch(() => ({})) : null;
		const groupMembers = m.isGroup ? groupMetadata.participants || [] : [];
		const groupAdmins = m.isGroup ? getGroupAdmins(groupMembers) : [];
        const isBotAdmins = m.isGroup ? groupAdmins.map(normalize).includes(normalize(botNumber)) : false;
        const isAdmins = m.isGroup ? groupAdmins.map(normalize).includes(normalize(m.sender)) : false;
        m.isAdmins = isAdmins
        m.isAdmin = isAdmins
        let isAdmin = isAdmins
        m.isBotAdmin = isBotAdmins
        m.isBotAdmins = isBotAdmins
        let isBotAdmin = isBotAdmins
        const userdb = global.db.users[m.sender]
        const usergroup = global.db.groups[m.chat]
        const set = db.set[botNumber]
        const premium = db.premium
        const isOwner = m && m.sender && info.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
        const isCreator = isOwner;
        //const prefixMatch = body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi);
        const prefixMatch = body.match(/^[^\w\s$>]/u);
        const prefix = prefixMatch ? prefixMatch[0] : "";
        const isCmd = prefix && body.startsWith(prefix);
        const command = isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : "";
        const args = body.trim().split(/ +/).slice(1);
        const q = args.join(' '), text = q
        const pushname = m.pushName || db.users[m.sender].name;
        const sender = m.key?.remoteJid || "unknown";
        const nomore = m.sender.replace(/[^0-9]/g, '')
        m.operator = (await detectOperator(nomore)).replace(/\s*\([^)]*\)/g, '');
        const ments = (text) => {
    text = typeof text === 'string' ? text : ''
    return text.includes('@') 
        ? [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') 
        : []
}
        const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        const isVip = db.users[m.sender] ? db.users[m.sender].vip : false
		const isBan = db.users[m.sender] ? db.users[m.sender].ban : false
		const isLimit = db.users[m.sender] ? (db.users[m.sender].limit > 0) : false
		const isPremium = isCreator || checkStatus(m.sender, premium) || false
		const isNsfw = m.isGroup ? (db.groups[m.chat]?.nsfw || false) : true;// modif
        //const isNsfw = m.isGroup ? db.groups[m.chat].nsfw : false
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        
        let ppuser, ppgroup, ppnyauser, ppnyaGrup;
try {
    ppuser = await Ditss.profilePictureUrl(m.sender, 'image');
} catch (err) {
    ppuser = `${api.ditss}/img/ppuserr.jpg`;
}
try {
    ppgroup = await Ditss.profilePictureUrl(m.chat, 'image');
} catch (err) {
    ppgroup = `${api.ditss}/img/ppuserr.jpg`;
}
try {
    ppnyauser = await getBuffer(ppuser);
} catch (e) {
    ppnyauser = await getBuffer(`${api.ditss}/img/ppuserr.jpg`);
}
try {
    ppnyaGrup = await getBuffer(ppgroup);
} catch (e) {
    ppnyaGrup = await getBuffer(`${api.ditss}/img/ppuserr.jpg`);
}
        
        // Filter mode self
if (!set.public && !isCreator) return
        
        
        
        function randomNomor(min, max = null) {
            if (max !== null) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
                return Math.floor(Math.random() * min) + 1
            }
        }
        const reply = (anu) => {
    const mentionJid = [m.sender]; 
    const { message, key } = generateWAMessageFromContent(m.chat, {
        interactiveMessage: {
            body: { text: null },
            footer: { text: anu },
            nativeFlowMessage: {
                ai: !m.isGroup,
                buttons: [
                    { text: "DitssGanteng" }
                ]
            }
        }
    }, {
        quoted: {
            key: {
                participant: m.sender,
                remoteJid: "0@s.whatsapp.net"
            },
            message: {
                conversation: `${body}`
            }
        },
        contextInfo: {
            mentionedJid: ments(anu)
        }
    });

    Ditss.relayMessage(m.chat, { viewOnceMessage: { message } }, { messageId: key.id });
};
        const JwbTrue = (tebak, exp, tambahan) => {
    let teks = `*🎉 SELAMAT!*\n\nKamu berhasil menjawab *${tebak}* dengan benar! 🧠✅\n\n💰 *+Rp ${exp}* saldo masuk\n${tambahan}`
    const context = {
        text: teks,
        contextInfo: {
            externalAdReply: {
                title: `🔥 Jawaban Kamu Tepat!`,
                body: `Keren banget!`,
                previewType: "PHOTO",
                thumbnailUrl: `https://telegra.ph/file/f8749fccf9b3320cd6307.png`,
                sourceUrl: global.my.web
            }
        }
    }
    return Ditss.sendMessage(m.chat, context, {
        quoted: m,
    })
}
        const waktuHabis = (jawaban) => {
    let teks = `⏰ *Waktu Habis!*\n\nYahh... waktumu udah habis 😥\n\n📌 Jawaban yang benar adalah:\n*${jawaban}*\n\nCoba lagi ya, semangat! 💪`
    const context = {
        text: teks,
        contextInfo: {
            externalAdReply: {
                title: `⏳ Telat Bro!`,
                body: "Next time lebih cepat ya 😎",
                previewType: "PHOTO",
                thumbnailUrl: `https://telegra.ph/file/030ebfc99f9cb5be7e8cb.png`,
                sourceUrl: global.my.web
            }
        }
    }
    return Ditss.sendMessage(m.chat, context, {
        quoted: m,
    })
}
        //furnion
        function isValidJid(jid) {
  return typeof jid === "string" && jid.endsWith("@s.whatsapp.net");
}
        function getUser(jid) {
  if (!isValidJid(jid)) return null;

  const file = path.join(folderUsers, `${jid}.json`);
  if (!fs.existsSync(file)) {
    const init = { limit: 10, premium: false };
    fs.writeFileSync(file, JSON.stringify(init, null, 2));
    userCache[jid] = init;
    return init;
  }
  if (!userCache[jid]) {
    userCache[jid] = JSON.parse(fs.readFileSync(file));
  }
  return userCache[jid];
}

function saveUser2(jid) {
  if (!isValidJid(jid)) return;

  const file = path.join(folderUsers, `${jid}.json`);
  if (userCache[jid]) {
    fs.writeFileSync(file, JSON.stringify(userCache[jid], null, 2));
  }
}

function getAllUsers() {
  let users = {};
  for (let file of fs.readdirSync(folderUsers)) {
    if (!file.endsWith(".json")) continue;
    const jid = file.replace(".json", "");
    if (!isValidJid(jid)) continue;
    users[jid] = getUser(jid);
  }
  return users;
}
        
async function detectOperatorPost(phoneNumber) {
  try {
    const { data } = await axios.post(
      "https://ditss.vercel.app/api/tools/detect-operator",
      { phoneNumber }, 
      {
        headers: { "Content-Type": "application/json" }
      }
    )
 //   console.log("✅ Respon:", data)
    return data.result?.operator || null
  } catch (error) {
    console.error("❌ Gagal:", error.response?.data || error.message)
    return null
  }
}
        
 async function revealAllAnswers(m, gameData) {
  const teksAkhir = `🧠 *Family 100*\n\n❓ Soal: ${gameData.soal}\n\n` +
    gameData.jawaban.map((j, i) => {
      const pengguna = gameData.terjawab?.[i]
      if (pengguna && typeof pengguna === 'string') {
        return `(${i + 1}) ${j} ✅ @${pengguna.split('@')[0]}`
      } else {
        return `(${i + 1}) ${j} ❌`
      }
    }).join('\n') +
    `\n\n⏰ *Waktu habis!* \n🎯 Jawaban benar: ${gameData.jawabanBenar.length}/${gameData.total}\n\n📋 Semua jawaban: \n${gameData.jawaban.map(j => `• ${j}`).join('\n')}`

  const mentions = gameData.terjawab.filter(p => p && typeof p === 'string')

  try {
    await Ditss.sendMessage(m.chat, {
      text: teksAkhir,
      mentions: mentions,
      edit: gameData.key
    })
  } catch (error) {
    console.error('[FAMILY 100] Error saat reveal:', error)
    await m.reply(teksAkhir)
  }
}
 async function detectAdultContent(imageUrl) {
  try {
    const url = `https://api.asuma.my.id/v1/ai/nsfwchecker?url=${encodeURIComponent(imageUrl)}`;

    const response = await axios.get(url);
    const data = response.data;

    return {
      status: data.status,
      label: data.result.label,
      confidence: data.result.confidence, 
      isPorn: data.result.label.toLowerCase() === "porn"
    };

  } catch (err) {
    console.error("Error detect adult content:", err.message);
    return null;
  }
}
        async function editp(...teksArray) {
    if (!teksArray || teksArray.length === 0) return;

    let { key } = await Ditss.sendMessage(m.chat, {
        text: teksArray[0]
    }, { quoted: m });

    for (let i = 1; i < teksArray.length; i++) {
        await delay(2000); 
        await Ditss.sendMessage(m.chat, {
            text: teksArray[i],
            edit: key
        }).catch(console.error);
    }
}
// ===== Debug Console Logs =====
if (isCmd) {
    let senderIntl = PhoneNumber('+' + sender.replace('@s.whatsapp.net', '')).getNumber('international')
    let waktuPesan = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    let filesize = 0

    if (m?.msg) {
        filesize = m.msg.vcard?.length ||
                   m.msg.fileLength?.low || m.msg.fileLength ||
                   m.msg.axolotlSenderKeyDistributionMessage?.length ||
                   m.text?.length || 0
    } else {
        filesize = body?.length || 0
    }

    let CrotoneE = await detectOperator(nomore)
    let sizeSuffix = ['', ...'KMGTP'][Math.floor(Math.log(filesize || 1) / Math.log(1000))] || ''
    let sizePretty = filesize === 0 ? 0 : (filesize / 1000 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1)
    let chatName = await Ditss.getName(m.chat)

    console.log(`
╭┈❲ ${chalk.redBright(Ditss.user?.name || 'BOT')}
│ ${chalk.black(chalk.bgYellow(waktuPesan))}
│• Message ${chalk.black(chalk.bgGreen('Command'))}
│• Size: ${chalk.magenta(`${filesize} [${sizePretty} ${sizeSuffix}B]`)}
│• From: ${chalk.green(`${userdb.id}${pushname ? ' ~' + pushname : ''}`)}
│• Chat: ${chalk.green(`${m.chat}${chatName ? ' ~' + chatName : ''}`)}
│• Type: ${chalk.black(chalk.bgYellow(m.mtype || 'Unknown'))}
│• Operator: ${chalk.black(chalk.bgYellow(CrotoneE || 'Unknown'))}
│• Device: ${chalk.black(chalk.bgYellow(m.device || 'Unknown'))}
╰┈┈⟐ ❲ ${chalk.bold.cyan('Debug Log')} ❳
`.trim())

    if (body) console.log(chalk.yellow(body))
    if (m.key.fromMe) return
    console.log(chalk.cyanBright(`⚙️ Perintah: ${command}`))
    console.log(chalk.gray(`📎 Argumen: ${args.join(" ") || "(kosong)"}`))
    console.log()
}
        
if (!global._resetLimitScheduled) {
  global._resetLimitScheduled = true

  cron.schedule('5 6 * * *', async () => {
    let users = getAllUsers()
    let totalUser = 0
    let totalPrem = 0

    for (let jid in users) {
      let user = users[jid]
      let isPremium = !!user.premium

      user.limit = isPremium ? global.limit.prem : global.limit.user
      totalUser++
      if (isPremium) totalPrem++
    }

    console.log(`✅ Semua limit user berhasil direset otomatis. Total: ${totalUser}, Premium: ${totalPrem}`)

    // kirim notifikasi ke owner
    const jam = new Date().getHours()
    let salam = "Malam"
    if (jam >= 4 && jam < 10) salam = "Pagi"
    else if (jam >= 10 && jam < 15) salam = "Siang"
    else if (jam >= 15 && jam < 18) salam = "Sore"

    for (const no of global.info.owner) {
      const jod = no + '@s.whatsapp.net'
      await Ditss.sendMessage(jod, {
        text: `🌙 Hai ${global.info.nama_owner}...\n\nSelamat ${salam} ya 🌌\n\n✨ Limit semua user sudah direset ✨\n\n📊 Total user: *${totalUser.toLocaleString()}*\n👑 Premium: *${totalPrem}*`
      })
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Jakarta'
  })
}

   // bisa isi lebih dari 1 channel
const CHANNELS = [
  `${global.my.idch}`, 
  `${global.my.idgc}`, 
  "120363302356434279@newsletter"  
];

function makeNotifier(Ditss) {
  return async (text, media) => {
    for (const jid of CHANNELS) {
      try {
        if (media?.type === "image") {
          await Ditss.sendMessage(jid, { image: { url: media.url }, caption: text });
        } else {
          await Ditss.sendMessage(jid, { text });
        }
      } catch (e) {
        console.error(`[autoGempa] gagal kirim ke ${jid}:`, e.message);
      }
    }
  };
}
        let gempaMonitor;
        
        
        
        // === [SIAPAKAH AKU?] - GUNAKAN db.game.siapakahaku[m.chat] ===
if (db.game.siapakahaku?.[m.chat] && !isCmd) {
  const game = db.game.siapakahaku[m.chat]
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim()
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim()
  if (Date.now() > game.timeout) {
    waktuHabis(jawaban)
    delete db.game.siapakahaku[m.chat]
    return
  }
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau'].includes(userJawab)) {
    m.reply(`❌ Kamu menyerah!\nJawaban: *${jawaban}*`)
    delete db.game.siapakahaku[m.chat]
    return
  }
  if (['bantuan', 'petunjuk', 'help'].includes(userJawab)) {
    let hint = ''
    for (let i = 0; i < jawaban.length; i++) {
      if (jawaban[i] === ' ') hint += ' '
      else if (/[0-9]/.test(jawaban[i])) hint += jawaban[i]
      else if (i % 2 === 0) hint += jawaban[i] 
      else hint += '_' 
    }
    m.reply(`💡 *Petunjuk:* ${hint}`)
    return
  }
  if (userJawab === jawaban) {
    db.users[m.sender].saldo += 300
    db.users[m.sender].rank += await randomNomor(40)
    JwbTrue("Siapakah Aku?", 300, `\n\nKetik .siapakahaku untuk bermain lagi 🤔`)
    delete db.game.siapakahaku[m.chat]
    return
  }
  if (similarity(userJawab, jawaban) >= 0.75) {
    m.reply('🎯 Hampir tepat! Coba lagi...')
    return
  }
  Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  })
}
        // === [TEBAK LAGU] - GUNAKAN db.game.tebaklagu[m.chat] ===
if (db.game.tebaklagu?.[m.chat] && !isCmd) {
  const game = db.game.tebaklagu[m.chat]
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim()
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim()
  if (Date.now() > game.timeout) {
    await m.reply(`⏰ Waktu habis!\nJawaban: *${game.jawaban}* \nArtis: _${game.artis}_`)
    delete db.game.tebaklagu[m.chat]
    return
  }
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau'].includes(userJawab)) {
    await m.reply(`❌ Kamu menyerah!\nJawaban: *${game.jawaban}* \nArtis: _${game.artis}_`)
    delete db.game.tebaklagu[m.chat]
    return
  }
  if (['bantuan', 'petunjuk', 'help'].includes(userJawab)) {
    let hint = ''
    for (let i = 0; i < jawaban.length; i++) {
      if (jawaban[i] === ' ') hint += ' '
      else if (/[0-9]/.test(jawaban[i])) hint += jawaban[i]
      else if (i % 2 === 0) hint += jawaban[i]
      else hint += '_' 
    }
    await m.reply(`💡 *Petunjuk:* ${hint}\nArtis: _${game.artis}_`)
    return
  }
  if (userJawab === jawaban) {
    db.users[m.sender].saldo += 500 
    db.users[m.sender].rank += await randomNomor(60)
    await m.reply(`🎉 *Benar!* \n\nJudul: *${game.jawaban}*\nPenyanyi: _${game.artis}_\n\nHadiah: +500 saldo + ${await randomNomor(60)} rank\n\nKetik .tebaklagu untuk bermain lagi 🎵`)
    delete db.game.tebaklagu[m.chat]
    return
  }
  if (similarity(userJawab, jawaban) >= 0.78) {
    await m.reply('🎵 Hampir tepat! Coba lagi...')
    return
  }
  Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  })
}
        // === [TEBAK GAME] - AUTOMATIC ANSWER CHECKER ===
if (db.game.tebakgame?.[m.chat] && !isCmd) {
  const game = db.game.tebakgame[m.chat]
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim()
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim()
  if (Date.now() > game.timeout) {
    await m.reply(`⏰ Waktu habis!\nJawaban: *${game.jawaban}*`)
    delete db.game.tebakgame[m.chat]
    return
  }
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau'].includes(userJawab)) {
    await m.reply(`❌ Kamu menyerah!\nJawaban: *${game.jawaban}*`)
    delete db.game.tebakgame[m.chat]
    return
  }
  if (['bantuan', 'petunjuk', 'help'].includes(userJawab)) {
    let hint = ''
    for (let i = 0; i < jawaban.length; i++) {
      if (jawaban[i] === ' ') hint += ' '
      else if (/[0-9]/.test(jawaban[i])) hint += jawaban[i]
      else if (i % 2 === 0) hint += jawaban[i]
      else hint += '_'
    }
    await m.reply(`💡 *Petunjuk:* ${hint}`)
    return
  }
  if (userJawab === jawaban) {
    db.users[m.sender].saldo += 400
    db.users[m.sender].rank += await randomNomor(50)
    const userWin = db.users[m.sender].tebakgame_win = (db.users[m.sender].tebakgame_win || 0) + 1
    const allWins = Object.entries(db.users).filter(([_, u]) => u.tebakgame_win > 0)
    const leader = allWins.sort(([,a],[,b]) => b.tebakgame_win - a.tebakgame_win)[0]
    const leaderText = leader ? `🏆 Teratas: @${leader[0].split('@')[0]} (${leader[1].tebakgame_win}×)` : ''

    await m.reply(`
🎉 *Benar!* 
🖼️ Judul: *${game.jawaban}*
💰 Hadiah: +400 saldo + ${await randomNomor(50)} rank
👤 Kamu menang ${userWin}×
${leaderText}
    `)
    delete db.game.tebakgame[m.chat]
    return
  }
  if (similarity(userJawab, jawaban) >= 0.80) {
    await m.reply('🎯 Hampir tepat! Coba lagi...')
    return
  }
  Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  })
}
        // === [TEBAK LIRIK] - AUTOMATIC ANSWER CHECKER ===
if (db.game.tebaklirik?.[m.chat] && !isCmd) {
  const game = db.game.tebaklirik[m.chat]
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim()
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim()
  if (Date.now() > game.timeout) {
    await m.reply(`⏰ Waktu habis!\nJawaban: *${game.jawaban}*`)
    delete db.game.tebaklirik[m.chat]
    return
  }
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau'].includes(userJawab)) {
    await m.reply(`❌ Kamu menyerah!\nJawaban: *${game.jawaban}*`)
    delete db.game.tebaklirik[m.chat]
    return
  }
  if (['bantuan', 'petunjuk', 'help'].includes(userJawab)) {
    let hint = ''
    for (let i = 0; i < jawaban.length; i++) {
      if (jawaban[i] === ' ') hint += ' '
      else if (/[0-9]/.test(jawaban[i])) hint += jawaban[i]
      else if (i % 2 === 0) hint += jawaban[i] // huruf genap ditampilkan
      else hint += '_' // huruf ganjil disembunyikan
    }
    await m.reply(`💡 *Petunjuk:* ${hint}`)
    return
  }
  if (userJawab === jawaban) {
    db.users[m.sender].saldo += 300
    db.users[m.sender].rank += await randomNomor(40)
    const userWin = db.users[m.sender].tebaklirik_win = (db.users[m.sender].tebaklirik_win || 0) + 1
    const allWins = Object.entries(db.users).filter(([_, u]) => u.tebaklirik_win > 0)
    const leader = allWins.sort(([,a],[,b]) => b.tebaklirik_win - a.tebaklirik_win)[0]
    const leaderText = leader ? `🏆 Teratas: @${leader[0].split('@')[0]} (${leader[1].tebaklirik_win}×)` : ''
    await m.reply(`
🎉 *Benar!* 
🎵 Lirik: *${game.soal}*
🔑 Jawaban: *${game.jawaban}*
💰 Hadiah: +300 saldo + ${await randomNomor(40)} rank
👤 Kamu menang ${userWin}×
${leaderText}
    `)
    delete db.game.tebaklirik[m.chat]
    return
  }
  if (similarity(userJawab, jawaban) >= 0.82) {
    await m.reply('🎵 Hampir tepat! Coba lagi...')
    return
  }
  Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  })
}// === [TEBAK BENDERA] - AUTOMATIC ANSWER CHECKER ===
if (db.game.tebakbendera?.[m.chat] && !isCmd) {
  const game = db.game.tebakbendera[m.chat]
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim()
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim()
  if (Date.now() > game.timeout) {
    await m.reply(`⏰ Waktu habis!\nJawaban: *${game.jawaban}*`)
    delete db.game.tebakbendera[m.chat]
    return
  }
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau'].includes(userJawab)) {
    await m.reply(`❌ Kamu menyerah!\nJawaban: *${game.jawaban}*`)
    delete db.game.tebakbendera[m.chat]
    return
  }
  if (['bantuan', 'petunjuk', 'help'].includes(userJawab)) {
    await m.reply(`💡 *Petunjuk:* Ini adalah bendera dari negara dengan kode: *${game.flag}*`)
    return
  }
  if (userJawab === jawaban) {
    db.users[m.sender].saldo += 350
    db.users[m.sender].rank += await randomNomor(45)
    const userWin = db.users[m.sender].tebakbendera_win = (db.users[m.sender].tebakbendera_win || 0) + 1
    const users = await getAllUsers()
    const currentUser = users[m.sender]
    const displayName = currentUser?.name && currentUser.name !== 'Unknown' ? currentUser.name : m.sender.split('@')[0]
    const leader = Object.entries(users)
      .filter(([_, u]) => u.tebakbendera_win > 0)
      .sort(([,a],[,b]) => b.tebakbendera_win - a.tebakbendera_win)[0]

    const leaderName = leader ? 
      (users[leader[0]].name && users[leader[0]].name !== 'Unknown' ? users[leader[0]].name : leader[0].split('@')[0]) : ''

    await m.reply(`
🎉 *Benar!* 
🚩 Negara: *${game.jawaban}*
💰 Hadiah: +350 saldo + ${await randomNomor(45)} rank
👤 Kamu menang ${userWin}× (${displayName})
${leader ? `🏆 Teratas: ${leaderName} (${leader[1].tebakbendera_win}×)` : ''}
    `)

    delete db.game.tebakbendera[m.chat]
    return
  }
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply('🎯 Hampir tepat! Coba lagi...')
    return
  }
  Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  })
}
  // === [FAMILY 100] - DIRECT ACCESS TO DB.GAME ===
if (db.game.family100?.[m.chat] && !isCmd) {
  const gameData = db.game.family100[m.chat] // 👈 HANYA BACA, TIDAK DI-ASSIGN KE VARIABEL LAIN
  const userJawab = m.text.toLowerCase().trim()
  if (Date.now() > gameData.timeout) {
    await revealAllAnswers(m, gameData)
    delete db.game.family100[m.chat]
    return
  }
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau'].includes(userJawab)) {
    await revealAllAnswers(m, gameData)
    delete db.game.family100[m.chat]
    return
  }
  if (['bantuan', 'petunjuk', 'help'].includes(userJawab)) {
    const sisa = gameData.jawaban.filter(j => !gameData.jawabanBenar.includes(j)).length
    await m.reply(`💡 *Petunjuk:* Masih ada *${sisa}* jawaban yang belum ditebak dari ${gameData.total} total.`)
    return
  }
  let isCorrect = false
  let jawabanIndex = -1
  for (let i = 0; i < gameData.jawaban.length; i++) {
    const j = gameData.jawaban[i]
    if (userJawab === j || similarity(userJawab, j) >= 0.85) {
      isCorrect = true
      jawabanIndex = i
      break
    }
  }
  if (!isCorrect) {
    Ditss.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
    return
  }
  if (gameData.terjawab[jawabanIndex]) {
    await m.reply('✅ Jawaban ini sudah ditebak oleh orang lain!')
    return
  }
  gameData.jawabanBenar.push(gameData.jawaban[jawabanIndex])
  gameData.terjawab[jawabanIndex] = m.sender
  const teksUpdate = `🧠 *Family 100*\n\n❓ Soal: ${gameData.soal}\n\n` +
    gameData.jawaban.map((j, i) => {
      const pengguna = gameData.terjawab?.[i]
      if (pengguna && typeof pengguna === 'string') {
        return `(${i + 1}) ${j} ✅ @${pengguna.split('@')[0]}`
      } else {
        return `(${i + 1}) ⬜`
      }
    }).join('\n') +
    (gameData.jawabanBenar.length === gameData.total ? '\n\n🎉 Semua jawaban ditemukan!' : '')

  const mentions = gameData.terjawab.filter(p => p && typeof p === 'string')

  try {
    await Ditss.sendMessage(m.chat, {
      text: teksUpdate,
      mentions: mentions,
      edit: gameData.key 
    })
    if (gameData.jawabanBenar.length === gameData.total) {
      db.users[m.sender].saldo += 500
      db.users[m.sender].rank += await randomNomor(70)
      const userWin = db.users[m.sender].tebakfamily100_win = (db.users[m.sender].tebakfamily100_win || 0) + 1
      const users = await getAllUsers()
      const currentUser = users[m.sender]
      const displayName = currentUser?.name && currentUser.name !== 'Unknown' ? currentUser.name : m.sender.split('@')[0]
      const leader = Object.entries(users)
        .filter(([_, u]) => u.tebakfamily100_win > 0)
        .sort(([,a],[,b]) => b.tebakfamily100_win - a.tebakfamily100_win)[0]
      const leaderName = leader ? 
        (users[leader[0]].name && users[leader[0]].name !== 'Unknown' ? users[leader[0]].name : leader[0].split('@')[0]) : ''
      const teksAkhir = `🧠 *Family 100*\n\n❓ Soal: ${gameData.soal}\n\n` +
        gameData.jawaban.map((j, i) => {
          const pengguna = gameData.terjawab?.[i]
          if (pengguna && typeof pengguna === 'string') {
            return `(${i + 1}) ${j} ✅ @${pengguna.split('@')[0]}`
          } else {
            return `(${i + 1}) ⬜`
          }
        }).join('\n') +
        `\n\n🎉 *SELAMAT!* Semua jawaban ditemukan!\n\n💰 Hadiah: +500 saldo + ${await randomNomor(70)} rank\n👤 Kamu menang ${userWin}× (${displayName})\n${leader ? `🏆 Teratas: ${leaderName} (${leader[1].tebakfamily100_win}×)` : ''}`
      await Ditss.sendMessage(m.chat, {
        text: teksAkhir,
        mentions: mentions,
        edit: gameData.key
      })
      delete db.game.family100[m.chat]
      return
    }
  } catch (error) {
    console.error('[FAMILY 100] Error saat edit pesan:', error)
    await m.reply('⚠️ Gagal mengupdate pesan. Silakan lanjutkan permainan.')
  }
}
        // === [TEBAK KALIMAT] - DIRECT ACCESS TO DB.GAME ===
if (db.game.tebakkalimat?.[m.chat] && !isCmd) {
  const game = db.game.tebakkalimat[m.chat] // 👈 Akses langsung dari db
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim()
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim()
  if (Date.now() > game.timeout) {
    await m.reply(`⏰ Waktu habis!\nJawaban: *${game.jawaban}*`)
    delete db.game.tebakkalimat[m.chat]
    return
  }
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau'].includes(userJawab)) {
    await m.reply(`❌ Kamu menyerah!\nJawaban: *${game.jawaban}*`)
    delete db.game.tebakkalimat[m.chat]
    return
  }
  if (['bantuan', 'petunjuk', 'help'].includes(userJawab)) {
    let hint = ''
    for (let i = 0; i < jawaban.length; i++) {
      if (jawaban[i] === ' ') hint += ' '
      else if (/[0-9]/.test(jawaban[i])) hint += jawaban[i]
      else if (i % 2 === 0) hint += jawaban[i] 
      else hint += '_' 
    }
    await m.reply(`💡 *Petunjuk:* ${hint}`)
    return
  }
  if (userJawab === jawaban) {
    db.users[m.sender].saldo += 350
    db.users[m.sender].rank += await randomNomor(45)
    const userWin = db.users[m.sender].tebakkalimat_win = (db.users[m.sender].tebakkalimat_win || 0) + 1

    const users = await getAllUsers()
    const currentUser = users[m.sender]
    const displayName = currentUser?.name && currentUser.name !== 'Unknown' ? currentUser.name : m.sender.split('@')[0]

    const leader = Object.entries(users)
      .filter(([_, u]) => u.tebakkalimat_win > 0)
      .sort(([,a],[,b]) => b.tebakkalimat_win - a.tebakkalimat_win)[0]

    const leaderName = leader ? 
      (users[leader[0]].name && users[leader[0]].name !== 'Unknown' ? users[leader[0]].name : leader[0].split('@')[0]) : ''

    await m.reply(`
🎉 *Benar!* 
📝 Kalimat: *${game.soal}*
🔑 Jawaban: *${game.jawaban}*
💰 Hadiah: +350 saldo + ${await randomNomor(45)} rank
👤 Kamu menang ${userWin}× (${displayName})
${leader ? `🏆 Teratas: ${leaderName} (${leader[1].tebakkalimat_win}×)` : ''}
    `)

    delete db.game.tebakkalimat[m.chat]
    return
  }
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply('🎯 Hampir tepat! Coba lagi...')
    return
  }
  Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  })
}
        // === [TEBAK KATA] - DIRECT ACCESS TO DB.GAME ===
if (db.game.tebakkata?.[m.chat] && !isCmd) {
  const game = db.game.tebakkata[m.chat]
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim()
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim()
  if (Date.now() > game.timeout) {
    await m.reply(`⏰ Waktu habis!\nJawaban: *${game.jawaban}*`)
    delete db.game.tebakkata[m.chat]
    return
  }
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau'].includes(userJawab)) {
    await m.reply(`❌ Kamu menyerah!\nJawaban: *${game.jawaban}*`)
    delete db.game.tebakkata[m.chat]
    return
  }
  if (['bantuan', 'petunjuk', 'help'].includes(userJawab)) {
    let hint = ''
    for (let i = 0; i < jawaban.length; i++) {
      if (jawaban[i] === ' ') hint += ' '
      else if (/[0-9]/.test(jawaban[i])) hint += jawaban[i]
      else if (i % 2 === 0) hint += jawaban[i] // huruf genap ditampilkan
      else hint += '_' // huruf ganjil disembunyikan
    }
    await m.reply(`💡 *Petunjuk:* ${hint}`)
    return
  }
  if (userJawab === jawaban) {
    db.users[m.sender].saldo += 400
    db.users[m.sender].rank += await randomNomor(50)
    const userWin = db.users[m.sender].tebakkata_win = (db.users[m.sender].tebakkata_win || 0) + 1
    const users = await getAllUsers()
    const currentUser = users[m.sender]
    const displayName = currentUser?.name && currentUser.name !== 'Unknown' ? currentUser.name : m.sender.split('@')[0]
    const leader = Object.entries(users)
      .filter(([_, u]) => u.tebakkata_win > 0)
      .sort(([,a],[,b]) => b.tebakkata_win - a.tebakkata_win)[0]
    const leaderName = leader ? 
      (users[leader[0]].name && users[leader[0]].name !== 'Unknown' ? users[leader[0]].name : leader[0].split('@')[0]) : ''
    await m.reply(`
🎉 *Benar!* 
🔍 Petunjuk: *${game.soal}*
🔑 Jawaban: *${game.jawaban}*
💰 Hadiah: +400 saldo + ${await randomNomor(50)} rank
👤 Kamu menang ${userWin}× (${displayName})
${leader ? `🏆 Teratas: ${leaderName} (${leader[1].tebakkata_win}×)` : ''}
    `)

    delete db.game.tebakkata[m.chat]
    return
  }
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply('🎯 Hampir tepat! Coba lagi...')
    return
  }
  Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  })
}
        
        
        
        
        
        
        // jaga groups
if (db.groups[m.chat]?.antiporhub && m.isGroup && m.isBotAdmins && !isCmd) {
  try {
    let targetMsg = m.quoted ? m.quoted : m;
    let mime = (targetMsg.msg || targetMsg).mimetype || '';
    if (!mime || !/image\/(webp|jpeg|png)/.test(mime)) return;

    let media = await targetMsg.download();
    let uploadedUrl = await UguuSe(media);
    let detection = await detectAdultContent(uploadedUrl.url);
    if (detection?.isPorn) {
      await Ditss.sendMessage(m.chat, { delete: targetMsg.key });

      db.users[m.sender].pornwarn = (db.users[m.sender].pornwarn || 0) + 1;
      const warn = db.users[m.sender].pornwarn;
      const sisa = 3 - warn;

      let teks = `⚠️ *Anti Konten 18+!*\n\n@${m.sender.split('@')[0]} mengirim gambar dewasa!\n📛 Peringatan ke-${warn}/3`;
      if (sisa === 2) teks += `\n🚫 Masih 2 kesempatan lagi!`;
      if (sisa === 1) teks += `\n🚨 Kesempatan terakhir!`;

      await Ditss.sendMessage(m.chat, {
        text: teks,
        mentions: [m.sender],
      });

      if (warn >= 3) {
        await Ditss.sendMessage(m.chat, {
          text: `🚫 *@${m.sender.split('@')[0]}* terlalu sering kirim konten dewasa, dikeluarkan!`,
          mentions: [m.sender],
        });
        await Ditss.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        db.users[m.sender].pornwarn = 0;
      }

    } else {
      console.log(`✅ Gambar dari ${m.sender.split('@')[0]} aman.`);
    }

  } catch (e) {
    console.error('❌ Error detect porn image:', e);
  }
}
const pluginPath = join(__dirname, 'plugins');
if (!global.plugins) global.plugins = {};
fs.readdirSync(pluginPath).forEach(async file => {
    if (!file.endsWith('.js')) return;
    try {
        const plg = (await import(join(pluginPath, file))).default;
        if (plg?.command?.length) {
            plg.command.forEach(cmd => global.plugins[cmd] = plg);
           // console.log(`✅ Plugin loaded: ${file} | Commands: ${plg.command.join(', ')}`);
        }
    } catch (err) {
        console.error(`❌ Gagal load plugin ${file}:`, err);
    }
});
fs.watch(pluginPath, async (eventType, filename) => {
    if (!filename.endsWith('.js')) return;
    const fullPath = join(pluginPath, filename);
    Object.keys(global.plugins).forEach(cmd => {
        if (global.plugins[cmd]?.fileName === filename) delete global.plugins[cmd];
    });
    try {
        const plg = (await import(fullPath + '?update=' + Date.now())).default;
        if (plg?.command?.length) {
            plg.command.forEach(cmd => global.plugins[cmd] = plg);
            global.plugins[filename] = plg;
            console.log(`🔄 Plugin updated: ${filename}`);
        }
    } catch (err) {
        if (eventType === 'rename') console.log(`❌ Plugin deleted: ${filename}`);
        else console.error(`❌ Error reload plugin ${filename}:`, err);
    }
});
        
        switch (command) {

      case 'tourl': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";

    if (!mime) return m.reply("Reply foto/video/dokumen yang mau dijadiin URL.");

    try {
        //m.reply("⏳ Uploading...");
        const buffer = await quoted.download();
        const ext = mime.split("/")[1];
        const folderPath = './database/sampah';
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const tempPath = `${folderPath}/${Date.now()}.${ext}`;

        await fs.promises.writeFile(tempPath, buffer);

        const url = await AsumaCdn(tempPath);

        await fs.promises.unlink(tempPath);

        return m.reply(`✅ *Berhasil Upload!*\n\n${url}`);
    } catch (e) {
        console.log("tourl error:", e);
        return m.reply("❌ Gagal upload ke CDN.");
    }
}
break;
       case 'info': {
    let settinggs = global.db.set[botNumber] || { public: true }
    const totalUser = Object.keys(getAllUsers()).length

    const text = `
🤖 *Asuma Multi Device*
👑 Owner: @${info.owner[0].split('@')[0]}
⏳ Runtime: ${runtime(process.uptime())}
📊 Total User: ${totalUser}
🚀 Mode: ${settinggs.public ? 'Self' : 'Public'}
    `.trim()

    const interactiveButtons = [
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: "📢 Bagikan Bot",
                url: `https://wa.me/?text=Coba+nih+bot+keren+%F0%9F%98%8E+Asuma+Multi+Device:+https://wa.me/${Ditss.user?.id.split(':')[0].replace(/[^0-9]/g, '')}`
            })
        },
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: "Join Group Bot",
                url: `https://ditss.vercel.app/s/grup-asuma`
            })
        },
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: "📥 Get Script",
                url: "https://ditss.cloud/download"
            })
        }
    ]

    const interactiveMessage = {
        text,
        title: "📌 Info Bot",
        footer: "Powered by Ditss",
        interactiveButtons
    }

    Ditss.sendMessage(m.chat, interactiveMessage, { quoted: m, mentions: [info.owner[0]] })
}
break
                    case 'autogempa': {
      global.autogempa = !global.autogempa;
      if (global.autogempa) {
        if (!gempaMonitor) {
          const notifier = makeNotifier(Ditss);
          gempaMonitor = new AutoGempa(notifier, { thresholdMag: 0, pollIntervalMs: 30000 });
          gempaMonitor.start();
        }
        await Ditss.sendMessage(m.chat, { text: "✅ Auto notifikasi gempa *aktif* (global, multi channel)." });
      } else {
        await Ditss.sendMessage(m.chat, { text: "⛔ Auto notifikasi gempa *dimatikan*." });
      }
      break;
    }
                
                case 'fb':
case 'facebook': {
  if (!text) return m.reply(`🚩 Contoh: .fb https://www.facebook.com/...`)

  try {
    let api = `https://ditss.vercel.app/download/facebook?apikey=free&url=${encodeURIComponent(text)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.status) return m.reply(`❌ Gagal mengambil data, coba lagi`)

    let result = json.result
    let caption = `🎬 *${result.title}*
⏱️ Durasi: ${result.duration}
👤 Creator: ${json.creator}`
    await Ditss.sendMessage(m.chat, {
      image: { url: result.thumbnail },
      caption
    }, { quoted: m })
    let sections = [
      {
        title: "Pilih Kualitas Video",
        rows: result.video.map(v => ({
          title: v.quality,
          rowId: `.getfb ${v.url}`,
          description: "Klik untuk download kualitas ini"
        }))
      }
    ]
    await Ditss.sendMessage(m.chat, {
      text: "🎥 Pilih kualitas yang ingin kamu download:",
      footer: "Asuma Multi Device",
      buttonText: "📥 Download",
      sections
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("❌ Terjadi error, coba lagi nanti.")
  }
}
break
case 'getfb': {
  if (!text) return m.reply("⚠️ Mana link videonya?")
  await Ditss.sendMessage(m.chat, {
    video: { url: text },
    caption: "✅ Nih videonya..."
  }, { quoted: m })
}
break
                
                case 's': case 'stiker': case 'sticker': {
  if (!/image|video/gi.test(mime)) return m.reply("Kirim atau balas media (gambar/video)")
  if (/video/gi.test(mime) && qmsg.seconds > 15) return m.reply("Durasi video maksimal 15 detik!")

  try {
    var image = await Ditss.downloadAndSaveMediaMessage(qmsg)

    if (!image) return m.reply("Gagal mengunduh media!")

    await Ditss.sendSticker(m.chat, image, m, {
					packname: `stiker maker\ncreate by: ${pushname}  ${salam}`,
					author: global.namabot
				})
    if (fs.existsSync(image)) fs.unlinkSync(image)

  } catch (e) {
    console.log("Error sticker:", e)
    m.reply("Gagal membuat stiker.")
  }
}
break
                
                			case 'totalpesan': {
				let messageCount = {};
				let messages = store?.messages[m.chat]?.array || [];
				let participants = m?.metadata?.participants?.map(p => p.id) || store?.messages[m.chat]?.array?.map(p => p.key.participant) || [];
				messages.forEach(mes => {
					if (mes.key?.participant && mes.message) {
						messageCount[mes.key.participant] = (messageCount[mes.key.participant] || 0) + 1;
					}
				});
				let totalMessages = Object.values(messageCount).reduce((a, b) => a + b, 0);
				let date = new Date().toLocaleDateString('id-ID');
				let zeroMessageUsers = participants.filter(user => !messageCount[user]).map(user => `- @${user.replace(/[^0-9]/g, '')}`);
				let messageList = Object.entries(messageCount).map(([sender, count], index) => `${index + 1}. @${sender.replace(/[^0-9]/g, '')}: ${count} Pesan`);
				let result = `Total Pesan ${totalMessages} dari ${participants.length} anggota\nPada tanggal ${date}:\n${messageList.join('\n')}\n\nNote: ${text.length > 0 ? `\n${zeroMessageUsers.length > 0 ? `Sisa Anggota yang tidak mengirim pesan (Sider):\n${zeroMessageUsers.join('\n')}` : 'Semua anggota sudah mengirim pesan!'}` : `\nCek Sider? ${prefix + command} --sider`}`;
				m.reply(result)
			}
			break
case 'get': {
    if (!text) return reply("Eh, bro! Mana linknya? 😅 Kirim dulu dong biar aku bisa ambil datanya.");

    let args = text.split(' ');
    let url = args[0];
    let tipe = args[1] ? args[1].toLowerCase() : null;

    if (!tipe) {
        return Ditss.sendMessage(m.chat, {
            text: `🔥 Pilih tipe konten yang mau aku ambil dari link ini:\n${url}`,
            buttons: [
                { buttonId: `.get ${url} img`, buttonText: { displayText: '🖼️ Image' }, type: 1 },
                { buttonId: `.get ${url} vid`, buttonText: { displayText: '🎬 Video' }, type: 1 },
                { buttonId: `.get ${url} zip`, buttonText: { displayText: '🗜️ Zip' }, type: 1 },
                { buttonId: `.get ${url} html`, buttonText: { displayText: '📄 HTML' }, type: 1 },
            ],
            headerType: 1
        }, { quoted: m });
    }

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        switch(tipe) {
            case 'img':
                await Ditss.sendMessage(m.chat, { image: response.data, caption: "🖼️ Nih gambarnya!" }, { quoted: m });
                break;
            case 'vid':
                await Ditss.sendMessage(m.chat, { video: response.data, caption: "🎬 Nih videonya!" }, { quoted: m });
                break;
            case 'html':
                await Ditss.sendMessage(m.chat, { document: response.data, fileName: "file.html", mimetype: "text/html", caption: "📄 File HTML siap dikirim!" }, { quoted: m });
                break;
            case 'zip':
            default:
                await Ditss.sendMessage(m.chat, { document: response.data, fileName: "file.zip", mimetype: "application/zip", caption: "🗜️ File ZIP berhasil diambil!" }, { quoted: m });
                break;
        }
    } catch (error) {
        console.error("❌ Error fetching data:", error);
        await reply("Oops! Gagal ambil datanya 😅. Coba lagi nanti ya.");
    }
    break;
}
                case 'backup': {
    if (!isCreator) return m.reply(ress.owner);

    switch (args[0]) {
        case 'all': {
            try {
                m.reply('📦 Sedang mengumpulkan semua file untuk backup...');

                const ls = execSync("ls").toString().split("\n").filter((file) =>
                    file !== "node_modules" &&
                    file !== "package-lock.json" &&
                    file !== "yarn.lock" &&
                    file !== ""
                );

                console.log("🗂️ File yang akan dibackup:", ls);

                const escapedFiles = ls.map(file => `"${file}"`).join(" ");
                execSync(`zip -r Backup.zip ${escapedFiles}`);

                if (!fs.existsSync('./Backup.zip')) {
                    return m.reply('❌ File ZIP tidak ditemukan, backup gagal.');
                }

                await Ditss.sendMessage(m.sender, {
                    document: fs.readFileSync('./Backup.zip'),
                    mimetype: "application/zip",
                    fileName: "Backup.zip",
                });

                execSync("rm -rf Backup.zip");
                m.reply('✅ Backup selesai, file berhasil dikirim ke owner.');
            } catch (err) {
                console.error(err);
                m.reply('⚠️ Terjadi kesalahan saat proses backup.');
            }
            break;
        }

        case 'auto': {
            if (set.autobackup) return m.reply('ℹ️ Auto Backup sudah aktif sebelumnya.');
            set.autobackup = true;
            m.reply('✅ Auto Backup berhasil diaktifkan!');
            break;
        }

        case 'session': {
            await m.reply({
                document: fs.readFileSync('./node_modules/.bin/Session'),
                mimetype: 'application/json',
                fileName: 'creds.json'
            });
            break;
        }

        case 'database': {
            try {
                const dbPath = './database/database.json';
                if (!fs.existsSync(dbPath)) {
                    console.log('❌ File database tidak ditemukan.');
                    return;
                }

                const buffer = fs.readFileSync(dbPath);
                const tanggal = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

                for (const no of global.owner) {
                    const jid = no + '@s.whatsapp.net';
                    const quoted = {
                        key: {
                            fromMe: false,
                            participant: '0@s.whatsapp.net',
                            remoteJid: jid,
                        },
                        message: {
                            conversation: `✅ Backup Berhasil dikirim pada ${tanggal}`
                        }
                    };

                    await Ditss.sendMessage(jid, {
                        document: buffer,
                        fileName: `database-${tanggal.replace(/[^\d]/g, '-')}.json`,
                        mimetype: 'application/json',
                        caption: `📦 *Backup Berhasil*\n📅 ${tanggal}\n\nFile database.json telah berhasil dibackup.`
                    }, { quoted });
                }

                console.log(`✅ Auto backup sukses dikirim ke ${global.owner.length} owner.`);
            } catch (err) {
                console.error('❌ Gagal auto backup:', err);
            }
            break;
        }

        default: {
            let DitssGanteng = '✨ Gunakan salah satu perintah berikut:\n- backup auto\n- backup all\n- backup database\n- backup session';
            let buttons = [
                {
                    buttonId: "backup",
                    buttonText: { displayText: "🗂️ Gunakan Perintah Backup" },
                    type: 4,
                    nativeFlowInfo: {
                        name: "single_select",
                        paramsJson: JSON.stringify({
                            title: "💾 Pilih Perintah Backup yang Tersedia",
                            sections: [
                                {
                                    title: "Daftar Perintah Backup",
                                    rows: [
                                        { title: "📦 Backup Semua", description: "Backup semua data sekaligus", id: ".backup all" },
                                        { title: "🕒 Backup Otomatis", description: "Mengaktifkan backup otomatis", id: ".backup auto" },
                                        { title: "💼 Backup Session", description: "Backup file session bot", id: ".backup session" },
                                        { title: "🗃️ Backup Database", description: "Backup file database bot", id: ".backup database" },
                                    ],
                                },
                            ],
                        }),
                    },
                },
            ];

            Ditss.sendMessage(
                m.chat,
                {
                    text: DitssGanteng,
                    footer: `© Powered by ${global.info.namabot}`,
                    buttons,
                    headerType: 1,
                    viewOnce: true,
                },
                { quoted: m }
            );
        }
    }
    break;
}
                 case 'tovideo':
  case 'tovid':
   case 'tomp4': 
    case 'toimg':
     case 'toimage':
      case 'tovidio': {
  const user = db.users[m.sender]
  if (user.limit < 1) return reply(ress.limit)

  if (!quoted) return m.reply('⚠️ Balas stikernya terlebih dahulu.')
  if (!/webp/.test(mime)) return reply(`⚠️ Balas sticker dengan caption *${prefix + command}*`)

  await Ditss.sendMessage(m.chat, {
    react: {
      text: "⏱️",
      key: m.key,
    }
  })

  let media
  try {
    media = await Ditss.downloadAndSaveMediaMessage(quoted)
  } catch (e) {
    return reply('❌ Gagal download media.')
  }
   let fileUrl = await CatBox(media)
   let convertedVideo = await webp2mp4File(fileUrl)

  let ran = await getRandom('.png')
  exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
    try {
      fs.unlinkSync(media)
    } catch (e) {
      console.log('⚠️ Gagal hapus file sementara:', e)
    }

    if (err) {
      return Ditss.sendMessage(m.chat, {
                        video: {
                            url: convertedVideo
                        },
                        caption: 'done'
                    }, {
                        quoted: m
                    })
    }

    try {
      let buffer = fs.readFileSync(ran)
      await Ditss.sendMessage(m.chat, {
        image: buffer
      }, {
        quoted: m
      })
      fs.unlinkSync(ran)
    } catch (e) {
      console.error('❌ Gagal kirim atau hapus file:', e)
      return reply('❌ Terjadi kesalahan saat mengirim gambar.')
    }
  })

  if (!isCreator && !isPremium) {
    user.limit -= 1
  }
}
break
 case 'mf':
case 'mediafire': {
  try {
    if (!text) return m.reply(`Contoh: ${prefix + command} https://www.mediafire.com/file/xxxxx`);
    if (!text.includes('mediafire.com')) return m.reply('Harus berupa link MediaFire!');

    const cleanUrl = text.trim();

    // ✅ COBA HEAD DULU — VALIDASI LINK
    try {
      const headCheck = await axios.head(cleanUrl, { timeout: 5000 });
      if (headCheck.status !== 200) {
        return m.reply('❌ Link MediaFire tidak valid atau sudah dihapus!');
      }
    } catch (headErr) {
      return m.reply('❌ Link MediaFire tidak bisa diakses — mungkin butuh verifikasi manual.');
    }

    const apiUrl = `https://ditss.vercel.app/api/download/mediafire?apikey=DitssGanteng&url=${encodeURIComponent(cleanUrl)}`;

    let res;
    try {
      res = await fetchJson(apiUrl);
    } catch (apiErr) {
      console.error('API Error:', apiErr);
      res = null;
    }

    let fileName = 'unknown_file';
    let fileSize = 'Unknown';
    let downloadLink = cleanUrl;
    let uploadDate = '-';
    let mimeType = 'application/octet-stream';

    if (res && res.status && res.result) {
      // ✅ Ambil dari API
      ({
        fileName,
        fileSize,
        downloadLink,
        uploadDate,
        mimeType
      } = res.result);
    } else {
      // ✅ FALLBACK — AMBIL NAMA FILE DARI URL
      try {
        const urlObj = new URL(cleanUrl);
        const pathParts = urlObj.pathname.split('/');
        const fileId = pathParts[2]; // z36wk9xqzo9vl8q
        const rawFileName = pathParts[3]; // AsumA+V2.7.zip
        fileName = decodeURIComponent(rawFileName.replace(/\+/g, ' '));
      } catch (e) {
        fileName = 'downloaded_file';
      }
    }

    const info = `
📂 *MEDIAFIRE DOWNLOADER*
───────────────────────
📄 *Nama File:* ${fileName}
📏 *Ukuran File:* ${fileSize}
📆 *Diunggah:* ${uploadDate}
🌐 *Link Asli:* ${cleanUrl}

${res ? '⏳ *Tunggu sebentar, mengirim file...*' : '⚠️ *API sedang lambat — kirim link manual saja*'}
    `.trim();
    await m.reply(info);
    await m.react(res ? "🚀" : "⚠️");
    if (res && res.status) {
      const safeUrl = downloadLink
        .replace(/ /g, '%20')
        .replace(/\+/g, '%2B')
        .replace(/\?/g, '%3F')
        .replace(/&/g, '%26');

      if (fileSize.includes('GB') || (fileSize.includes('MB') && parseFloat(fileSize) > 500)) {
        return m.reply(`⚠️ File terlalu besar (${fileSize}) — WhatsApp tidak bisa kirim.\n\nSilakan download manual:\n${safeUrl}`);
      }

      let media;
      try {
        media = await getBuffer(safeUrl);
      } catch (dlErr) {
        return m.reply(`❌ Gagal download. Coba manual:\n${safeUrl}`);
      }

      await Ditss.sendMessage(m.chat, {
        document: media,
        fileName: fileName,
        mimetype: mimeType,
        caption: `✅ Berhasil!\n\n📂 *${fileName}*\n📏 Ukuran: ${fileSize}`
      }, {
        quoted: m
      });

      await m.react("✅");
    } else {
      await m.reply(`🔗 *Download Manual:*\n${cleanUrl}\n\n_(Buka di browser, lewati iklan, lalu download)_`);
    }

  } catch (err) {
    console.error('MediaFire Final Error:', err);
    await m.react("❌");
    m.reply('❌ Gagal proses link. Coba lagi nanti atau gunakan link lain.');
  }
  break;
}
                case 'cekidch': case 'idch': {
 if (!text) return reply("linkchnya mana")
 if (!text.includes("https://whatsapp.com/channel/")) return reply("Link tautan tidak valid")
    await m.react("🤨")
 let result = text.split('https://whatsapp.com/channel/')[1]
 let res = await Ditss.newsletterMetadata("invite", result)
 let teks = `* *ID : ${res.id}*
* *Nama :* ${res.name}
* *Total Pengikut :* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Terverifikasi" : "Tidak"}`
 let msg = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: {
 "messageContextInfo": {
 "deviceListMetadata": {},
 "deviceListMetadataVersion": 2
 },
 interactiveMessage: {
 body: {
 text: teks
 },
 footer: {
 text: "powered by ditss"
 }, //input watermark footer
 nativeFlowMessage: {
 buttons: [{
 "name": "cta_copy",
 "buttonParamsJson": `{"display_text": "copy ID","copy_code": "${res.id}"}`
 }, ],
 },
 },
 },
 },
 }, {
 quoted: m
 });
 await Ditss.relayMessage(msg.key.remoteJid, msg.message, {
 messageId: msg.key.id
 });
    await m.react("✨")
 }
 break
                case 'kick':
case 'dor':
case 'buang':
case '😛':
case 'hedsot':
case 'duar': {
if (!m.isGroup) return reply(ress.group)         
if (!isCreator && !isAdmin) return reply(ress.admin)   
if (!isBotAdmin) return reply(ress.BotAdmin)     
 let target
 if (m.mentionedJid && m.mentionedJid[0]) {
 target = m.mentionedJid[0]
 }
 else if (m.quoted) {
 target = m.quoted.sender
 }
 else if (args[0]) {
 let input = args[0].replace(/[^0-9]/g, '')
 let found = participants.find(p => p.id.replace(/[^0-9]/g, '').endsWith(input))
 if (found) target = found.id
 }
 if (!target) return reply('❌ Target tidak ditemukan!\nGunakan: tag / reply / nomor / ujung nomor.')
 if (global.info.owner.includes(target)) return reply('❌ Tidak bisa kick Owner.')
 if (target === m.sender) return reply('❌ Tidak bisa kick diri sendiri.')

 let buffer = "https://raw.githubusercontent.com/media-clouds/upload/id/447920601019/mce05oaq.webp"

 Ditss.sendSticker(m.chat, buffer, m, {
 packname: "yahahahahahahahah di kick😛",
 author: global.info.namabot
 })
 try {
 await Ditss.groupParticipantsUpdate(m.chat, [target], 'remove')
 m.reply(`✅ Sukses mengeluarkan @${target.split('@')[0]}`, null, {
 mentions: [target]
 })
 } catch (err) {
 console.log(err)
 m.reply('❌ Gagal mengeluarkan user, mungkin bukan anggota grup atau sudah keluar.')
 }
}
break
 case 'add':
case 'culik':
case 'masukin': {
    if (!m.isGroup) return m.reply(ress.group);
    if (!isAdmins && !isOwner) return m.reply(ress.admin); 
    if (!isBotAdmins) return m.reply(ress.BotAdmin);
    let target;
    if (text) {
        target = text.replace(/[^0-9]/g, '');
    } else if (m.quoted) {
        target = m.quoted.sender?.split('@')[0];
    }
    if (!target || target.length < 9) 
        return m.reply(`Contoh: ${prefix + command} 628xxxx atau reply pesan target`);
    const normalizeJid = jid => jid.replace(/[^0-9]/g, '');
    const numberJid = normalizeJid(target) + '@s.whatsapp.net';
    try {
        const res = await Ditss.groupParticipantsUpdate(m.chat, [numberJid], 'add');
        for (let i of res) {
            switch (i.status) {
                case 200:
                    return m.reply(`✅ Berhasil menambahkan @${target} ke grup!`, { mentions: [numberJid] });
                case 401:
                    return m.reply('❌ Gagal! Target memblokir bot.');
                case 409:
                    return m.reply('⚠️ Target sudah berada di grup.');
                case 500:
                    return m.reply('❌ Gagal! Grup sudah penuh.');
                case 408: {
                    let inv = await Ditss.groupInviteCode(m.chat);
                    await Ditss.sendMessage(numberJid, {
                        text: `*Undangan Grup:*\nAdmin @${m.sender.split('@')[0]} mengundang kamu ke grup *${groupMetadata.subject}*\nGabung melalui link:\nhttps://chat.whatsapp.com/${inv}`,
                        mentions: [m.sender]
                    }, { quoted: m });
                    return m.reply(`⚠️ Target baru saja keluar dari grup. Link undangan dikirim ke wa.me/${target}`);
                }
                case 403: {
                    let code = i.content?.content?.[0]?.attrs?.code;
                    let exp = i.content?.content?.[0]?.attrs?.expiration;
                    if (!code) return m.reply('❌ Gagal! Tidak bisa mengirim undangan.');
                    await Ditss.sendGroupInvite(m.chat, numberJid, code, exp, groupMetadata.subject, 
                        `Admin: @${m.sender.split('@')[0]} mengundang kamu ke grup ini`, null, { mentions: [m.sender] });
                    return m.reply(`🚫 Target private. Undangan dikirim ke wa.me/${target}`);
                }
                default:
                    return m.reply(`Status: ${i.status}`);
            }
        }

    } catch (err) {
        console.error('❌ Error add user:', err);
        m.reply('❌ Terjadi kesalahan saat menambahkan user. Pastikan nomor valid & bot admin.');
    }
}
break;
            case 'ping':
                await Ditss.sendMessage(sender, { text: 'Pong! Bot aktif.' });
                break;
 case 'siapakahaku':
case 'ska': {
  const subCmd = args[0]?.toLowerCase()
  if (subCmd === 'leaderboard') {
    const users = await getAllUsers()

    const top = Object.entries(users)
      .filter(([_, u]) => u.siapakahaku_win > 0)
      .sort(([,a],[,b]) => b.siapakahaku_win - a.siapakahaku_win)
      .slice(0, 5)
      .map(([id, u], i) => `${i+1}. @${id.split('@')[0]} (${u.siapakahaku_win}×)`)
      .join('\n')

    return m.reply(`🏆 *Top 5 Siapakah Aku?*\n\n${top || 'Belum ada yang menang...'}\n\n_Ketik .siapakahaku untuk main!_`)
  }

  // Main game
  if (!db.game.siapakahaku) db.game.siapakahaku = {}

  if (db.game.siapakahaku[m.chat]) {
    return m.reply('🤔 Masih ada soal *Siapakah Aku?* yang belum dijawab!')
  }

  if (!isCreator && !isPremium && db.users[m.sender].glimit < 1) {
    return m.reply('🎮 Limit game kamu habis!')
  }

  if (!isCreator && !isPremium) {
    db.users[m.sender].glimit--
  }

  try {
    const res = await fetchJson('https://api-ditss.vercel.app/api/game/siapakahaku')

    if (!res.status || !res.soal || !res.jawaban) {
      return m.reply('❌ Gagal mengambil soal. Coba lagi nanti.')
    }

    const soal = res.soal.trim()
    const jawaban = res.jawaban.toLowerCase().trim()

    const teks = `🧠 *Siapakah Aku?*\n\n${soal}\n\n⏱️ Waktu: 120 detik\n_Ketik "nyerah" untuk menyerah_\n_Ketik "bantuan" untuk petunjuk_`
    const sent = await Ditss.sendText(m.chat, teks, m)

    db.game.siapakahaku[m.chat] = {
      id: 'siapakahaku',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban,
      hadiah: 300,
      timeout: Date.now() + 120000
    }

    setTimeout(async () => {
      if (db.game.siapakahaku?.[m.chat] && Date.now() > db.game.siapakahaku[m.chat].timeout) {
        await m.reply(`⏰ Waktu habis!\nJawaban: *${db.game.siapakahaku[m.chat].jawaban}*`)
        delete db.game.siapakahaku[m.chat]
      }
    }, 120000)

  } catch (error) {
    console.error('[SIAPAKAH AKU] API Error:', error)
    m.reply('❌ Gagal terhubung ke server. Coba lagi nanti.')
  }

  break
}
                case 'tebaklagu':
case 'tl': {
  if (!db.game.tebaklagu) db.game.tebaklagu = {}
  if (db.game.tebaklagu[m.chat]) {
    return m.reply('🎶 Masih ada soal *Tebak Lagu* yang belum dijawab!')
  }
  if (!isCreator && !isPremium && db.users[m.sender].glimit < 1) {
    return m.reply('🎮 Limit game kamu habis!')
  }
  if (!isCreator && !isPremium) {
    db.users[m.sender].glimit--
  }
  try {
    const res = await fetchJson('https://api-ditss.vercel.app/api/game/tebaklagu')

    if (!res.status || !res.soal || !res.jawaban || !res.artis) {
      return m.reply('❌ Gagal mengambil soal. Coba lagi nanti.')
    }

    const audioUrl = res.soal
    const jawaban = res.jawaban.trim()
    const artis = res.artis.trim()

    const teks = `🎵 *Tebak Lagu*\n\n⏱️ Waktu: 120 detik\n\n_Ketik "nyerah" untuk menyerah_\n_Ketik "bantuan" untuk petunjuk_\n\n🎧 *Lagu sedang diputar..._*`
     const sent = await Ditss.sendMessage(m.chat, {
 audio: { url: audioUrl },
 mimetype: 'audio/mpeg',
 ptt: false,
 contextInfo: {
 externalAdReply: {
 title: "🎵 Tebak Lagu",
 body: `Artis: ${artis}`,
 thumbnailUrl: 'https://telegra.ph/file/5e32a8e89e242da34c2ff.jpg',
 sourceUrl: '-'
 }
 }
 }, { quoted: m })
     await Ditss.sendText(m.chat, teks, sent)
    db.game.tebaklagu[m.chat] = {
      id: 'tebaklagu',
      msgId: sent.key.id,
      soal: audioUrl,
      jawaban: jawaban.toLowerCase(),
      artis: artis,
      hadiah: 500,
      timeout: Date.now() + 120000
    }
    setTimeout(async () => {
      if (db.game.tebaklagu?.[m.chat] && Date.now() > db.game.tebaklagu[m.chat].timeout) {
        const { jawaban, artis } = db.game.tebaklagu[m.chat]
        await m.reply(`⏰ Waktu habis!\nJawaban: *${jawaban}*\nArtis: _${artis}_`)
        delete db.game.tebaklagu[m.chat]
      }
    }, 120000)

  } catch (error) {
    console.error('[TEBAK LAGU] API Error:', error)
    m.reply('❌ Gagal terhubung ke server. Coba lagi nanti.')
  }

  break
}
case 'tebakgame':
case 'tg': {
  const subCmd = args[0]?.toLowerCase()
  if (subCmd === 'leaderboard') {
    const users = await getAllUsers() // 👈 BACA SEMUA USER DARI FILE

    const top = Object.entries(users)
      .filter(([_, u]) => u.tebakgame_win > 0)
      .sort(([,a],[,b]) => b.tebakgame_win - a.tebakgame_win)
      .slice(0, 5)
      .map(([id, u], i) => `${i+1}. @${id.split('@')[0]} (${u.tebakgame_win}×)`)
      .join('\n')

    return m.reply(`🏆 *Top 5 Tebak Game*\n\n${top || 'Belum ada yang menang...'}\n\n_Ketik .tebakgame untuk main!_`)
  }
  if (!db.game.tebakgame) db.game.tebakgame = {}
  if (db.game.tebakgame[m.chat]) {
    return m.reply('🎮 Masih ada soal *Tebak Game* yang belum dijawab!')
  }

  if (!isCreator && !isPremium && db.users[m.sender].glimit < 1) {
    return m.reply('🎮 Limit game kamu habis!')
  }

  if (!isCreator && !isPremium) {
    db.users[m.sender].glimit--
  }

  try {
    const res = await fetchJson('https://api-ditss.vercel.app/api/game/tebakgame')

    if (!res.status || !res.img || !res.jawaban) {
      return m.reply('❌ Gagal mengambil soal. Coba lagi nanti.')
    }

    const imgUrl = res.img.trim()
    const jawaban = res.jawaban.trim()

    const teks = `🖼️ *Tebak Game*\n\n⏱️ Waktu: 60 detik\n_Ketik "nyerah" untuk menyerah_\n_Ketik "bantuan" untuk petunjuk_`

    const sent = await Ditss.sendMessage(m.chat, {
      image: { url: imgUrl },
      caption: teks
    }, { quoted: m })

    db.game.tebakgame[m.chat] = {
      id: 'tebakgame',
      msgId: sent.key.id,
      img: imgUrl,
      jawaban: jawaban.toLowerCase(),
      hadiah: 400,
      timeout: Date.now() + 60000
    }

    setTimeout(async () => {
      if (db.game.tebakgame?.[m.chat] && Date.now() > db.game.tebakgame[m.chat].timeout) {
        await m.reply(`⏰ Waktu habis!\nJawaban: *${db.game.tebakgame[m.chat].jawaban}*`)
        delete db.game.tebakgame[m.chat]
      }
    }, 60000)

  } catch (error) {
    console.error('[TEBAK GAME] API Error:', error)
    m.reply('❌ Gagal terhubung ke server. Coba lagi nanti.')
  }

  break
}
 case 'tebaklirik':
case 'tl': {
  const subCmd = args[0]?.toLowerCase()
  if (subCmd === 'leaderboard') {
    const users = await getAllUsers()

    const top = Object.entries(users)
      .filter(([_, u]) => u.tebaklirik_win > 0)
      .sort(([,a],[,b]) => b.tebaklirik_win - a.tebaklirik_win)
      .slice(0, 5)
      .map(([id, u], i) => `${i+1}. @${id.split('@')[0]} (${u.tebaklirik_win}×)`)
      .join('\n')

    return m.reply(`🏆 *Top 5 Tebak Lirik*\n\n${top || 'Belum ada yang menang...'}\n\n_Ketik .tebaklirik untuk main!_`)
  }
  if (!db.game.tebaklirik) db.game.tebaklirik = {}

  if (db.game.tebaklirik[m.chat]) {
    return m.reply('🎶 Masih ada soal *Tebak Lirik* yang belum dijawab!')
  }

  if (!isCreator && !isPremium && db.users[m.sender].glimit < 1) {
    return m.reply('🎮 Limit game kamu habis!')
  }

  if (!isCreator && !isPremium) {
    db.users[m.sender].glimit--
  }

  try {
    const res = await fetchJson('https://api-ditss.vercel.app/api/game/tebaklirik')

    if (!res.status || !res.soal || !res.jawaban) {
      return m.reply('❌ Gagal mengambil soal. Coba lagi nanti.')
    }

    const soal = res.soal.trim()
    const jawaban = res.jawaban.trim()

    const teks = `🎶 *Tebak Lirik*\n\n${soal}\n\n⏱️ Waktu: 120 detik\n_Ketik "nyerah" untuk menyerah_\n_Ketik "bantuan" untuk petunjuk_`

    const sent = await Ditss.sendMessage(m.chat, {
      text: teks
    }, { quoted: m })

    db.game.tebaklirik[m.chat] = {
      id: 'tebaklirik',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban.toLowerCase(),
      hadiah: 300,
      timeout: Date.now() + 120000
    }

    setTimeout(async () => {
      if (db.game.tebaklirik?.[m.chat] && Date.now() > db.game.tebaklirik[m.chat].timeout) {
        await m.reply(`⏰ Waktu habis!\nJawaban: *${db.game.tebaklirik[m.chat].jawaban}*`)
        delete db.game.tebaklirik[m.chat]
      }
    }, 120000)

  } catch (error) {
    console.error('[TEBAK LIRIK] API Error:', error)
    m.reply('❌ Gagal terhubung ke server. Coba lagi nanti.')
  }

  break
}
                case 'tebakbendera':
case 'tb': {
  const subCmd = args[0]?.toLowerCase()
  if (subCmd === 'leaderboard') {
    const users = await getAllUsers()

    const top = Object.entries(users)
      .filter(([_, u]) => u.tebakbendera_win > 0)
      .sort(([,a],[,b]) => b.tebakbendera_win - a.tebakbendera_win)
      .slice(0, 5)
      .map(([id, u], i) => {
        const displayName = u.name && u.name !== 'Unknown' ? u.name : id.split('@')[0]
        return `${i+1}. ${displayName} (${u.tebakbendera_win}×)`
      })
      .join('\n')

    return m.reply(`🏆 *Top 5 Tebak Bendera*\n\n${top || 'Belum ada yang menang...'}\n\n_Ketik .tebakbendera untuk main!_`)
  }
  if (!db.game.tebakbendera) db.game.tebakbendera = {}

  if (db.game.tebakbendera[m.chat]) {
    return m.reply('🚩 Masih ada soal *Tebak Bendera* yang belum dijawab!')
  }

  if (!isCreator && !isPremium && db.users[m.sender].glimit < 1) {
    return m.reply('🎮 Limit game kamu habis!')
  }

  if (!isCreator && !isPremium) {
    db.users[m.sender].glimit--
  }

  try {
    const res = await fetchJson('https://api-ditss.vercel.app/api/game/tebakbendera')

    if (!res.status || !res.img || !res.name) {
      return m.reply('❌ Gagal mengambil soal. Coba lagi nanti.')
    }

    const imgUrl = res.img.trim()
    const jawaban = res.name.trim().toLowerCase() 
    const flagCode = res.flag

    const teks = `🚩 *Tebak Bendera*\n\n⏱️ Waktu: 90 detik\n_Ketik "nyerah" untuk menyerah_\n_Ketik "bantuan" untuk petunjuk_`

    const sent = await Ditss.sendMessage(m.chat, {
      image: { url: imgUrl },
      caption: teks
    }, { quoted: m })

    db.game.tebakbendera[m.chat] = {
      id: 'tebakbendera',
      msgId: sent.key.id,
      img: imgUrl,
      jawaban: jawaban,
      flag: flagCode,
      hadiah: 350,
      timeout: Date.now() + 90000
    }

    setTimeout(async () => {
      if (db.game.tebakbendera?.[m.chat] && Date.now() > db.game.tebakbendera[m.chat].timeout) {
        await m.reply(`⏰ Waktu habis!\nJawaban: *${db.game.tebakbendera[m.chat].jawaban}*`)
        delete db.game.tebakbendera[m.chat]
      }
    }, 90000)

  } catch (error) {
    console.error('[TEBAK BENDERA] API Error:', error)
    m.reply('❌ Gagal terhubung ke server. Coba lagi nanti.')
  }

  break
}
 case 'tebakkalimat':
case 'tk': {
  const subCmd = args[0]?.toLowerCase()
  if (subCmd === 'leaderboard') {
    const users = await getAllUsers()
    const top = Object.entries(users)
      .filter(([_, u]) => u.tebakkalimat_win > 0)
      .sort(([,a],[,b]) => b.tebakkalimat_win - a.tebakkalimat_win)
      .slice(0, 5)
      .map(([id, u], i) => {
        const displayName = u.name && u.name !== 'Unknown' ? u.name : id.split('@')[0]
        return `${i+1}. ${displayName} (${u.tebakkalimat_win}×)`
      })
      .join('\n')

    return m.reply(`🏆 *Top 5 Tebak Kalimat*\n\n${top || 'Belum ada yang menang...'}\n\n_Ketik .tebakkalimat untuk main!_`)
  }
  if (!db.game.tebakkalimat) db.game.tebakkalimat = {}
  if (db.game.tebakkalimat[m.chat]) {
    return m.reply('📝 Masih ada soal *Tebak Kalimat* yang belum dijawab!')
  }
  if (!isCreator && !isPremium && db.users[m.sender].glimit < 1) {
    return m.reply('🎮 Limit game kamu habis!')
  }
  if (!isCreator && !isPremium) {
    db.users[m.sender].glimit--
  }
  try {
    const res = await fetchJson('https://api-ditss.vercel.app/api/game/tebakkalimat')
    if (!res.status || !res.soal || !res.jawaban) {
      return m.reply('❌ Gagal mengambil soal. Coba lagi nanti.')
    }
    const soal = res.soal.trim()
    const jawaban = res.jawaban.trim().toLowerCase()
    const teks = `📝 *Tebak Kalimat*\n\n${soal}\n\n⏱️ Waktu: 90 detik\n_Ketik "nyerah" untuk menyerah_\n_Ketik "bantuan" untuk petunjuk_`
    const sent = await Ditss.sendMessage(m.chat, { text: teks }, { quoted: m })
    db.game.tebakkalimat[m.chat] = {
      id: 'tebakkalimat',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban,
      hadiah: 350,
      timeout: Date.now() + 90000,
      key: sent.key
    }
    setTimeout(async () => {
      if (db.game.tebakkalimat?.[m.chat] && Date.now() > db.game.tebakkalimat[m.chat].timeout) {
        await m.reply(`⏰ Waktu habis!\nJawaban: *${db.game.tebakkalimat[m.chat].jawaban}*`)
        delete db.game.tebakkalimat[m.chat]
      }
    }, 90000)

  } catch (error) {
    console.error('[TEBAK KALIMAT] API Error:', error)
    m.reply('❌ Gagal terhubung ke server. Coba lagi nanti.')
  }

  break
}
  case 'family100':
case 'f100': {
  const subCmd = args[0]?.toLowerCase()

  if (subCmd === 'leaderboard') {
    const users = await getAllUsers()
    const top = Object.entries(users)
      .filter(([_, u]) => u.tebakfamily100_win > 0)
      .sort(([,a],[,b]) => b.tebakfamily100_win - a.tebakfamily100_win)
      .slice(0, 5)
      .map(([id, u], i) => {
        const displayName = u.name && u.name !== 'Unknown' ? u.name : id.split('@')[0]
        return `${i+1}. ${displayName} (${u.tebakfamily100_win} jawaban benar)`
      })
      .join('\n')

    return m.reply(`🏆 *Top 5 Family 100*\n\n${top || 'Belum ada yang menang...'}\n\n_Ketik .family100 untuk main!_`)
  }

  if (!db.game.family100) db.game.family100 = {}

  if (db.game.family100[m.chat]) {
    return m.reply('📚 Masih ada soal *Family 100* yang belum dijawab!')
  }

  if (!isCreator && !isPremium && db.users[m.sender].glimit < 1) {
    return m.reply('🎮 Limit game kamu habis!')
  }

  if (!isCreator && !isPremium) {
    db.users[m.sender].glimit--
  }

  try {
    const res = await fetchJson('https://api-ditss.vercel.app/api/game/family100')

    if (!res.status || !res.soal || !Array.isArray(res.jawaban)) {
      return m.reply('❌ Gagal mengambil soal. Coba lagi nanti.')
    }

    const soal = res.soal.trim()
    const jawabanList = res.jawaban.map(j => j.toLowerCase().trim())
    const totalJawaban = jawabanList.length
    db.game.family100[m.chat] = {
      id: 'family100',
      soal: soal,
      jawaban: jawabanList,
      jawabanBenar: [],
      terjawab: new Array(totalJawaban).fill(null), 
      timeout: Date.now() + 120000,
      total: totalJawaban,
      msgId: null,
      key: null
    }

    const teksAwal = `
📘 *Family 100*  
❓ *Soal:* ${soal}

🎯 *Jawaban yang benar:* 0/${totalJawaban}
⏱️ *Waktu:* 120 detik  
💡 Ketik "bantuan" untuk petunjuk  
❌ Ketik "nyerah" untuk menyerah
`

    const sent = await Ditss.sendMessage(m.chat, { text: teksAwal }, { quoted: m })
    db.game.family100[m.chat].msgId = sent.key.id
    db.game.family100[m.chat].key = sent.key
    setTimeout(async () => {
      if (db.game.family100?.[m.chat] && Date.now() > db.game.family100[m.chat].timeout) {
        await revealAllAnswers(m, db.game.family100[m.chat])
        delete db.game.family100[m.chat]
      }
    }, 120000)

  } catch (error) {
    console.error('[FAMILY 100] API Error:', error)
    m.reply('❌ Gagal terhubung ke server. Coba lagi nanti.')
  }

  break
}
                case 'tebakkata':
case 'tkata': {
  const subCmd = args[0]?.toLowerCase()
  if (subCmd === 'leaderboard') {
    const users = await getAllUsers()
    const top = Object.entries(users)
      .filter(([_, u]) => u.tebakkata_win > 0)
      .sort(([,a],[,b]) => b.tebakkata_win - a.tebakkata_win)
      .slice(0, 5)
      .map(([id, u], i) => {
        const displayName = u.name && u.name !== 'Unknown' ? u.name : id.split('@')[0]
        return `${i+1}. ${displayName} (${u.tebakkata_win}×)`
      })
      .join('\n')

    return m.reply(`🏆 *Top 5 Tebak Kata*\n\n${top || 'Belum ada yang menang...'}\n\n_Ketik .tebakkata untuk main!_`)
  }
  if (!db.game.tebakkata) db.game.tebakkata = {}
  if (db.game.tebakkata[m.chat]) {
    return m.reply('🔍 Masih ada soal *Tebak Kata* yang belum dijawab!')
  }

  if (!isCreator && !isPremium && db.users[m.sender].glimit < 1) {
    return m.reply('🎮 Limit game kamu habis!')
  }

  if (!isCreator && !isPremium) {
    db.users[m.sender].glimit--
  }

  try {
    const res = await fetchJson('https://api-ditss.vercel.app/api/game/tebakkata')

    if (!res.status || !res.soal || !res.jawaban) {
      return m.reply('❌ Gagal mengambil soal. Coba lagi nanti.')
    }

    const soal = res.soal.trim()
    const jawaban = res.jawaban.trim().toLowerCase() 
    const teks = `🔍 *Tebak Kata*\n\nPetunjuk: ${soal}\n\n⏱️ Waktu: 120 detik\n_Ketik "nyerah" untuk menyerah_\n_Ketik "bantuan" untuk petunjuk_`
    const sent = await Ditss.sendMessage(m.chat, { text: teks }, { quoted: m })
    db.game.tebakkata[m.chat] = {
      id: 'tebakkata',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban,
      hadiah: 400,
      timeout: Date.now() + 120000,
      key: sent.key 
    }
    setTimeout(async () => {
      if (db.game.tebakkata?.[m.chat] && Date.now() > db.game.tebakkata[m.chat].timeout) {
        await m.reply(`⏰ Waktu habis!\nJawaban: *${db.game.tebakkata[m.chat].jawaban}*`)
        delete db.game.tebakkata[m.chat]
      }
    }, 120000)

  } catch (error) {
    console.error('[TEBAK KATA] API Error:', error)
    m.reply('❌ Gagal terhubung ke server. Coba lagi nanti.')
  }

  break
}
                
                
                
                
                
                
// nsfw
case 'nsfw': {
        if (args[0]?.toLowerCase() === 'on' || args[0]?.toLowerCase() === 'off') {
        if (!m.isGroup) return m.reply('⚠️ Perintah ini hanya bisa dipakai di grup.')
        if (!(isCreator || isPremium || m.isAdmins)) {
            return m.reply('🚫 Hanya admin grup, owner, atau user premium yang bisa mengaktifkan fitur ini.')
        }
        if (!db.groups[m.chat]) db.groups[m.chat] = {}
        if (args[0].toLowerCase() === 'on') {
            db.groups[m.chat].nsfw = true
            return m.reply('✅ Fitur NSFW berhasil di *aktifkan* di grup ini.')
        } else {
            db.groups[m.chat].nsfw = false
            return m.reply('❌ Fitur NSFW berhasil di *nonaktifkan* di grup ini.')
        }
    }
    if (!isNsfw) {
        return m.reply(`🚫 Fitur NSFW belum diaktifkan.\nKetik *.nsfw on* untuk mengaktifkan.`)
    }

    switch (args[0]?.toLowerCase()) {
        case 'waifu':
        case 'neko':
        case 'loli':
        case 'trap': {
            try {
                const kategori = args[0].toLowerCase()
                const res = await fetch(`${api.ditss}/api/nsfw/${kategori}`)
                const arrayBuffer = await res.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)

                const type = await fileTypeFromBuffer(buffer)
                if (!type) return m.reply('❌ Gagal mendeteksi tipe media.')

                if (type.mime.startsWith('image/')) {
                    await Ditss.sendMessage(m.chat, {
                        image: buffer,
                        caption: `🔞 NSFW: *${kategori}*`
                    }, { quoted: m })
                } else if (type.mime.startsWith('video/')) {
                    await Ditss.sendMessage(m.chat, {
                        video: buffer,
                        caption: `🔞 NSFW: *${kategori}*`,
                        gifPlayback: true
                    }, { quoted: m })
                } else {
                    m.reply(`❌ Format media tidak dikenali: ${type.mime}`)
                }
            } catch (err) {
                console.error(err)
                m.reply('❌ Gagal mengambil konten NSFW.')
            }
            break
        }

        case 'blowjob': {
            try {
                const res = await fetch(`${api.ditss}/api/nsfw/blowjob`)
                const arrayBuffer = await res.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)

                await Ditss.sendMessage(m.chat, {
                    video: buffer,
                    mimetype: 'video/mp4',
                    fileName: `${m.pushname}.mp4`,
                    caption: `🔞 NSFW: *blowjob*`
                }, { quoted: m })
            } catch (err) {
                console.error(err)
                m.reply('❌ Gagal mengambil konten NSFW.')
            }
            break
        }

        default: {
            const nsfwInfo = '🔞 *Perintah NSFW*\nSilakan pilih salah satu kategori di bawah ini:'
            const buttons = [
                {
                    buttonId: "nsfw",
                    buttonText: { displayText: "Pilih Kategori NSFW 🔞" },
                    type: 4,
                    nativeFlowInfo: {
                        name: "single_select",
                        paramsJson: JSON.stringify({
                            title: "Pilih Kategori NSFW",
                            sections: [
                                {
                                    title: "📂 Kategori NSFW",
                                    rows: [
                                        { title: "Waifu", description: "NSFW waifu", id: ".nsfw waifu" },
                                        { title: "Neko", description: "NSFW neko", id: ".nsfw neko" },
                                        { title: "Loli", description: "NSFW loli", id: ".nsfw loli" },
                                        { title: "Trap", description: "NSFW trap", id: ".nsfw trap" },
                                        { title: "Blowjob", description: "NSFW blowjob (video)", id: ".nsfw blowjob" }
                                    ]
                                }
                            ]
                        })
                    }
                }
            ]

            await Ditss.sendMessage(
                m.chat,
                {
                    text: nsfwInfo,
                    footer: `© ${info.namabot} NSFW Engine`,
                    buttons,
                    headerType: 1,
                    viewOnce: true
                },
                { quoted: m }
            )
        }
    }

    break
}
      case 'sc':
case 'script': {
  const interactiveButtons = [
    {
      name: "cta_url",
      buttonParamsJson: JSON.stringify({
        display_text: "📦 Unduh Script (ZIP)",
        url: "https://ditss.cloud/download" 
      })
    },
    {
      name: "cta_url",
      buttonParamsJson: JSON.stringify({
        display_text: "🐙 Lihat di GitHub",
        url: "https://github.com/ditss-cloud/asuma.esm"
      })
    },
    {
      name: "cta_url",
      buttonParamsJson: JSON.stringify({
        display_text: "🌐 Saluran Resmi",
        url: global.my.ch
      })
    }
  ];

  const interactiveMessage = {
    text: `
📌 *Catatan Pengembangan:*
Script ini saat ini berada dalam tahap *Beta* dan sedang dalam proses pengembangan ulang. Belum dirilis secara resmi — kemungkinan masih ada bug atau perubahan struktur.

Namun, sebagai bentuk transparansi dan apresiasi, Ditss menyediakan akses GRATIS untuk komunitas developer & pengguna awal.

📂 Format distribusi: *ZIP Archive*  
🐙 Repository resmi: github.com/ditss-cloud/asuma.esm

Silakan gunakan tombol di bawah ini untuk:
- Mengunduh file ZIP
- Melihat source code di GitHub
- Mengikuti update terbaru via Saluran WhatsApp`,
    title: "📁 Script Asuma MD — Versi Beta",
    footer: global.namabot,
    interactiveButtons
  };

  Ditss.sendMessage(m.chat, interactiveMessage, { quoted: m });
}
break;
   case 'resetlimit': {
  if (!isOwner) return m.reply('❌ Fitur ini hanya untuk owner!')

  const users = getAllUsers()
  const limitDefault = 30
  const glimitDefault = 100
  let totalUser = 0

  for (const id in users) {
    users[id].limit = limitDefault
    users[id].glimit = glimitDefault
    totalUser++
  }

  m.reply(`✅ Semua limit berhasil direset ke default.\n📊 Total user: *${totalUser}*`)
}
break
                
                
            default:
if (budy.startsWith('>')) {
    if (!isOwner) return;
    try {
        let evaled = await eval(budy.slice(1)); 
        if (typeof evaled !== 'string') evaled = util.inspect(evaled);
        await m.reply(evaled);
    } catch (err) {
        await m.reply(String(err));
    }
}

if (budy.startsWith('=>')) {
    if (!isOwner) return;
     
    async function Return(sul) {
        let sat = JSON.stringify(sul, null, 2);
        let bang = util.format(sat);
        if (sat === undefined) bang = util.format(sul);
        await m.reply(bang);
    }

    try {
        const result = await eval(`(async () => { return ${budy.slice(3)} })()`);
        await Return(result);
    } catch (e) {
        await m.reply(String(e));
    }
}
                if (budy.startsWith('$')) {
    if (!isCreator) return
    exec(budy.slice(2), (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)
    })
}
if (isCmd && global.plugins[command]) {
    try {
        if (!m.pluginExecuted) {
            m.pluginExecuted = true
            let plugin = global.plugins[command]
            if (!userdb.limit) userdb.limit = 10
            if (plugin.owner && !isOwner) return m.reply(global.ress.owner)
            if (plugin.premium && !isPremium) return m.reply(global.ress.premium)
            if (plugin.group && !m.isGroup) return m.reply(global.ress.ingroup)
            if (plugin.admin && !m.isAdmin) return m.reply(global.ress.admin)
            if (plugin.botAdmin && !m.isBotAdmin) return m.reply(global.ress.BotAdmin)
            if (plugin.nsfw && (!m.isGroup || !isNsfw)) return m.reply("❌ NSFW belum aktif di grup ini!")
            if (plugin.limit) {
                if (userdb.limit < plugin.limit)
                    return m.reply(`⚠️ Limit habis!\nSisa limit: *${userdb.limit}*\nSilahlan ketik: .claim untuk mendapatkan limit perhari`)
                userdb.limit -= plugin.limit
            }
            await plugin(m, {
                conn: Ditss,
                usedPrefix: prefix,
                args,
                command,
                reply,
                quoted,
                text,
                qmsg,
                mime,
                editp
            })
        }
    } catch (err) {
        console.error(`❌ Error plugin ${command}:`, err)
        await m.reply(`❌ Terjadi error di plugin ${command}`)
    }
}
  if (!m.fromMe) {
    let user = getUser(m.sender)
    if (!user) return

    const hour = moment.tz('Asia/Jakarta').format('HH')
    const salam = hour < 11 ? '☀️ Selamat pagi' :
                 hour < 15 ? '🌤️ Selamat siang' :
                 hour < 18 ? '🌇 Selamat sore' : '🌙 Selamat malam'

    const isGroup = m.isGroup
    const groupId = m.chat

    // pastikan db ada
    if (!global.db.groups[groupId]) global.db.groups[groupId] = {}
    const groupdb = global.db.groups[groupId]
    const userdb = global.db.users[m.sender]

    const cooldownUser = (isCreator || isPremium) ? 18000000 : 10800000

    // sistem cooldown
    if (isGroup) {
        if (isCreator || isPremium) {
            if (Date.now() - (userdb.pc || 0) < cooldownUser) return
            userdb.pc = Date.now()
        } else {
            if (Date.now() - (groupdb.pc || 0) < 10800000) return
            groupdb.pc = Date.now()
        }
    } else {
        if (Date.now() - (userdb.pc || 0) < cooldownUser) return
        userdb.pc = Date.now()
    }

    // panggilan random
    const panggilanRandom = ["bro", "sis", "sob", "bestie", "kawan", "ganteng", "cantik", "bossku 🔥", "sobat kece ✨"]
    const panggilan = panggilanRandom[Math.floor(Math.random() * panggilanRandom.length)]

    // teks utama
    let caption = ''
    if (isCreator) {
        caption = `alloo ${global.info.nama_owner}, ${salam} ada yang bisa Asuma bantu?><`
    } else if (isPremium) {
        caption = `⭐ *aloww User premium!*
Hai @${m.sender.split('@')[0]}, ${salam}  
ada yang bisa saya bantu ><`
    } else {
        caption = `👋 Hai ${panggilan}!
@${m.sender.split('@')[0]}, ${salam} ✨
Makasih udah nyempetin chat aku 🙌

Mau lihat semua fitur? Tekan tombol di bawah ya 👇

📢 Follow saluran untuk info & update terbaru:  
https://whatsapp.com/channel/0029VaflxUXGE56szLxlPJ3c

ℹ️ Info Penting:
- Bot ini **gratis tanpa biaya** 🎉
- Batas pemakaian: **30 limit/hari**

💡 Tips & Keberuntungan:
Ketik *.claim* untuk dapat **limit tambahan + money** 🪙  
Kadang beruntung lho — kamu bisa mendapatkan **limit sampai 1000** atau **hadiah akses premium** untuk waktu tertentu! 🎉✨  
(Makin sering klaim, makin besar peluangmu — good luck 🍀)

🐞 Error / Request / Lapor Bug:
Kalau ada fitur error atau mau request fitur baru, laporin di sini ya:
https://ngl.link/asuma.multi.device

Terima kasih sudah pakai Asuma Multi Device 💙
`
    }

    // tombol interaktif
    const buttons = [
        { buttonId: '.menu', buttonText: { displayText: '📖 Lihat Menu' }, type: 1 },
        isCreator ? { buttonId: '.delsesi', buttonText: { displayText: '⚙️ Hapus Sessions' }, type: 1 } :
        isPremium ? { buttonId: '.hadiah', buttonText: { displayText: '🎁 Klaim Hadiah' }, type: 1 } :
        { buttonId: '.claim', buttonText: { displayText: '⭐ Claim limit harian' }, type: 1 }
    ]

    const buttonMessage = {
        text: caption,
        footer: 'Asuma MD • Teman Chatmu',
        buttons,
        headerType: 1,
        viewOnce: true,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardedNewsletterMessageInfo: {
                newsletterJid: my.idch,
                newsletterName: `Asuma Update`
            },
            externalAdReply: {
                title: `${global.namabot} • AI Bot`,
                body: `Chat simple, fitur lengkap 🚀`,
                thumbnailUrl: ppuser,
                sourceUrl: my.idch,
                mediaType: 1,
                renderLargerThumbnail: true,
            },
        },
    }

    Ditss.sendMessage(m.chat, buttonMessage, { quoted: null })
}
        }

    } catch (e) {
    if (/over\s?limit|rate\s?limit|quota\s?exceeded|too many requests|status.?429/i.test(e?.message)) {
        console.warn('[⚠️ Terjadi kesalahan pada server.]');
        return;
    }

    const errorKey = e?.code || e?.name || e?.message?.slice(0, 100) || 'unknown_error';
    const now = Date.now();
    if (!errorCache[errorKey]) errorCache[errorKey] = [];
    errorCache[errorKey] = errorCache[errorKey].filter(ts => now - ts < 600000);
    if (errorCache[errorKey].length >= 3) return;
    errorCache[errorKey].push(now);

    let msg;
    if (e?.status === 404) msg = '❌ Resource tidak ditemukan (404).';
    else if (e?.status === 403) msg = '🚫 Akses dibatasi (403).';
    else if (e?.code === 'ETIMEDOUT') msg = '⏱️ Server terlalu lama merespons.';
    else if (e?.code === 'ENOTFOUND') msg = '🌐 Server tidak ditemukan.';
    else if (e?.code === 'ERR_OSSL_BAD_DECRYPT') msg = '🔐 Gagal mendekripsi data.';
    else if (e?.name === 'TypeError') msg = '⚠️ Terjadi kesalahan tipe data.';
    else if (e?.name === 'ReferenceError') msg = '⚠️ Ada variabel yang belum didefinisikan.';
    else if (e?.name === 'SessionError') msg = '🔁 Masalah dengan sesi.';
    else if (e?.name === 'AxiosError') msg = '🌐 Gagal mengambil data.';
    else if (e?.message?.includes('not-acceptable') || e?.data === 406) msg = '📛 Permintaan tidak diterima server (406).';
    else if (e?.output?.statusCode === 408 || e?.message?.includes('Timed Out')) msg = '⏳ Permintaan melebihi batas waktu.';
    else if (e?.output?.statusCode === 404 || e?.message?.includes('myAppStateKey')) msg = '🔑 State key tidak ditemukan.';
    else if (e?.output?.statusCode === 500 || e?.message?.includes('internal-server-error')) msg = '💥 Terjadi kesalahan pada server.';
    else if (e?.message?.includes('Media upload failed on all hosts')) msg = '📤 Gagal mengunggah media.';
    else if (e?.message?.includes('No sessions')) msg = '🔌 Session tidak ditemukan.';
    else if (e?.message?.includes('Cannot find ffmpeg')) msg = '📼 FFMPEG belum terpasang.';
    else if (e?.message?.includes('Cannot find module')) msg = '📦 Modul belum terpasang.';

    if (msg) {
        m.reply(`${msg}\n\nError: ${e?.name || e?.code || e?.status || 'Tidak diketahui'}\nLog error telah dikirim ke owner.`);
    }

    await logErrorToFile(e, m);

    if (/over\s?limit|rate\s?limit|quota\s?exceeded|too many requests|status.?429/i.test(e?.message)) {
        console.warn('[⚠️ LIMIT BLOCKED]');
        return;
    }

    await Ditss.sendMessage(
        global.info.owner[0] + "@s.whatsapp.net",
        {
            text: `👋 Halo owner, ada error yang perlu dicek.\n\n` +
                  `📦 Version: *${pkg.version}*\n\n` +
                  `🪵 *Log error:*\n\n${util.format(e)}`,
            contextInfo: { isForwarded: true }
        },
        { quoted: m }
    );
}
}

fs.watchFile(__filename, () => {
    fs.unwatchFile(__filename);
    console.log(chalk.redBright(`Update ${__filename}`));
    import(`${import.meta.url}?update=${Date.now()}`).then(module => {
        console.log('Kode diperbarui!');
    }).catch(err => console.error('Gagal memperbarui:', err));
});
