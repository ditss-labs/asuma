// ..................
import './config.js';
import { AutoGempa } from "./lib/autoGempa.js";
import chalk from 'chalk';
import os from 'os';
import speed from 'performance-now';
import { promises as fsPromises } from 'fs';
import { watchFile, unwatchFile } from 'fs'
import fs from 'fs';
import { pathToFileURL } from 'url';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import { promisify } from 'util'
import util from 'util';
import { fileTypeFromBuffer } from 'file-type'
import axios from 'axios';
import cron from 'node-cron';
import crypto from 'crypto';
import similarity from 'similarity';
const threshold = 0.72
import moment from 'moment-timezone';
import { spawn, exec, execSync } from 'child_process';
import ffmpeg from 'fluent-ffmpeg';
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
        m.isCreator = isCreator
        m.isOwner = isCreator
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
        m.isPremium = isPremium
		const isNsfw = m.isGroup ? (db.groups[m.chat]?.nsfw || false) : true;// modif
        //const isNsfw = m.isGroup ? db.groups[m.chat].nsfw : false
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const more = String.fromCharCode(8206)
        const readmore = more.repeat(4001)
        const timestampp = speed();
        const latensi = speed() - timestampp
        
        
        const FileSize = (number) => {
        var SI_POSTFIXES = ["B", " KB", " MB", " GB", " TB", " PB", " EB"]
        var tier = Math.log10(Math.abs(number)) / 3 | 0
        if (tier == 0) return number
        var postfix = SI_POSTFIXES[tier]
        var scale = Math.pow(10, tier * 3)
        var scaled = number / scale
        var formatted = scaled.toFixed(1) + ''
         if (/\.0$/.test(formatted))
                formatted = formatted.substr(0, formatted.length - 2)
            return formatted + postfix
        }
        
        
        
        
        
        
        
        
        
        
        
        
        const gameList = [
  { name: 'Tebak Kalimat', cmd: 'tebakkalimat' },
  { name: 'Susun Kata', cmd: 'susunkata' },
  { name: 'Tebak Kata', cmd: 'tebakkata' },
  { name: 'Siapakah Aku', cmd: 'siapakahaku' },
  { name: 'Tebak Gambar', cmd: 'tebakgambar' },
  { name: 'Teka-Teki', cmd: 'tekatki' },
  { name: 'Tebak-Tebakan', cmd: 'tebaktebakan' },
  { name: 'Tebak Bendera', cmd: 'tebakbendera' },
  { name: 'Cak Lontong', cmd: 'caklontong' },
  { name: 'Asah Otak', cmd: 'asahotak' },
  { name: 'tebak member JKT48', cmd: 'tebakjkt48' }
  ]
  const randomGame = gameList[Math.floor(Math.random() * gameList.length)]
        
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
if (set.public && !isCreator) return
let UsersDbDefault = global.db.users[m.sender] || {}

const limitUser = UsersDbDefault.vip ? global.limit.vip : checkStatus(m.sender, premium) ? global.limit.premium : global.limit.free
const moneyUser = UsersDbDefault.vip ? global.money.vip : checkStatus(m.sender, premium) ? global.money.premium : global.money.free

const defaultUser = {
    name: m.pushName,
    vip: false,
    ban: false,
    register: false,
    afkTime: -1,
    afkReason: '',
    level: 0,
    exp: 0,
    limit: limitUser,
    money: moneyUser,
    lastclaim: Date.now(),
    lastbegal: Date.now(),
    lastrampok: Date.now(),
}

for (let k in defaultUser) {
    if (!(k in UsersDbDefault)) UsersDbDefault[k] = defaultUser[k]
}

global.db.users[m.sender] = UsersDbDefault        
        
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
        function hitungmundur(tanggal, bulan, tahun) {
            let from = new Date(`${bulan} ${tanggal}, ${tahun} 00:00:00`).getTime();
            let now = Date.now();
            let distance = from - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return days + ' Hari ' + hours + ' Jam ' + minutes + ' Menit '
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
    const url = `https://api.asuma.my.id/v1/ai/nsfwchecker?url=${encodeURIComponent(imageUrl)}&apikey=demo`;

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
if (
  budy &&
  [
    "assalamualaikum",
    "assalamu'alaikum",
    "assalamu alaikum",
    "asalamualaikum",
    "samlikum",
    "mikum",
    "salam"
  ].includes(budy.toLowerCase())
) {
  const audioUrl = 'https://ditss.biz.id/media/mb30rx4f.mp3'

  const res = await fetch(audioUrl)
  const buffer = await res.arrayBuffer()

  await Ditss.sendMessage(
    m.chat,
    {
      audio: Buffer.from(buffer),
      mimetype: 'audio/mpeg',
      ptt: true
    },
    { quoted: m }
  )
}
// ===== Debug Console Logs =====
if (isCmd && !m.fromMe) {
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
│• Operator: ${chalk.black(chalk.bgYellow(m.operator || 'Unknown'))}
│• Device: ${chalk.black(chalk.bgYellow(m.device || 'Unknown'))}
╰┈┈⟐ ❲ ${chalk.bold.cyan('Debug Log')} ❳
`.trim())

    if (body) console.log(chalk.yellow(body))
    if (m.key.fromMe) return
    console.log(chalk.cyanBright(`⚙️ Perintah: ${command}`))
    console.log(chalk.gray(`📎 Argumen: ${args.join(" ") || "(kosong)"}`))
    db.users[m.sender].exp += randomNomor(10)
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
      let isPremium = !user.premium

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
function pangkat(rankid) {
    var levelRole = db.users[rankid].rank
    var rankid = 1
    var role = {
        rank: 'Bronze I',
        name: 'Bronze',
        id: 1
    }
    if (levelRole <= 300) {
        role = {
            rank: 'Bronze I',
            name: 'Bronze',
            id: 1
        }
    } else if (levelRole <= 500) {
        role = {
            rank: 'Bronze II',
            name: 'Bronze',
            id: 2
        }
    } else if (levelRole <= 700) {
        role = {
            rank: 'Bronze III',
            name: 'Bronze',
            id: 3
        }
    } else if (levelRole <= 900) {
        role = {
            rank: 'Silver I',
            name: 'Silver',
            id: 1
        }
    } else if (levelRole <= 1200) {
        role = {
            rank: 'Silver II',
            name: 'Silver',
            id: 2
        }
    } else if (levelRole <= 1500) {
        role = {
            rank: 'Silver III',
            name: 'Silver',
            id: 3
        }
    } else if (levelRole <= 1600) {
        role = {
            rank: 'Gold I',
            name: 'Gold',
            id: 1
        }
    } else if (levelRole <= 1725) {
        role = {
            rank: 'Gold II',
            name: 'Gold',
            id: 2
        }
    } else if (levelRole <= 1850) {
        role = {
            rank: 'Gold III',
            name: 'Gold',
            id: 3
        }
    } else if (levelRole <= 1975) {
        role = {
            rank: 'Gold IV',
            name: 'Gold',
            id: 4
        }
    } else if (levelRole <= 2100) {
        role = {
            rank: 'Platinum I',
            name: 'Platinum',
            id: 1
        }
    } else if (levelRole <= 2225) {
        role = {
            rank: 'Platinum II',
            name: 'Platinum',
            id: 2
        }
    } else if (levelRole <= 2350) {
        role = {
            rank: 'Platinum III',
            name: 'Platinum',
            id: 3
        }
    } else if (levelRole <= 2475) {
        role = {
            rank: 'Platinum IV',
            name: 'Platinum',
            id: 4
        }
    } else if (levelRole <= 2600) {
        role = {
            rank: 'Diamond I',
            name: 'Diamond',
            id: 1
        }
    } else if (levelRole <= 2750) {
        role = {
            rank: 'Diamond II',
            name: 'Diamond',
            id: 2
        }
    } else if (levelRole <= 2900) {
        role = {
            rank: 'Diamond III',
            name: 'Diamond',
            id: 3
        }
    } else if (levelRole <= 3050) {
        role = {
            rank: 'Diamond IV',
            name: 'Diamond',
            id: 4
        }
    } else if (levelRole <= 3200) {
        role = {
            rank: 'Heroic',
            name: 'Heroic',
            id: 0
        }
    } else if (levelRole <= 3500) {
        role = {
            rank: 'Heroic ✩',
            name: 'Heroic',
            id: 1
        }
    } else if (levelRole <= 4000) {
        role = {
            rank: 'Heroic ✩✩',
            name: 'Heroic',
            id: 2
        }
    } else if (levelRole <= 4350) {
        role = {
            rank: 'Heroic ✩✩✩',
            name: 'Heroic',
            id: 3
        }
    } else if (levelRole <= 5050) {
        role = {
            rank: 'Master ✯',
            name: 'Master',
            id: 1
        }
    } else if (levelRole <= 5400) {
        role = {
            rank: 'Master ✯✯',
            name: 'Master',
            id: 2
        }
    } else if (levelRole <= 6500) {
        role = {
            rank: 'Master ✯✯✯',
            name: 'Master',
            id: 3
        }
    } else if (levelRole <= 7150) {
        role = {
            rank: 'GrandMaster',
            name: 'GrandMaster',
            id: 0
        }
    } else if (levelRole <= 7700) {
        role = {
            rank: 'GrandMaster ✩',
            name: 'GrandMaster',
            id: 1
        }
    } else if (levelRole <= 9100) {
        role = {
            rank: 'GrandMaster ✩✩',
            name: 'GrandMaster',
            id: 2
        }
    } else if (levelRole <= 10800) {
        role = {
            rank: 'GrandMaster ✩✩✩',
            name: 'GrandMaster',
            id: 3
        }
    } else if (levelRole <= 20000) {
        role = {
            rank: 'GrandMaster ✩✩✩✩',
            name: 'GrandMaster',
            id: 4
        }
    } else if (levelRole <= 25000) {
        role = {
            rank: 'Epic I',
            name: 'Epic',
            id: 1
        }
    } else if (levelRole <= 30000) {
        role = {
            rank: 'Epic II',
            name: 'Epic',
            id: 2
        }
    } else if (levelRole <= 35000) {
        role = {
            rank: 'Epic III',
            name: 'Epic',
            id: 3
        }
    } else if (levelRole <= 40000) {
        role = {
            rank: 'Epic IV',
            name: 'Epic',
            id: 4
        }
    } else if (levelRole <= 45000) {
        role = {
            rank: 'Legend I',
            name: 'Legend',
            id: 1
        }
    } else if (levelRole <= 50000) {
        role = {
            rank: 'Legend II',
            name: 'Legend',
            id: 2
        }
    } else if (levelRole <= 55000) {
        role = {
            rank: 'Legend III',
            name: 'Legend',
            id: 3
        }
    } else if (levelRole <= 60000) {
        role = {
            rank: 'Legend IV',
            name: 'Legend',
            id: 4
        }
    } else if (levelRole <= 70000) {
        role = {
            rank: 'Mythic I',
            name: 'Mythic',
            id: 1
        }
    } else if (levelRole <= 80000) {
        role = {
            rank: 'Mythic II',
            name: 'Mythic',
            id: 2
        }
    } else if (levelRole <= 90000) {
        role = {
            rank: 'Mythic III',
            name: 'Mythic',
            id: 3
        }
    } else if (levelRole <= 100000) {
        role = {
            rank: 'Mythic IV',
            name: 'Mythic',
            id: 4
        }
    } else if (levelRole <= 120000) {
        role = {
            rank: 'Immortal I',
            name: 'Immortal',
            id: 1
        }
    } else if (levelRole <= 140000) {
        role = {
            rank: 'Immortal II',
            name: 'Immortal',
            id: 2
        }
    } else if (levelRole <= 160000) {
        role = {
            rank: 'Immortal III',
            name: 'Immortal',
            id: 3
        }
    } else if (levelRole <= 180000) {
        role = {
            rank: 'Immortal IV',
            name: 'Immortal',
            id: 4
        }
    } else if (levelRole <= 200000) {
        role = {
            rank: 'Celestial I',
            name: 'Celestial',
            id: 1
        }
    } else if (levelRole <= 220000) {
        role = {
            rank: 'Celestial II',
            name: 'Celestial',
            id: 2
        }
    } else if (levelRole <= 240000) {
        role = {
            rank: 'Celestial III',
            name: 'Celestial',
            id: 3
        }
    } else if (levelRole <= 260000) {
        role = {
            rank: 'Celestial IV',
            name: 'Celestial',
            id: 4
        }
    } else if (levelRole <= 280000) {
        role = {
            rank: 'Divine I',
            name: 'Divine',
            id: 1
        }
    } else if (levelRole <= 300000) {
        role = {
            rank: 'Divine II',
            name: 'Divine',
            id: 2
        }
    } else if (levelRole <= 320000) {
        role = {
            rank: 'Divine III',
            name: 'Divine',
            id: 3
        }
    } else if (levelRole <= 340000) {
        role = {
            rank: 'Divine IV',
            name: 'Divine',
            id: 4
        }
    } else if (levelRole <= 360000) {
        role = {
            rank: 'Titan I',
            name: 'Titan',
            id: 1
        }
    } else if (levelRole <= 380000) {
        role = {
            rank: 'Titan II',
            name: 'Titan',
            id: 2
        }
    } else if (levelRole <= 400000) {
        role = {
            rank: 'Titan III',
            name: 'Titan',
            id: 3
        }
    } else if (levelRole <= 420000) {
        role = {
            rank: 'Titan IV',
            name: 'Titan',
            id: 4
        }
    } else if (levelRole <= 440000) {
        role = {
            rank: 'Godlike I',
            name: 'Godlike',
            id: 1
        }
    } else if (levelRole <= 460000) {
        role = {
            rank: 'Godlike II',
            name: 'Godlike',
            id: 2
        }
    } else if (levelRole <= 480000) {
        role = {
            rank: 'Godlike III',
            name: 'Godlike',
            id: 3
        }
    } else if (levelRole <= 500000) {
        role = {
            rank: 'Godlike IV',
            name: 'Godlike',
            id: 4
        }
    } else if (levelRole <= 520000) {
        role = {
            rank: 'Omnipotent I',
            name: 'Omnipotent',
            id: 1
        }
    } else if (levelRole <= 540000) {
        role = {
            rank: 'Omnipotent II',
            name: 'Omnipotent',
            id: 2
        }
    } else if (levelRole <= 560000) {
        role = {
            rank: 'Omnipotent III',
            name: 'Omnipotent',
            id: 3
        }
    } else if (levelRole <= 580000) {
        role = {
            rank: 'Omnipotent IV',
            name: 'Omnipotent',
            id: 4
        }
    } else if (levelRole <= 600000) {
        role = {
            rank: 'Supreme I',
            name: 'Supreme',
            id: 1
        }
    } else if (levelRole <= 620000) {
        role = {
            rank: 'Supreme II',
            name: 'Supreme',
            id: 2
        }
    } else if (levelRole <= 640000) {
        role = {
            rank: 'Supreme III',
            name: 'Supreme',
            id: 3
        }
    } else if (levelRole <= 660000) {
        role = {
            rank: 'Supreme IV',
            name: 'Supreme',
            id: 4
        }
    } else if (levelRole <= 680000) {
        role = {
            rank: 'Eternal I',
            name: 'Eternal',
            id: 1
        }
    } else if (levelRole <= 700000) {
        role = {
            rank: 'Eternal II',
            name: 'Eternal',
            id: 2
        }
    } else if (levelRole <= 720000) {
        role = {
            rank: 'Eternal III',
            name: 'Eternal',
            id: 3
        }
    } else if (levelRole <= 740000) {
        role = {
            rank: 'Eternal IV',
            name: 'Eternal',
            id: 4
        }
    }
    else if (levelRole <= 760000) {
        role = {
            rank: 'Transcendent I',
            name: 'Transcendent',
            id: 1
        }
    } else if (levelRole <= 780000) {
        role = {
            rank: 'Transcendent II',
            name: 'Transcendent',
            id: 2
        }
    } else if (levelRole <= 800000) {
        role = {
            rank: 'Transcendent III',
            name: 'Transcendent',
            id: 3
        }
    } else if (levelRole <= 820000) {
        role = {
            rank: 'Transcendent IV',
            name: 'Transcendent',
            id: 4
        }
    } else if (levelRole <= 840000) {
        role = {
            rank: 'Infinity I',
            name: 'Infinity',
            id: 1
        }
    } else if (levelRole <= 860000) {
        role = {
            rank: 'Infinity II',
            name: 'Infinity',
            id: 2
        }
    } else if (levelRole <= 880000) {
        role = {
            rank: 'Infinity III',
            name: 'Infinity',
            id: 3
        }
    } else if (levelRole <= 900000) {
        role = {
            rank: 'Infinity IV',
            name: 'Infinity',
            id: 4
        }
    } else if (levelRole <= 920000) {
        role = {
            rank: 'Cosmic I',
            name: 'Cosmic',
            id: 1
        }
    } else if (levelRole <= 940000) {
        role = {
            rank: 'Cosmic II',
            name: 'Cosmic',
            id: 2
        }
    } else if (levelRole <= 960000) {
        role = {
            rank: 'Cosmic III',
            name: 'Cosmic',
            id: 3
        }
    } else if (levelRole <= 980000) {
        role = {
            rank: 'Cosmic IV',
            name: 'Cosmic',
            id: 4
        }
    } else if (levelRole <= 1000000) {
        role = {
            rank: 'Galactic I',
            name: 'Galactic',
            id: 1
        }
    } else if (levelRole <= 1020000) {
        role = {
            rank: 'Galactic II',
            name: 'Galactic',
            id: 2
        }
    } else if (levelRole <= 1040000) {
        role = {
            rank: 'Galactic III',
            name: 'Galactic',
            id: 3
        }
    } else if (levelRole <= 1060000) {
        role = {
            rank: 'Galactic IV',
            name: 'Galactic',
            id: 4
        }
    } else if (levelRole <= 1080000) {
        role = {
            rank: 'Universal I',
            name: 'Universal',
            id: 1
        }
    } else if (levelRole <= 1100000) {
        role = {
            rank: 'Universal II',
            name: 'Universal',
            id: 2
        }
    } else if (levelRole <= 1120000) {
        role = {
            rank: 'Universal III',
            name: 'Universal',
            id: 3
        }
    } else if (levelRole <= 1140000) {
        role = {
            rank: 'Universal IV',
            name: 'Universal',
            id: 4
        }
    } else if (levelRole <= 1160000) {
        role = {
            rank: 'Multiversal I',
            name: 'Multiversal',
            id: 1
        }
    } else if (levelRole <= 1180000) {
        role = {
            rank: 'Multiversal II',
            name: 'Multiversal',
            id: 2
        }
    } else if (levelRole <= 1200000) {
        role = {
            rank: 'Multiversal III',
            name: 'Multiversal',
            id: 3
        }
    } else if (levelRole <= 1220000) {
        role = {
            rank: 'Multiversal IV',
            name: 'Multiversal',
            id: 4
        }
    } else if (levelRole <= 1240000) {
        role = {
            rank: 'Omniversal I',
            name: 'Omniversal',
            id: 1
        }
    } else if (levelRole <= 1260000) {
        role = {
            rank: 'Omniversal II',
            name: 'Omniversal',
            id: 2
        }
    } else if (levelRole <= 1280000) {
        role = {
            rank: 'Omniversal III',
            name: 'Omniversal',
            id: 3
        }
    } else if (levelRole <= 1300000) {
        role = {
            rank: 'Omniversal IV',
            name: 'Omniversal',
            id: 4
        }
    } else if (levelRole <= 1320000) {
        role = {
            rank: 'Absolute I',
            name: 'Absolute',
            id: 1
        }
    } else if (levelRole <= 1340000) {
        role = {
            rank: 'Absolute II',
            name: 'Absolute',
            id: 2
        }
    } else if (levelRole <= 1360000) {
        role = {
            rank: 'Absolute III',
            name: 'Absolute',
            id: 3
        }
    } else if (levelRole <= 1380000) {
        role = {
            rank: 'Absolute IV',
            name: 'Absolute',
            id: 4
        }
    } else if (levelRole <= 1400000) {
        role = {
            rank: 'Ultimate I',
            name: 'Ultimate',
            id: 1
        }
    } else if (levelRole <= 1420000) {
        role = {
            rank: 'Ultimate II',
            name: 'Ultimate',
            id: 2
        }
    } else if (levelRole <= 1440000) {
        role = {
            rank: 'Ultimate III',
            name: 'Ultimate',
            id: 3
        }
    } else if (levelRole <= 1460000) {
        role = {
            rank: 'Ultimate IV',
            name: 'Ultimate',
            id: 4
        }
    } else if (levelRole <= 1480000) {
        role = {
            rank: 'Supreme Alpha I',
            name: 'Supreme Alpha',
            id: 1
        }
    } else if (levelRole <= 1500000) {
        role = {
            rank: 'Supreme Alpha II',
            name: 'Supreme Alpha',
            id: 2
        }
    } else if (levelRole <= 1520000) {
        role = {
            rank: 'Supreme Alpha III',
            name: 'Supreme Alpha',
            id: 3
        }
    } else if (levelRole <= 1540000) {
        role = {
            rank: 'Supreme Alpha IV',
            name: 'Supreme Alpha',
            id: 4
        }
    } else if (levelRole <= 1560000) {
        role = {
            rank: 'Eternal Omega I',
            name: 'Eternal Omega',
            id: 1
        }
    } else if (levelRole <= 1580000) {
        role = {
            rank: 'Eternal Omega II',
            name: 'Eternal Omega',
            id: 2
        }
    } else if (levelRole <= 1600000) {
        role = {
            rank: 'Eternal Omega III',
            name: 'Eternal Omega',
            id: 3
        }
    } else if (levelRole <= 1620000) {
        role = {
            rank: 'Eternal Omega IV',
            name: 'Eternal Omega',
            id: 4
        }
    } else if (levelRole <= 1640000) {
        role = {
            rank: 'Immortal God I',
            name: 'Immortal God',
            id: 1
        }
    } else if (levelRole <= 1660000) {
        role = {
            rank: 'Immortal God II',
            name: 'Immortal God',
            id: 2
        }
    } else if (levelRole <= 1680000) {
        role = {
            rank: 'Immortal God III',
            name: 'Immortal God',
            id: 3
        }
    } else if (levelRole <= 1700000) {
        role = {
            rank: 'Immortal God IV',
            name: 'Immortal God',
            id: 4
        }
    } else if (levelRole <= 1720000) {
        role = {
            rank: 'Celestial Deity I',
            name: 'Celestial Deity',
            id: 1
        }
    } else if (levelRole <= 1740000) {
        role = {
            rank: 'Celestial Deity II',
            name: 'Celestial Deity',
            id: 2
        }
    } else if (levelRole <= 1760000) {
        role = {
            rank: 'Celestial Deity III',
            name: 'Celestial Deity',
            id: 3
        }
    } else if (levelRole <= 1780000) {
        role = {
            rank: 'Celestial Deity IV',
            name: 'Celestial Deity',
            id: 4
        }
    } else if (levelRole <= 1800000) {
        role = {
            rank: 'Divine Creator I',
            name: 'Divine Creator',
            id: 1
        }
    } else if (levelRole <= 1820000) {
        role = {
            rank: 'Divine Creator II',
            name: 'Divine Creator',
            id: 2
        }
    } else if (levelRole <= 1840000) {
        role = {
            rank: 'Divine Creator III',
            name: 'Divine Creator',
            id: 3
        }
    } else if (levelRole <= 1860000) {
        role = {
            rank: 'Divine Creator IV',
            name: 'Divine Creator',
            id: 4
        }
    } else if (levelRole <= 1880000) {
        role = {
            rank: 'Titan Overlord I',
            name: 'Titan Overlord',
            id: 1
        }
    } else if (levelRole <= 1900000) {
        role = {
            rank: 'Titan Overlord II',
            name: 'Titan Overlord',
            id: 2
        }
    } else if (levelRole <= 1920000) {
        role = {
            rank: 'Titan Overlord III',
            name: 'Titan Overlord',
            id: 3
        }
    } else if (levelRole <= 1940000) {
        role = {
            rank: 'Titan Overlord IV',
            name: 'Titan Overlord',
            id: 4
        }
    } else if (levelRole <= 1960000) {
        role = {
            rank: 'Godlike Emperor I',
            name: 'Godlike Emperor',
            id: 1
        }
    } else if (levelRole <= 1980000) {
        role = {
            rank: 'Godlike Emperor II',
            name: 'Godlike Emperor',
            id: 2
        }
    } else if (levelRole <= 2000000) {
        role = {
            rank: 'Godlike Emperor III',
            name: 'Godlike Emperor',
            id: 3
        }
    } else if (levelRole <= 2020000) {
        role = {
            rank: 'Godlike Emperor IV',
            name: 'Godlike Emperor',
            id: 4
        }
    } else if (levelRole <= 2040000) {
        role = {
            rank: 'Omnipotent King I',
            name: 'Omnipotent King',
            id: 1
        }
    } else if (levelRole <= 2060000) {
        role = {
            rank: 'Omnipotent King II',
            name: 'Omnipotent King',
            id: 2
        }
    } else if (levelRole <= 2080000) {
        role = {
            rank: 'Omnipotent King III',
            name: 'Omnipotent King',
            id: 3
        }
    } else if (levelRole <= 2100000) {
        role = {
            rank: 'Omnipotent King IV',
            name: 'Omnipotent King',
            id: 4
        }
    } else if (levelRole <= 2200000) {
        role = {
            rank: 'Supreme Legend I',
            name: 'Supreme Legend',
            id: 1
        }
    } else if (levelRole <= 2300000) {
        role = {
            rank: 'Supreme Legend II',
            name: 'Supreme Legend',
            id: 2
        }
    } else if (levelRole <= 2400000) {
        role = {
            rank: 'Supreme Legend III',
            name: 'Supreme Legend',
            id: 3
        }
    } else if (levelRole <= 2500000) {
        role = {
            rank: 'Supreme Legend IV',
            name: 'Supreme Legend',
            id: 4
        }
    } else if (levelRole <= 2600000) {
        role = {
            rank: 'Eternal Myth I',
            name: 'Eternal Myth',
            id: 1
        }
    } else if (levelRole <= 2700000) {
        role = {
            rank: 'Eternal Myth II',
            name: 'Eternal Myth',
            id: 2
        }
    } else if (levelRole <= 2800000) {
        role = {
            rank: 'Eternal Myth III',
            name: 'Eternal Myth',
            id: 3
        }
    } else if (levelRole <= 2900000) {
        role = {
            rank: 'Eternal Myth IV',
            name: 'Eternal Myth',
            id: 4
        }
    } else if (levelRole <= 3000000) {
        role = {
            rank: 'Immortal Phoenix I',
            name: 'Immortal Phoenix',
            id: 1
        }
    } else if (levelRole <= 3100000) {
        role = {
            rank: 'Immortal Phoenix II',
            name: 'Immortal Phoenix',
            id: 2
        }
    } else if (levelRole <= 3200000) {
        role = {
            rank: 'Immortal Phoenix III',
            name: 'Immortal Phoenix',
            id: 3
        }
    } else if (levelRole <= 3300000) {
        role = {
            rank: 'Immortal Phoenix IV',
            name: 'Immortal Phoenix',
            id: 4
        }
    } else if (levelRole <= 3400000) {
        role = {
            rank: 'Celestial Dragon I',
            name: 'Celestial Dragon',
            id: 1
        }
    } else if (levelRole <= 3500000) {
        role = {
            rank: 'Celestial Dragon II',
            name: 'Celestial Dragon',
            id: 2
        }
    } else if (levelRole <= 3600000) {
        role = {
            rank: 'Celestial Dragon III',
            name: 'Celestial Dragon',
            id: 3
        }
    } else if (levelRole <= 3700000) {
        role = {
            rank: 'Celestial Dragon IV',
            name: 'Celestial Dragon',
            id: 4
        }
    } else if (levelRole <= 3800000) {
        role = {
            rank: 'Divine Archon I',
            name: 'Divine Archon',
            id: 1
        }
    } else if (levelRole <= 3900000) {
        role = {
            rank: 'Divine Archon II',
            name: 'Divine Archon',
            id: 2
        }
    } else if (levelRole <= 4000000) {
        role = {
            rank: 'Divine Archon III',
            name: 'Divine Archon',
            id: 3
        }
    } else if (levelRole <= 4100000) {
        role = {
            rank: 'Divine Archon IV',
            name: 'Divine Archon',
            id: 4
        }
    } else if (levelRole <= 4200000) {
        role = {
            rank: 'Titan Prime I',
            name: 'Titan Prime',
            id: 1
        }
    } else if (levelRole <= 4300000) {
        role = {
            rank: 'Titan Prime II',
            name: 'Titan Prime',
            id: 2
        }
    } else if (levelRole <= 4400000) {
        role = {
            rank: 'Titan Prime III',
            name: 'Titan Prime',
            id: 3
        }
    } else if (levelRole <= 4500000) {
        role = {
            rank: 'Titan Prime IV',
            name: 'Titan Prime',
            id: 4
        }
    } else if (levelRole <= 4600000) {
        role = {
            rank: 'Godlike Sovereign I',
            name: 'Godlike Sovereign',
            id: 1
        }
    } else if (levelRole <= 4700000) {
        role = {
            rank: 'Godlike Sovereign II',
            name: 'Godlike Sovereign',
            id: 2
        }
    } else if (levelRole <= 4800000) {
        role = {
            rank: 'Godlike Sovereign III',
            name: 'Godlike Sovereign',
            id: 3
        }
    } else if (levelRole <= 4900000) {
        role = {
            rank: 'Godlike Sovereign IV',
            name: 'Godlike Sovereign',
            id: 4
        }
    } else if (levelRole <= 5000000) {
        role = {
            rank: 'Omnipotent Ascendant I',
            name: 'Omnipotent Ascendant',
            id: 1
        }
    } else if (levelRole <= 5100000) {
        role = {
            rank: 'Omnipotent Ascendant II',
            name: 'Omnipotent Ascendant',
            id: 2
        }
    } else if (levelRole <= 5200000) {
        role = {
            rank: 'Omnipotent Ascendant III',
            name: 'Omnipotent Ascendant',
            id: 3
        }
    } else if (levelRole <= 5300000) {
        role = {
            rank: 'Omnipotent Ascendant IV',
            name: 'Omnipotent Ascendant',
            id: 4
        }
    } else if (levelRole <= 5400000) {
        role = {
            rank: 'Supreme Paragon I',
            name: 'Supreme Paragon',
            id: 1
        }
    } else if (levelRole <= 5500000) {
        role = {
            rank: 'Supreme Paragon II',
            name: 'Supreme Paragon',
            id: 2
        }
    } else if (levelRole <= 5600000) {
        role = {
            rank: 'Supreme Paragon III',
            name: 'Supreme Paragon',
            id: 3
        }
    } else if (levelRole <= 5700000) {
        role = {
            rank: 'Supreme Paragon IV',
            name: 'Supreme Paragon',
            id: 4
        }
    } else if (levelRole <= 5800000) {
        role = {
            rank: 'Eternal Zenith I',
            name: 'Eternal Zenith',
            id: 1
        }
    } else if (levelRole <= 5900000) {
        role = {
            rank: 'Eternal Zenith II',
            name: 'Eternal Zenith',
            id: 2
        }
    } else if (levelRole <= 6000000) {
        role = {
            rank: 'Eternal Zenith III',
            name: 'Eternal Zenith',
            id: 3
        }
    } else if (levelRole <= 6100000) {
        role = {
            rank: 'Eternal Zenith IV',
            name: 'Eternal Zenith',
            id: 4
        }
    } else if (levelRole <= 6200000) {
        role = {
            rank: 'Immortal Apex I',
            name: 'Immortal Apex',
            id: 1
        }
    } else if (levelRole <= 6300000) {
        role = {
            rank: 'Immortal Apex II',
            name: 'Immortal Apex',
            id: 2
        }
    } else if (levelRole <= 6400000) {
        role = {
            rank: 'Immortal Apex III',
            name: 'Immortal Apex',
            id: 3
        }
    } else if (levelRole <= 6500000) {
        role = {
            rank: 'Immortal Apex IV',
            name: 'Immortal Apex',
            id: 4
        }
    } else if (levelRole <= 6600000) {
        role = {
            rank: 'Celestial Pinnacle I',
            name: 'Celestial Pinnacle',
            id: 1
        }
    } else if (levelRole <= 6700000) {
        role = {
            rank: 'Celestial Pinnacle II',
            name: 'Celestial Pinnacle',
            id: 2
        }
    } else if (levelRole <= 6800000) {
        role = {
            rank: 'Celestial Pinnacle III',
            name: 'Celestial Pinnacle',
            id: 3
        }
    } else if (levelRole <= 6900000) {
        role = {
            rank: 'Celestial Pinnacle IV',
            name: 'Celestial Pinnacle',
            id: 4
        }
    } else if (levelRole <= 7000000) {
        role = {
            rank: 'Divine Peak I',
            name: 'Divine Peak',
            id: 1
        }
    } else if (levelRole <= 7100000) {
        role = {
            rank: 'Divine Peak II',
            name: 'Divine Peak',
            id: 2
        }
    } else if (levelRole <= 7200000) {
        role = {
            rank: 'Divine Peak III',
            name: 'Divine Peak',
            id: 3
        }
    } else if (levelRole <= 7300000) {
        role = {
            rank: 'Divine Peak IV',
            name: 'Divine Peak',
            id: 4
        }
    } else if (levelRole <= 7400000) {
        role = {
            rank: 'Titan Summit I',
            name: 'Titan Summit',
            id: 1
        }
    } else if (levelRole <= 7500000) {
        role = {
            rank: 'Titan Summit II',
            name: 'Titan Summit',
            id: 2
        }
    } else if (levelRole <= 7600000) {
        role = {
            rank: 'Titan Summit III',
            name: 'Titan Summit',
            id: 3
        }
    } else if (levelRole <= 7700000) {
        role = {
            rank: 'Titan Summit IV',
            name: 'Titan Summit',
            id: 4
        }
    } else if (levelRole <= 7800000) {
        role = {
            rank: 'Godlike Apex I',
            name: 'Godlike Apex',
            id: 1
        }
    } else if (levelRole <= 7900000) {
        role = {
            rank: 'Godlike Apex II',
            name: 'Godlike Apex',
            id: 2
        }
    } else if (levelRole <= 8000000) {
        role = {
            rank: 'Godlike Apex III',
            name: 'Godlike Apex',
            id: 3
        }
    } else if (levelRole <= 8100000) {
        role = {
            rank: 'Godlike Apex IV',
            name: 'Godlike Apex',
            id: 4
        }
    } else if (levelRole <= 8200000) {
        role = {
            rank: 'Omnipotent Supreme I',
            name: 'Omnipotent Supreme',
            id: 1
        }
    } else if (levelRole <= 8300000) {
        role = {
            rank: 'Omnipotent Supreme II',
            name: 'Omnipotent Supreme',
            id: 2
        }
    } else if (levelRole <= 8400000) {
        role = {
            rank: 'Omnipotent Supreme III',
            name: 'Omnipotent Supreme',
            id: 3
        }
    } else if (levelRole <= 8500000) {
        role = {
            rank: 'Omnipotent Supreme IV',
            name: 'Omnipotent Supreme',
            id: 4
        }
    } else if (levelRole <= 8600000) {
        role = {
            rank: 'Supreme Emperor I',
            name: 'Supreme Emperor',
            id: 1
        }
    } else if (levelRole <= 8700000) {
        role = {
            rank: 'Supreme Emperor II',
            name: 'Supreme Emperor',
            id: 2
        }
    } else if (levelRole <= 8800000) {
        role = {
            rank: 'Supreme Emperor III',
            name: 'Supreme Emperor',
            id: 3
        }
    } else if (levelRole <= 8900000) {
        role = {
            rank: 'Supreme Emperor IV',
            name: 'Supreme Emperor',
            id: 4
        }
    } else if (levelRole <= 9000000) {
        role = {
            rank: 'Eternal Overlord I',
            name: 'Eternal Overlord',
            id: 1
        }
    } else if (levelRole <= 9100000) {
        role = {
            rank: 'Eternal Overlord II',
            name: 'Eternal Overlord',
            id: 2
        }
    } else if (levelRole <= 9200000) {
        role = {
            rank: 'Eternal Overlord III',
            name: 'Eternal Overlord',
            id: 3
        }
    } else if (levelRole <= 9300000) {
        role = {
            rank: 'Eternal Overlord IV',
            name: 'Eternal Overlord',
            id: 4
        }
    } else if (levelRole <= 9400000) {
        role = {
            rank: 'Immortal Monarch I',
            name: 'Immortal Monarch',
            id: 1
        }
    } else if (levelRole <= 9500000) {
        role = {
            rank: 'Immortal Monarch II',
            name: 'Immortal Monarch',
            id: 2
        }
    } else if (levelRole <= 9600000) {
        role = {
            rank: 'Immortal Monarch III',
            name: 'Immortal Monarch',
            id: 3
        }
    } else if (levelRole <= 9700000) {
        role = {
            rank: 'Immortal Monarch IV',
            name: 'Immortal Monarch',
            id: 4
        }
    } else if (levelRole <= 9800000) {
        role = {
            rank: 'Celestial King I',
            name: 'Celestial King',
            id: 1
        }
    } else if (levelRole <= 9900000) {
        role = {
            rank: 'Celestial King II',
            name: 'Celestial King',
            id: 2
        }
    } else if (levelRole <= 10000000) {
        role = {
            rank: 'Celestial King III',
            name: 'Celestial King',
            id: 3
        }
    } else if (levelRole <= 10100000) {
        role = {
            rank: 'Celestial King IV',
            name: 'Celestial King',
            id: 4
        }
    } else if (levelRole <= 10200000) {
        role = {
            rank: 'Divine God I',
            name: 'Divine God',
            id: 1
        }
    } else if (levelRole <= 10300000) {
        role = {
            rank: 'Divine God II',
            name: 'Divine God',
            id: 2
        }
    } else if (levelRole <= 10400000) {
        role = {
            rank: 'Divine God III',
            name: 'Divine God',
            id: 3
        }
    } else if (levelRole <= 10500000) {
        role = {
            rank: 'Divine God IV',
            name: 'Divine God',
            id: 4
        }
    } else if (levelRole <= 10600000) {
        role = {
            rank: 'Titan God I',
            name: 'Titan God',
            id: 1
        }
    } else if (levelRole <= 10700000) {
        role = {
            rank: 'Titan God II',
            name: 'Titan God',
            id: 2
        }
    } else if (levelRole <= 10800000) {
        role = {
            rank: 'Titan God III',
            name: 'Titan God',
            id: 3
        }
    } else if (levelRole <= 10900000) {
        role = {
            rank: 'Titan God IV',
            name: 'Titan God',
            id: 4
        }
    } else if (levelRole <= 11000000) {
        role = {
            rank: 'Godlike Deity I',
            name: 'Godlike Deity',
            id: 1
        }
    } else if (levelRole <= 11100000) {
        role = {
            rank: 'Godlike Deity II',
            name: 'Godlike Deity',
            id: 2
        }
    } else if (levelRole <= 11200000) {
        role = {
            rank: 'Godlike Deity III',
            name: 'Godlike Deity',
            id: 3
        }
    } else if (levelRole <= 11300000) {
        role = {
            rank: 'Godlike Deity IV',
            name: 'Godlike Deity',
            id: 4
        }
    } else if (levelRole <= 11400000) {
        role = {
            rank: 'Omnipotent Creator I',
            name: 'Omnipotent Creator',
            id: 1
        }
    } else if (levelRole <= 11500000) {
        role = {
            rank: 'Omnipotent Creator II',
            name: 'Omnipotent Creator',
            id: 2
        }
    } else if (levelRole <= 11600000) {
        role = {
            rank: 'Omnipotent Creator III',
            name: 'Omnipotent Creator',
            id: 3
        }
    } else if (levelRole <= 11700000) {
        role = {
            rank: 'Omnipotent Creator IV',
            name: 'Omnipotent Creator',
            id: 4
        }
    } else if (levelRole <= 11800000) {
        role = {
            rank: 'Supreme Ultimate I',
            name: 'Supreme Ultimate',
            id: 1
        }
    } else if (levelRole <= 11900000) {
        role = {
            rank: 'Supreme Ultimate II',
            name: 'Supreme Ultimate',
            id: 2
        }
    } else if (levelRole <= 12000000) {
        role = {
            rank: 'Supreme Ultimate III',
            name: 'Supreme Ultimate',
            id: 3
        }
    } else if (levelRole <= 12100000) {
        role = {
            rank: 'Supreme Ultimate IV',
            name: 'Supreme Ultimate',
            id: 4
        }
    } else if (levelRole <= 12200000) {
        role = {
            rank: 'Eternal Infinity I',
            name: 'Eternal Infinity',
            id: 1
        }
    } else if (levelRole <= 12300000) {
        role = {
            rank: 'Eternal Infinity II',
            name: 'Eternal Infinity',
            id: 2
        }
    } else if (levelRole <= 12400000) {
        role = {
            rank: 'Eternal Infinity III',
            name: 'Eternal Infinity',
            id: 3
        }
    } else if (levelRole <= 12500000) {
        role = {
            rank: 'Eternal Infinity IV',
            name: 'Eternal Infinity',
            id: 4
        }
    } else if (levelRole <= 12600000) {
        role = {
            rank: 'Immortal Universe I',
            name: 'Immortal Universe',
            id: 1
        }
    } else if (levelRole <= 12700000) {
        role = {
            rank: 'Immortal Universe II',
            name: 'Immortal Universe',
            id: 2
        }
    } else if (levelRole <= 12800000) {
        role = {
            rank: 'Immortal Universe III',
            name: 'Immortal Universe',
            id: 3
        }
    } else if (levelRole <= 12900000) {
        role = {
            rank: 'Immortal Universe IV',
            name: 'Immortal Universe',
            id: 4
        }
    } else if (levelRole <= 13000000) {
        role = {
            rank: 'Celestial Multiverse I',
            name: 'Celestial Multiverse',
            id: 1
        }
    } else if (levelRole <= 13100000) {
        role = {
            rank: 'Celestial Multiverse II',
            name: 'Celestial Multiverse',
            id: 2
        }
    } else if (levelRole <= 13200000) {
        role = {
            rank: 'Celestial Multiverse III',
            name: 'Celestial Multiverse',
            id: 3
        }
    } else if (levelRole <= 13300000) {
        role = {
            rank: 'Celestial Multiverse IV',
            name: 'Celestial Multiverse',
            id: 4
        }
    } else if (levelRole <= 13400000) {
        role = {
            rank: 'Divine Omniverse I',
            name: 'Divine Omniverse',
            id: 1
        }
    } else if (levelRole <= 13500000) {
        role = {
            rank: 'Divine Omniverse II',
            name: 'Divine Omniverse',
            id: 2
        }
    } else if (levelRole <= 13600000) {
        role = {
            rank: 'Divine Omniverse III',
            name: 'Divine Omniverse',
            id: 3
        }
    } else if (levelRole <= 13700000) {
        role = {
            rank: 'Divine Omniverse IV',
            name: 'Divine Omniverse',
            id: 4
        }
    } else if (levelRole <= 13800000) {
        role = {
            rank: 'Titan Absolute I',
            name: 'Titan Absolute',
            id: 1
        }
    } else if (levelRole <= 13900000) {
        role = {
            rank: 'Titan Absolute II',
            name: 'Titan Absolute',
            id: 2
        }
    } else if (levelRole <= 14000000) {
        role = {
            rank: 'Titan Absolute III',
            name: 'Titan Absolute',
            id: 3
        }
    } else if (levelRole <= 14100000) {
        role = {
            rank: 'Titan Absolute IV',
            name: 'Titan Absolute',
            id: 4
        }
    } else if (levelRole <= 14200000) {
        role = {
            rank: 'Godlike Supreme I',
            name: 'Godlike Supreme',
            id: 1
        }
    } else if (levelRole <= 14300000) {
        role = {
            rank: 'Godlike Supreme II',
            name: 'Godlike Supreme',
            id: 2
        }
    } else if (levelRole <= 14400000) {
        role = {
            rank: 'Godlike Supreme III',
            name: 'Godlike Supreme',
            id: 3
        }
    } else if (levelRole <= 14500000) {
        role = {
            rank: 'Godlike Supreme IV',
            name: 'Godlike Supreme',
            id: 4
        }
    } else if (levelRole <= 15000000) {
        role = {
            rank: '✨ ULTIMATE LEGEND ✨',
            name: 'Ultimate Legend',
            id: 999
        }
    } else {
        role = {
            rank: '🏆 SUPREME GOD OF THE UNIVERSE 🏆',
            name: 'Supreme God',
            id: 9999
        }
    }
    
    return role
}
     

       if (db.users[m.sender].exp > 500) {
    let background = "https://cdn.asuma.my.id/iudi983.jpg";
    let avatar = ppuser;
    let previousLevel = db.users[m.sender].level;
    db.users[m.sender].exp = 0;
    db.users[m.sender].level += 1;  
    let currentLevel = db.users[m.sender].level;
    
    await delay(1000);

    try {
        const encodedBackground = encodeURIComponent(background);
        const encodedAvatar = encodeURIComponent(avatar);
        const encodedName = m.pushName
        const apiUrl = `https://api.asuma.my.id/v1/canvas/level-up?background=${encodedBackground}&avatar=${encodedAvatar}&fromLevel=${previousLevel}&toLevel=${currentLevel}&name=${encodedName}&apikey=demo`;        
    const caption = `*🎉 C O N G R A T S 🎉*

*${previousLevel}* ➔ *${currentLevel}*

• 🧬 Level Sebelumnya : ${previousLevel}
• 🧬 Level Baru : ${currentLevel}
• ⏰ Pada Jam : ${new Date().toLocaleString("id-ID")}

*Pesan:*
Selamat Ya Kak 🥇
Hebat Levelmu Naik
`

        await Ditss.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: caption
        }, {
            quoted: m
        }); 
        
    } catch (error) {
        console.error('[Level Up Error]:', error.message);
        const options = {
            backgroundURL: background,
            avatarURL: avatar,
            fromLevel: `${previousLevel}`,
            toLevel: `${currentLevel}`,
            name: m.pushName
        };

        const buffz = await levelUp(options); 
        let caption = `*🎉 C O N G R A T S 🎉*\n\n*${previousLevel}* ➔ *${currentLevel}*\n\n• 🧬 Level Sebelumnya : ${previousLevel}\n• 🧬 Level Baru : ${currentLevel}\n• Pada Jam : ${new Date().toLocaleString("id-ID")}\n\n*Pesan:*\nSelamat Ya Kak 🥇\nHebat Levelmu Naik`;
        await Ditss.sendMessage(m.chat, {
            image: buffz,
            caption: caption
        }, {
            quoted: m
        });
    }
}

        // ===================== [TEBAK KALIMAT] HANDLER =====================
if (db.game.tebakkalimat?.[m.chat] && !isCmd) {
  const game = db.game.tebakkalimat[m.chat];
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
    await Ditss.sendMessage(
  m.chat,
  {
    text: `⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*`,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    delete db.game.tebakkalimat[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    await m.reply(`🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.jawaban}*`);
    delete db.game.tebakkalimat[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      await Ditss.sendMessage(m.sender, {
        text: `💡 *HINT TEBAK KALIMAT*\n\nKalimat: ${game.soal}\n\n_Hint ini rahasia ya! Jangan kasih tau yang lain_`
      });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    // PASTIKAN USER SELALU ADA DENGAN STRUKTUR LENGKAP
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    const difficulty = game.difficulty || 'medium';
    
    // INISIALISASI SEMUA FIELD YANG DIBUTUHKAN
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.tebakkalimat_win) user.tebakkalimat_win = 0;
    if (!user.tebakkalimat_total) user.tebakkalimat_total = 0;
    if (!user.tebakkalimat_wrong) user.tebakkalimat_wrong = 0;
    if (!user.tebakkalimat_best_time) user.tebakkalimat_best_time = Infinity;
    if (!user.tebakkalimat_lastwin) user.tebakkalimat_lastwin = 0;
    if (!user.tebakkalimat_last_difficulty) user.tebakkalimat_last_difficulty = '';
    if (!user.tebakkalimat_top) user.tebakkalimat_top = false;
    if (!user.tebakkalimat_top_rank) user.tebakkalimat_top_rank = 0;
    
    // INISIALISASI STATS JIKA BELUM ADA
    if (!user.tebakkalimat_stats) {
      user.tebakkalimat_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      };
    }
    
    // PASTIKAN SETIAP DIFFICULTY ADA
    ['easy', 'medium', 'hard'].forEach(diff => {
      if (!user.tebakkalimat_stats[diff]) {
        user.tebakkalimat_stats[diff] = { win: 0, total: 0, waktu: [] };
      }
      if (!user.tebakkalimat_stats[diff].waktu) {
        user.tebakkalimat_stats[diff].waktu = [];
      }
    });
    
    // INISIALISASI LIMIT JIKA BELUM ADA
    if (!user.tebakkalimat_limit) {
      user.tebakkalimat_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    user.tebakkalimat_win++;
    user.tebakkalimat_total++;
    user.tebakkalimat_lastwin = Date.now();
    user.tebakkalimat_last_difficulty = difficulty;
    
    const baseRewards = { 'easy': 200, 'medium': 300, 'hard': 500 };
    const waktuMaksimal = { 'easy': 90, 'medium': 60, 'hard': 30 };
    
    let waktuBonus = 0;
    if (detik <= waktuMaksimal[difficulty]) {
      waktuBonus = Math.round(baseRewards[difficulty] * 0.5);
    }
    
    const totalReward = baseRewards[difficulty] + waktuBonus;
    const rankBonus = Math.floor(Math.random() * 50) + 1;
    
    user.saldo += totalReward;
    user.rank += rankBonus;
    
    user.tebakkalimat_stats[difficulty].win++;
    user.tebakkalimat_stats[difficulty].total++;
    user.tebakkalimat_stats[difficulty].waktu.push(detik);
    
    if (detik < user.tebakkalimat_best_time) {
      user.tebakkalimat_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.tebakkalimat_ranking) {
      db.game.tebakkalimat_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.tebakkalimat_ranking.top1;
    const oldTop2 = db.game.tebakkalimat_ranking.top2;
    
    const allUsers = [];
    let usersTebakKalimat = await getAllUsers()
    for (let jid in usersTebakKalimat) {
      const u = db.users[jid];
      if (u && u.tebakkalimat_win > 0) {
        allUsers.push({
          jid,
          wins: u.tebakkalimat_win || 0,
          lastWin: u.tebakkalimat_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.tebakkalimat_top = (index === 0);
        userData.tebakkalimat_top_rank = index + 1;
      }
    });
    
    const userWins = user.tebakkalimat_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    let top2User = null;
    
    if (allUsers.length > 0) {
      db.game.tebakkalimat_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.tebakkalimat_ranking.top2 = allUsers[1].jid;
        top2User = {
          jid: allUsers[1].jid,
          name: allUsers[1].name,
          wins: allUsers[1].wins
        };
      } else {
        db.game.tebakkalimat_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.tebakkalimat_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
    
    const difficultyEmoji = { 'easy': '🟢', 'medium': '🟡', 'hard': '🔴' };
        await Ditss.sendMessage(
  m.chat,
  {
    text: `
${difficultyEmoji[difficulty]} *LEVEL ${difficulty.toUpperCase()} - BENAR!* 

📝 *Kalimat:* ${game.soal}
✅ *Jawaban:* ${game.jawaban}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah (${difficulty}):*
├ +${totalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.tebakkalimat_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${readmore}
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `,
    footer: "Powered by asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)    
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Tebak Kalimat!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${totalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Tebak Kalimat telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    if (user.tebakkalimat_limit[difficulty] > 0) {
      user.tebakkalimat_limit[difficulty]--;
    }
    
    delete db.game.tebakkalimat[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
  await Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      tebakkalimat_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.tebakkalimat_wrong) wrongUser.tebakkalimat_wrong = 0;
  wrongUser.tebakkalimat_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan kata itu!",
      "Coba pikirkan kata yang tepat untuk melengkapi kalimat!",
      "Masih ada waktu, coba lagi!"
    ];
   // m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}       
if (db.game.susunkata?.[m.chat] && !isCmd) {
  const game = db.game.susunkata[m.chat];
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
      await Ditss.sendMessage(
  m.chat,
  {
    text: `⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*\nTipe: ${game.tipe}`,
    footer: "Hello World",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    //await m.reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*\nTipe: ${game.tipe}`);
    delete db.game.susunkata[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    await m.reply(`🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.jawaban}*\nTipe: ${game.tipe}`);
    delete db.game.susunkata[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      await Ditss.sendMessage(m.sender, {
        text: `💡 *HINT SUSUN KATA*\n\nHuruf: ${game.soal}\nTipe: ${game.tipe}\n\n_Hint ini rahasia ya! Jangan kasih tau yang lain_`
      });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.susunkata_win) user.susunkata_win = 0;
    if (!user.susunkata_total) user.susunkata_total = 0;
    if (!user.susunkata_wrong) user.susunkata_wrong = 0;
    if (!user.susunkata_best_time) user.susunkata_best_time = Infinity;
    if (!user.susunkata_lastwin) user.susunkata_lastwin = 0;
    if (!user.susunkata_top) user.susunkata_top = false;
    if (!user.susunkata_top_rank) user.susunkata_top_rank = 0;
    
    user.susunkata_win++;
    user.susunkata_total++;
    user.susunkata_lastwin = Date.now();
    
    let waktuBonus = 0;
    const totalReward = 250;
    const rankBonus = Math.floor(Math.random() * 30) + 1;
    
    if (detik <= 60) {
      waktuBonus = Math.round(totalReward * 0.5);
    }
    
    const finalReward = totalReward + waktuBonus;
    
    user.saldo += finalReward;
    user.rank += rankBonus;
    
    if (detik < user.susunkata_best_time) {
      user.susunkata_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.susunkata_ranking) {
      db.game.susunkata_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.susunkata_ranking.top1;
    
    const allUsers = [];
    let usersSusunKataa = await getAllUsers();
    for (let jid in usersSusunKataa) {
      const u = db.users[jid];
      if (u && u.susunkata_win > 0) {
        allUsers.push({
          jid,
          wins: u.susunkata_win || 0,
          lastWin: u.susunkata_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.susunkata_top = (index === 0);
        userData.susunkata_top_rank = index + 1;
      }
    });
    
    const userWins = user.susunkata_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    
    if (allUsers.length > 0) {
      db.game.susunkata_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.susunkata_ranking.top2 = allUsers[1].jid;
      } else {
        db.game.susunkata_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.susunkata_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
        await Ditss.sendMessage(
  m.chat,
  {
    text: `
🧩 *SUSUN KATA - BENAR!* 

🔤 *Huruf:* ${game.soal}
📝 *Tipe:* ${game.tipe}
✅ *Jawaban:* ${game.jawaban}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah:*
├ +${finalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.susunkata_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${readmore}
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
   // await m.reply();
    
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Susun Kata!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${finalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          const oldTop1Data = db.users[oldTop1];
          const oldTop1Name = oldTop1Data?.name && oldTop1Data.name !== 'Unknown' ? 
            oldTop1Data.name : oldTop1.split('@')[0];
          
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Susun Kata telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    delete db.game.susunkata[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
 await Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      susunkata_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.susunkata_wrong) wrongUser.susunkata_wrong = 0;
  wrongUser.susunkata_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan kata itu!",
      "Coba susun huruf-huruf di atas menjadi kata yang bermakna!",
      "Masih ada waktu, coba lagi!"
    ];
   // m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}
if (db.game.tebakkata?.[m.chat] && !isCmd) {
  const game = db.game.tebakkata[m.chat];
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
        await Ditss.sendMessage(
  m.chat,
  {
    text: `⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*`,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    delete db.game.tebakkata[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    await m.reply(`🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.jawaban}*`);
    delete db.game.tebakkata[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      await Ditss.sendMessage(m.sender, {
        text: `💡 *HINT TEBAK KATA*\n\nSoal: ${game.soal}\n\n_Hint ini rahasia ya! Jangan kasih tau yang lain_`
      });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    const difficulty = game.difficulty || 'medium';
    
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.tebakkata_win) user.tebakkata_win = 0;
    if (!user.tebakkata_total) user.tebakkata_total = 0;
    if (!user.tebakkata_wrong) user.tebakkata_wrong = 0;
    if (!user.tebakkata_best_time) user.tebakkata_best_time = Infinity;
    if (!user.tebakkata_lastwin) user.tebakkata_lastwin = 0;
    if (!user.tebakkata_last_difficulty) user.tebakkata_last_difficulty = '';
    if (!user.tebakkata_top) user.tebakkata_top = false;
    if (!user.tebakkata_top_rank) user.tebakkata_top_rank = 0;
    
    if (!user.tebakkata_stats) {
      user.tebakkata_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      };
    }
    
    ['easy', 'medium', 'hard'].forEach(diff => {
      if (!user.tebakkata_stats[diff]) {
        user.tebakkata_stats[diff] = { win: 0, total: 0, waktu: [] };
      }
      if (!user.tebakkata_stats[diff].waktu) {
        user.tebakkata_stats[diff].waktu = [];
      }
    });
    
    if (!user.tebakkata_limit) {
      user.tebakkata_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    user.tebakkata_win++;
    user.tebakkata_total++;
    user.tebakkata_lastwin = Date.now();
    user.tebakkata_last_difficulty = difficulty;
    
    const baseRewards = { 'easy': 200, 'medium': 300, 'hard': 500 };
    const waktuMaksimal = { 'easy': 90, 'medium': 60, 'hard': 30 };
    
    let waktuBonus = 0;
    if (detik <= waktuMaksimal[difficulty]) {
      waktuBonus = Math.round(baseRewards[difficulty] * 0.5);
    }
    
    const totalReward = baseRewards[difficulty] + waktuBonus;
    const rankBonus = Math.floor(Math.random() * 50) + 1;
    
    user.saldo += totalReward;
    user.rank += rankBonus;
    
    user.tebakkata_stats[difficulty].win++;
    user.tebakkata_stats[difficulty].total++;
    user.tebakkata_stats[difficulty].waktu.push(detik);
    
    if (detik < user.tebakkata_best_time) {
      user.tebakkata_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.tebakkata_ranking) {
      db.game.tebakkata_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.tebakkata_ranking.top1;
    
    const allUsers = [];
    const userTebakKata = await getAllUsers();
    for (let jid in userTebakKata) {
      const u = db.users[jid];
      if (u && u.tebakkata_win > 0) {
        allUsers.push({
          jid,
          wins: u.tebakkata_win || 0,
          lastWin: u.tebakkata_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.tebakkata_top = (index === 0);
        userData.tebakkata_top_rank = index + 1;
      }
    });
    
    const userWins = user.tebakkata_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    
    if (allUsers.length > 0) {
      db.game.tebakkata_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.tebakkata_ranking.top2 = allUsers[1].jid;
      } else {
        db.game.tebakkata_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.tebakkata_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
    
    const difficultyEmoji = { 'easy': '🟢', 'medium': '🟡', 'hard': '🔴' };
        await Ditss.sendMessage(
  m.chat,
  {
    text: `
${difficultyEmoji[difficulty]} *TEBAK KATA - LEVEL ${difficulty.toUpperCase()} - BENAR!* 

📝 *Soal:* ${game.soal}
✅ *Jawaban:* ${game.jawaban}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah (${difficulty}):*
├ +${totalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.tebakkata_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Tebak Kata!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${totalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Tebak Kata telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    if (user.tebakkata_limit[difficulty] > 0) {
      user.tebakkata_limit[difficulty]--;
    }
    
    delete db.game.tebakkata[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
await Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      tebakkata_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.tebakkata_wrong) wrongUser.tebakkata_wrong = 0;
  wrongUser.tebakkata_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan kata itu!",
      "Coba tebak kata berdasarkan petunjuk di atas!",
      "Masih ada waktu, coba lagi!"
    ];
   // m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}
if (db.game.siapakahaku?.[m.chat] && !isCmd) {
  const game = db.game.siapakahaku[m.chat];
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
        await Ditss.sendMessage(
  m.chat,
  {
    text: `⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*`,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    delete db.game.siapakahaku[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    await m.reply(`🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.jawaban}*`);
    delete db.game.siapakahaku[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      await Ditss.sendMessage(m.sender, {
        text: `💡 *HINT SIAPAKAH AKU*\n\nPetunjuk: ${game.soal}\n\n_Hint ini rahasia ya! Jangan kasih tau yang lain_`
      });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    const difficulty = game.difficulty || 'medium';
    
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.siapakahaku_win) user.siapakahaku_win = 0;
    if (!user.siapakahaku_total) user.siapakahaku_total = 0;
    if (!user.siapakahaku_wrong) user.siapakahaku_wrong = 0;
    if (!user.siapakahaku_best_time) user.siapakahaku_best_time = Infinity;
    if (!user.siapakahaku_lastwin) user.siapakahaku_lastwin = 0;
    if (!user.siapakahaku_last_difficulty) user.siapakahaku_last_difficulty = '';
    if (!user.siapakahaku_top) user.siapakahaku_top = false;
    if (!user.siapakahaku_top_rank) user.siapakahaku_top_rank = 0;
    
    if (!user.siapakahaku_stats) {
      user.siapakahaku_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      };
    }
    
    ['easy', 'medium', 'hard'].forEach(diff => {
      if (!user.siapakahaku_stats[diff]) {
        user.siapakahaku_stats[diff] = { win: 0, total: 0, waktu: [] };
      }
      if (!user.siapakahaku_stats[diff].waktu) {
        user.siapakahaku_stats[diff].waktu = [];
      }
    });
    
    if (!user.siapakahaku_limit) {
      user.siapakahaku_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    user.siapakahaku_win++;
    user.siapakahaku_total++;
    user.siapakahaku_lastwin = Date.now();
    user.siapakahaku_last_difficulty = difficulty;
    
    const baseRewards = { 'easy': 200, 'medium': 300, 'hard': 500 };
    const waktuMaksimal = { 'easy': 90, 'medium': 60, 'hard': 30 };
    
    let waktuBonus = 0;
    if (detik <= waktuMaksimal[difficulty]) {
      waktuBonus = Math.round(baseRewards[difficulty] * 0.5);
    }
    
    const totalReward = baseRewards[difficulty] + waktuBonus;
    const rankBonus = Math.floor(Math.random() * 50) + 1;
    
    user.saldo += totalReward;
    user.rank += rankBonus;
    
    user.siapakahaku_stats[difficulty].win++;
    user.siapakahaku_stats[difficulty].total++;
    user.siapakahaku_stats[difficulty].waktu.push(detik);
    
    if (detik < user.siapakahaku_best_time) {
      user.siapakahaku_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.siapakahaku_ranking) {
      db.game.siapakahaku_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.siapakahaku_ranking.top1;
    
    const allUsers = [];
    let usersiapakahAku = await getAllUsers();
    for (let jid in usersiapakahAku) {
      const u = db.users[jid];
      if (u && u.siapakahaku_win > 0) {
        allUsers.push({
          jid,
          wins: u.siapakahaku_win || 0,
          lastWin: u.siapakahaku_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.siapakahaku_top = (index === 0);
        userData.siapakahaku_top_rank = index + 1;
      }
    });
    
    const userWins = user.siapakahaku_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    
    if (allUsers.length > 0) {
      db.game.siapakahaku_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.siapakahaku_ranking.top2 = allUsers[1].jid;
      } else {
        db.game.siapakahaku_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.siapakahaku_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
    
    const difficultyEmoji = { 'easy': '🟢', 'medium': '🟡', 'hard': '🔴' };
        await Ditss.sendMessage(
  m.chat,
  {
    text: `
${difficultyEmoji[difficulty]} *SIAPAKAH AKU - LEVEL ${difficulty.toUpperCase()} - BENAR!* 

📝 *Petunjuk:* ${game.soal}
✅ *Jawaban:* ${game.jawaban}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah (${difficulty}):*
├ +${totalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.siapakahaku_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Siapakah Aku!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${totalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Siapakah Aku telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    if (user.siapakahaku_limit[difficulty] > 0) {
      user.siapakahaku_limit[difficulty]--;
    }
    
    delete db.game.siapakahaku[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
await Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      siapakahaku_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.siapakahaku_wrong) wrongUser.siapakahaku_wrong = 0;
  wrongUser.siapakahaku_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan jawaban itu!",
      "Coba tebak berdasarkan petunjuk di atas!",
      "Masih ada waktu, coba lagi!"
    ];
   // m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}
if (db.game.tebakgambar?.[m.chat] && !isCmd) {
  const game = db.game.tebakgambar[m.chat];
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
    await m.reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*${game.deskripsi ? `\nDeskripsi: ${game.deskripsi}` : ''}`);
    delete db.game.tebakgambar[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    await m.reply(`🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.jawaban}*${game.deskripsi ? `\nDeskripsi: ${game.deskripsi}` : ''}`);
    delete db.game.tebakgambar[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      let hintText = `💡 *HINT TEBAK GAMBAR*\n\n`;
      if (game.deskripsi) hintText += `Deskripsi: ${game.deskripsi}\n\n`;
      hintText += `_Hint ini rahasia ya! Jangan kasih tau yang lain_`;
      
      await Ditss.sendMessage(m.sender, { text: hintText });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    const difficulty = game.difficulty || 'medium';
    
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.tebakgambar_win) user.tebakgambar_win = 0;
    if (!user.tebakgambar_total) user.tebakgambar_total = 0;
    if (!user.tebakgambar_wrong) user.tebakgambar_wrong = 0;
    if (!user.tebakgambar_best_time) user.tebakgambar_best_time = Infinity;
    if (!user.tebakgambar_lastwin) user.tebakgambar_lastwin = 0;
    if (!user.tebakgambar_last_difficulty) user.tebakgambar_last_difficulty = '';
    if (!user.tebakgambar_top) user.tebakgambar_top = false;
    if (!user.tebakgambar_top_rank) user.tebakgambar_top_rank = 0;
    
    if (!user.tebakgambar_stats) {
      user.tebakgambar_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      };
    }
    
    ['easy', 'medium', 'hard'].forEach(diff => {
      if (!user.tebakgambar_stats[diff]) {
        user.tebakgambar_stats[diff] = { win: 0, total: 0, waktu: [] };
      }
      if (!user.tebakgambar_stats[diff].waktu) {
        user.tebakgambar_stats[diff].waktu = [];
      }
    });
    
    if (!user.tebakgambar_limit) {
      user.tebakgambar_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    user.tebakgambar_win++;
    user.tebakgambar_total++;
    user.tebakgambar_lastwin = Date.now();
    user.tebakgambar_last_difficulty = difficulty;
    
    const baseRewards = { 'easy': 200, 'medium': 300, 'hard': 500 };
    const waktuMaksimal = { 'easy': 90, 'medium': 60, 'hard': 30 };
    
    let waktuBonus = 0;
    if (detik <= waktuMaksimal[difficulty]) {
      waktuBonus = Math.round(baseRewards[difficulty] * 0.5);
    }
    
    const totalReward = baseRewards[difficulty] + waktuBonus;
    const rankBonus = Math.floor(Math.random() * 50) + 1;
    
    user.saldo += totalReward;
    user.rank += rankBonus;
    
    user.tebakgambar_stats[difficulty].win++;
    user.tebakgambar_stats[difficulty].total++;
    user.tebakgambar_stats[difficulty].waktu.push(detik);
    
    if (detik < user.tebakgambar_best_time) {
      user.tebakgambar_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.tebakgambar_ranking) {
      db.game.tebakgambar_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.tebakgambar_ranking.top1;
    
    const allUsers = [];
    let userTebakGambar = await getAllUsers();
    for (let jid in userTebakGambar) {
      const u = db.users[jid];
      if (u && u.tebakgambar_win > 0) {
        allUsers.push({
          jid,
          wins: u.tebakgambar_win || 0,
          lastWin: u.tebakgambar_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.tebakgambar_top = (index === 0);
        userData.tebakgambar_top_rank = index + 1;
      }
    });
    
    const userWins = user.tebakgambar_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    
    if (allUsers.length > 0) {
      db.game.tebakgambar_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.tebakgambar_ranking.top2 = allUsers[1].jid;
      } else {
        db.game.tebakgambar_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.tebakgambar_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
    
    const difficultyEmoji = { 'easy': '🟢', 'medium': '🟡', 'hard': '🔴' };
        await Ditss.sendMessage(
  m.chat,
  {
    text: `
${difficultyEmoji[difficulty]} *TEBAK GAMBAR - LEVEL ${difficulty.toUpperCase()} - BENAR!* 

🖼️ *Deskripsi:* ${game.deskripsi || 'Tidak ada deskripsi'}
✅ *Jawaban:* ${game.jawaban}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah (${difficulty}):*
├ +${totalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.tebakgambar_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Tebak Gambar!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${totalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Tebak Gambar telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    if (user.tebakgambar_limit[difficulty] > 0) {
      user.tebakgambar_limit[difficulty]--;
    }
    
    delete db.game.tebakgambar[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
await Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      tebakgambar_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.tebakgambar_wrong) wrongUser.tebakgambar_wrong = 0;
  wrongUser.tebakgambar_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan jawaban itu!",
      "Coba tebak berdasarkan gambar!",
      "Masih ada waktu, coba lagi!"
    ];
    //m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}
if (db.game.tekateki?.[m.chat] && !isCmd) {
  const game = db.game.tekateki[m.chat];
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
        await Ditss.sendMessage(
  m.chat,
  {
    text: `⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*`,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    delete db.game.tekateki[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    await m.reply(`🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.jawaban}*`);
    delete db.game.tekateki[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      await Ditss.sendMessage(m.sender, {
        text: `💡 *HINT TEKA-TEKI*\n\nSoal: ${game.soal}\n\n_Hint ini rahasia ya! Jangan kasih tau yang lain_`
      });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    const difficulty = game.difficulty || 'medium';
    
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.tekateki_win) user.tekateki_win = 0;
    if (!user.tekateki_total) user.tekateki_total = 0;
    if (!user.tekateki_wrong) user.tekateki_wrong = 0;
    if (!user.tekateki_best_time) user.tekateki_best_time = Infinity;
    if (!user.tekateki_lastwin) user.tekateki_lastwin = 0;
    if (!user.tekateki_last_difficulty) user.tekateki_last_difficulty = '';
    if (!user.tekateki_top) user.tekateki_top = false;
    if (!user.tekateki_top_rank) user.tekateki_top_rank = 0;
    
    if (!user.tekateki_stats) {
      user.tekateki_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      };
    }
    
    ['easy', 'medium', 'hard'].forEach(diff => {
      if (!user.tekateki_stats[diff]) {
        user.tekateki_stats[diff] = { win: 0, total: 0, waktu: [] };
      }
      if (!user.tekateki_stats[diff].waktu) {
        user.tekateki_stats[diff].waktu = [];
      }
    });
    
    if (!user.tekateki_limit) {
      user.tekateki_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    user.tekateki_win++;
    user.tekateki_total++;
    user.tekateki_lastwin = Date.now();
    user.tekateki_last_difficulty = difficulty;
    
    const baseRewards = { 'easy': 200, 'medium': 300, 'hard': 500 };
    const waktuMaksimal = { 'easy': 90, 'medium': 60, 'hard': 30 };
    
    let waktuBonus = 0;
    if (detik <= waktuMaksimal[difficulty]) {
      waktuBonus = Math.round(baseRewards[difficulty] * 0.5);
    }
    
    const totalReward = baseRewards[difficulty] + waktuBonus;
    const rankBonus = Math.floor(Math.random() * 50) + 1;
    
    user.saldo += totalReward;
    user.rank += rankBonus;
    
    user.tekateki_stats[difficulty].win++;
    user.tekateki_stats[difficulty].total++;
    user.tekateki_stats[difficulty].waktu.push(detik);
    
    if (detik < user.tekateki_best_time) {
      user.tekateki_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.tekateki_ranking) {
      db.game.tekateki_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.tekateki_ranking.top1;
    
    const allUsers = [];
    let userTekaTeki = await getAllUsers(); 
    for (let jid in userTekaTeki) {
      const u = db.users[jid];
      if (u && u.tekateki_win > 0) {
        allUsers.push({
          jid,
          wins: u.tekateki_win || 0,
          lastWin: u.tekateki_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.tekateki_top = (index === 0);
        userData.tekateki_top_rank = index + 1;
      }
    });
    
    const userWins = user.tekateki_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    
    if (allUsers.length > 0) {
      db.game.tekateki_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.tekateki_ranking.top2 = allUsers[1].jid;
      } else {
        db.game.tekateki_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.tekateki_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
    
    const difficultyEmoji = { 'easy': '🟢', 'medium': '🟡', 'hard': '🔴' };
        await Ditss.sendMessage(
  m.chat,
  {
    text: `
${difficultyEmoji[difficulty]} *TEKA-TEKI - LEVEL ${difficulty.toUpperCase()} - BENAR!* 

❓ *Soal:* ${game.soal}
✅ *Jawaban:* ${game.jawaban}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah (${difficulty}):*
├ +${totalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.tekateki_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)   
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Teka-Teki!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${totalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Teka-Teki telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    if (user.tekateki_limit[difficulty] > 0) {
      user.tekateki_limit[difficulty]--;
    }
    
    delete db.game.tekateki[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
await Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      tekateki_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.tekateki_wrong) wrongUser.tekateki_wrong = 0;
  wrongUser.tekateki_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan jawaban itu!",
      "Coba pikirkan teka-teki dengan baik!",
      "Masih ada waktu, coba lagi!"
    ];
   // m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}
if (db.game.tebaktebakan?.[m.chat] && !isCmd) {
  const game = db.game.tebaktebakan[m.chat];
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
        await Ditss.sendMessage(
  m.chat,
  {
    text: `⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*`,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    delete db.game.tebaktebakan[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    await m.reply(`🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.jawaban}*`);
    delete db.game.tebaktebakan[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      await Ditss.sendMessage(m.sender, {
        text: `💡 *HINT TEBAK-TEBAKAN*\n\nSoal: ${game.soal}\n\n_Hint ini rahasia ya! Jangan kasih tau yang lain_`
      });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    const difficulty = game.difficulty || 'medium';
    
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.tebaktebakan_win) user.tebaktebakan_win = 0;
    if (!user.tebaktebakan_total) user.tebaktebakan_total = 0;
    if (!user.tebaktebakan_wrong) user.tebaktebakan_wrong = 0;
    if (!user.tebaktebakan_best_time) user.tebaktebakan_best_time = Infinity;
    if (!user.tebaktebakan_lastwin) user.tebaktebakan_lastwin = 0;
    if (!user.tebaktebakan_last_difficulty) user.tebaktebakan_last_difficulty = '';
    if (!user.tebaktebakan_top) user.tebaktebakan_top = false;
    if (!user.tebaktebakan_top_rank) user.tebaktebakan_top_rank = 0;
    
    if (!user.tebaktebakan_stats) {
      user.tebaktebakan_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      };
    }
    
    ['easy', 'medium', 'hard'].forEach(diff => {
      if (!user.tebaktebakan_stats[diff]) {
        user.tebaktebakan_stats[diff] = { win: 0, total: 0, waktu: [] };
      }
      if (!user.tebaktebakan_stats[diff].waktu) {
        user.tebaktebakan_stats[diff].waktu = [];
      }
    });
    
    if (!user.tebaktebakan_limit) {
      user.tebaktebakan_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    user.tebaktebakan_win++;
    user.tebaktebakan_total++;
    user.tebaktebakan_lastwin = Date.now();
    user.tebaktebakan_last_difficulty = difficulty;
    
    const baseRewards = { 'easy': 200, 'medium': 300, 'hard': 500 };
    const waktuMaksimal = { 'easy': 90, 'medium': 60, 'hard': 30 };
    
    let waktuBonus = 0;
    if (detik <= waktuMaksimal[difficulty]) {
      waktuBonus = Math.round(baseRewards[difficulty] * 0.5);
    }
    
    const totalReward = baseRewards[difficulty] + waktuBonus;
    const rankBonus = Math.floor(Math.random() * 50) + 1;
    
    user.saldo += totalReward;
    user.rank += rankBonus;
    
    user.tebaktebakan_stats[difficulty].win++;
    user.tebaktebakan_stats[difficulty].total++;
    user.tebaktebakan_stats[difficulty].waktu.push(detik);
    
    if (detik < user.tebaktebakan_best_time) {
      user.tebaktebakan_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.tebaktebakan_ranking) {
      db.game.tebaktebakan_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.tebaktebakan_ranking.top1;
    
    const allUsers = [];
    let userTebakTebakan = await getAllUsers();
    for (let jid in userTebakTebakan) {
      const u = db.users[jid];
      if (u && u.tebaktebakan_win > 0) {
        allUsers.push({
          jid,
          wins: u.tebaktebakan_win || 0,
          lastWin: u.tebaktebakan_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.tebaktebakan_top = (index === 0);
        userData.tebaktebakan_top_rank = index + 1;
      }
    });
    
    const userWins = user.tebaktebakan_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    
    if (allUsers.length > 0) {
      db.game.tebaktebakan_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.tebaktebakan_ranking.top2 = allUsers[1].jid;
      } else {
        db.game.tebaktebakan_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.tebaktebakan_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
    
    const difficultyEmoji = { 'easy': '🟢', 'medium': '🟡', 'hard': '🔴' };
        await Ditss.sendMessage(
  m.chat,
  {
    text: `
${difficultyEmoji[difficulty]} *TEBAK-TEBAKAN - LEVEL ${difficulty.toUpperCase()} - BENAR!* 

❓ *Soal:* ${game.soal}
✅ *Jawaban:* ${game.jawaban}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah (${difficulty}):*
├ +${totalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.tebaktebakan_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Tebak-Tebakan!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${totalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Tebak-Tebakan telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    if (user.tebaktebakan_limit[difficulty] > 0) {
      user.tebaktebakan_limit[difficulty]--;
    }
    
    delete db.game.tebaktebakan[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
await Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      tebaktebakan_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.tebaktebakan_wrong) wrongUser.tebaktebakan_wrong = 0;
  wrongUser.tebaktebakan_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan jawaban itu!",
      "Coba tebak tebakan dengan kreatif!",
      "Masih ada waktu, coba lagi!"
    ];
    //m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}
if (db.game.tebakbendera?.[m.chat] && !isCmd) {
  const game = db.game.tebakbendera[m.chat];
  const jawaban = game.name.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
    await m.reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${game.name}* (${game.flag})`);
    delete db.game.tebakbendera[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    await m.reply(`🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.name}* (${game.flag})`);
    delete db.game.tebakbendera[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      await Ditss.sendMessage(m.sender, {
        text: `💡 *HINT TEBAK BENDERA*\n\nKode: ${game.flag}\n\n_Hint ini rahasia ya! Jangan kasih tau yang lain_`
      });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    const difficulty = game.difficulty || 'medium';
    
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.tebakbendera_win) user.tebakbendera_win = 0;
    if (!user.tebakbendera_total) user.tebakbendera_total = 0;
    if (!user.tebakbendera_wrong) user.tebakbendera_wrong = 0;
    if (!user.tebakbendera_best_time) user.tebakbendera_best_time = Infinity;
    if (!user.tebakbendera_lastwin) user.tebakbendera_lastwin = 0;
    if (!user.tebakbendera_last_difficulty) user.tebakbendera_last_difficulty = '';
    if (!user.tebakbendera_top) user.tebakbendera_top = false;
    if (!user.tebakbendera_top_rank) user.tebakbendera_top_rank = 0;
    
    if (!user.tebakbendera_stats) {
      user.tebakbendera_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      };
    }
    
    ['easy', 'medium', 'hard'].forEach(diff => {
      if (!user.tebakbendera_stats[diff]) {
        user.tebakbendera_stats[diff] = { win: 0, total: 0, waktu: [] };
      }
      if (!user.tebakbendera_stats[diff].waktu) {
        user.tebakbendera_stats[diff].waktu = [];
      }
    });
    
    if (!user.tebakbendera_limit) {
      user.tebakbendera_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    user.tebakbendera_win++;
    user.tebakbendera_total++;
    user.tebakbendera_lastwin = Date.now();
    user.tebakbendera_last_difficulty = difficulty;
    
    const baseRewards = { 'easy': 200, 'medium': 300, 'hard': 500 };
    const waktuMaksimal = { 'easy': 90, 'medium': 60, 'hard': 30 };
    
    let waktuBonus = 0;
    if (detik <= waktuMaksimal[difficulty]) {
      waktuBonus = Math.round(baseRewards[difficulty] * 0.5);
    }
    
    const totalReward = baseRewards[difficulty] + waktuBonus;
    const rankBonus = Math.floor(Math.random() * 50) + 1;
    
    user.saldo += totalReward;
    user.rank += rankBonus;
    
    user.tebakbendera_stats[difficulty].win++;
    user.tebakbendera_stats[difficulty].total++;
    user.tebakbendera_stats[difficulty].waktu.push(detik);
    
    if (detik < user.tebakbendera_best_time) {
      user.tebakbendera_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.tebakbendera_ranking) {
      db.game.tebakbendera_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.tebakbendera_ranking.top1;
    
    const allUsers = [];
    let userTebakBendera = await getAllUsers();
    for (let jid in userTebakBendera) {
      const u = db.users[jid];
      if (u && u.tebakbendera_win > 0) {
        allUsers.push({
          jid,
          wins: u.tebakbendera_win || 0,
          lastWin: u.tebakbendera_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.tebakbendera_top = (index === 0);
        userData.tebakbendera_top_rank = index + 1;
      }
    });
    
    const userWins = user.tebakbendera_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    
    if (allUsers.length > 0) {
      db.game.tebakbendera_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.tebakbendera_ranking.top2 = allUsers[1].jid;
      } else {
        db.game.tebakbendera_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.tebakbendera_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
    
    const difficultyEmoji = { 'easy': '🟢', 'medium': '🟡', 'hard': '🔴' };
        await Ditss.sendMessage(
  m.chat,
  {
    text: `
${difficultyEmoji[difficulty]} *TEBAK BENDERA - LEVEL ${difficulty.toUpperCase()} - BENAR!* 

🇳🇴 *Negara:* ${game.name}
🏳️ *Kode:* ${game.flag}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah (${difficulty}):*
├ +${totalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.tebakbendera_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Tebak Bendera!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${totalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Tebak Bendera telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    if (user.tebakbendera_limit[difficulty] > 0) {
      user.tebakbendera_limit[difficulty]--;
    }
    
    delete db.game.tebakbendera[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
await Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      tebakbendera_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.tebakbendera_wrong) wrongUser.tebakbendera_wrong = 0;
  wrongUser.tebakbendera_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan negara itu!",
      "Coba tebak negara berdasarkan bendera!",
      "Masih ada waktu, coba lagi!"
    ];
    //m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}
// ===================== [CAK LONTONG] HANDLER =====================
if (db.game.caklontong?.[m.chat] && !isCmd) {
  const game = db.game.caklontong[m.chat];
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
    let replyText = `⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*`;
    if (game.deskripsi) replyText += `\nPenjelasan: ${game.deskripsi}`;
    await m.reply(replyText);
    delete db.game.caklontong[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    let replyText = `🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.jawaban}*`;
    if (game.deskripsi) replyText += `\nPenjelasan: ${game.deskripsi}`;
    await m.reply(replyText);
    delete db.game.caklontong[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      let hintText = `💡 *HINT CAK LONTONG*\n\nSoal: ${game.soal}\n\n`;
      if (game.deskripsi) hintText += `Penjelasan: ${game.deskripsi}\n\n`;
      hintText += `_Hint ini rahasia ya! Jangan kasih tau yang lain_`;
      
      await Ditss.sendMessage(m.sender, { text: hintText });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    const difficulty = game.difficulty || 'medium';
    
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.caklontong_win) user.caklontong_win = 0;
    if (!user.caklontong_total) user.caklontong_total = 0;
    if (!user.caklontong_wrong) user.caklontong_wrong = 0;
    if (!user.caklontong_best_time) user.caklontong_best_time = Infinity;
    if (!user.caklontong_lastwin) user.caklontong_lastwin = 0;
    if (!user.caklontong_last_difficulty) user.caklontong_last_difficulty = '';
    if (!user.caklontong_top) user.caklontong_top = false;
    if (!user.caklontong_top_rank) user.caklontong_top_rank = 0;
    
    if (!user.caklontong_stats) {
      user.caklontong_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      };
    }
    
    ['easy', 'medium', 'hard'].forEach(diff => {
      if (!user.caklontong_stats[diff]) {
        user.caklontong_stats[diff] = { win: 0, total: 0, waktu: [] };
      }
      if (!user.caklontong_stats[diff].waktu) {
        user.caklontong_stats[diff].waktu = [];
      }
    });
    
    if (!user.caklontong_limit) {
      user.caklontong_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    user.caklontong_win++;
    user.caklontong_total++;
    user.caklontong_lastwin = Date.now();
    user.caklontong_last_difficulty = difficulty;
    
    const baseRewards = { 'easy': 200, 'medium': 300, 'hard': 500 };
    const waktuMaksimal = { 'easy': 90, 'medium': 60, 'hard': 30 };
    
    let waktuBonus = 0;
    if (detik <= waktuMaksimal[difficulty]) {
      waktuBonus = Math.round(baseRewards[difficulty] * 0.5);
    }
    
    const totalReward = baseRewards[difficulty] + waktuBonus;
    const rankBonus = Math.floor(Math.random() * 50) + 1;
    
    user.saldo += totalReward;
    user.rank += rankBonus;
    
    user.caklontong_stats[difficulty].win++;
    user.caklontong_stats[difficulty].total++;
    user.caklontong_stats[difficulty].waktu.push(detik);
    
    if (detik < user.caklontong_best_time) {
      user.caklontong_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.caklontong_ranking) {
      db.game.caklontong_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.caklontong_ranking.top1;
    
    const allUsers = [];
    let userCakLontong = await getAllUsers();
    for (let jid in userCakLontong) {
      const u = db.users[jid];
      if (u && u.caklontong_win > 0) {
        allUsers.push({
          jid,
          wins: u.caklontong_win || 0,
          lastWin: u.caklontong_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.caklontong_top = (index === 0);
        userData.caklontong_top_rank = index + 1;
      }
    });
    
    const userWins = user.caklontong_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    
    if (allUsers.length > 0) {
      db.game.caklontong_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.caklontong_ranking.top2 = allUsers[1].jid;
      } else {
        db.game.caklontong_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.caklontong_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
    
    const difficultyEmoji = { 'easy': '🟢', 'medium': '🟡', 'hard': '🔴' };
    
    let replyText = `
${difficultyEmoji[difficulty]} *CAK LONTONG - LEVEL ${difficulty.toUpperCase()} - BENAR!* 

📝 *Soal:* ${game.soal}
✅ *Jawaban:* ${game.jawaban}
${game.deskripsi ? `💡 *Penjelasan:* ${game.deskripsi}\n` : ''}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah (${difficulty}):*
├ +${totalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.caklontong_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `;
        await Ditss.sendMessage(
  m.chat,
  {
    text: replyText,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Cak Lontong!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${totalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Cak Lontong telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    if (user.caklontong_limit[difficulty] > 0) {
      user.caklontong_limit[difficulty]--;
    }
    
    delete db.game.caklontong[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
await Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      caklontong_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.caklontong_wrong) wrongUser.caklontong_wrong = 0;
  wrongUser.caklontong_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan jawaban itu!",
      "Coba pikirkan jawaban Cak Lontong dengan kreatif!",
      "Masih ada waktu, coba lagi!"
    ];
    //m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}
// ===================== [ASAH OTAK] HANDLER =====================
if (db.game.asahotak?.[m.chat] && !isCmd) {
  const game = db.game.asahotak[m.chat];
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
        await Ditss.sendMessage(
  m.chat,
  {
    text: `⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*`,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    delete db.game.asahotak[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    await m.reply(`🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.jawaban}*`);
    delete db.game.asahotak[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      await Ditss.sendMessage(m.sender, {
        text: `💡 *HINT ASAH OTAK*\n\nSoal: ${game.soal}\n\n_Hint ini rahasia ya! Jangan kasih tau yang lain_`
      });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    const difficulty = game.difficulty || 'medium';
    
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.asahotak_win) user.asahotak_win = 0;
    if (!user.asahotak_total) user.asahotak_total = 0;
    if (!user.asahotak_wrong) user.asahotak_wrong = 0;
    if (!user.asahotak_best_time) user.asahotak_best_time = Infinity;
    if (!user.asahotak_lastwin) user.asahotak_lastwin = 0;
    if (!user.asahotak_last_difficulty) user.asahotak_last_difficulty = '';
    if (!user.asahotak_top) user.asahotak_top = false;
    if (!user.asahotak_top_rank) user.asahotak_top_rank = 0;
    
    if (!user.asahotak_stats) {
      user.asahotak_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      };
    }
    
    ['easy', 'medium', 'hard'].forEach(diff => {
      if (!user.asahotak_stats[diff]) {
        user.asahotak_stats[diff] = { win: 0, total: 0, waktu: [] };
      }
      if (!user.asahotak_stats[diff].waktu) {
        user.asahotak_stats[diff].waktu = [];
      }
    });
    
    if (!user.asahotak_limit) {
      user.asahotak_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    user.asahotak_win++;
    user.asahotak_total++;
    user.asahotak_lastwin = Date.now();
    user.asahotak_last_difficulty = difficulty;
    
    const baseRewards = { 'easy': 200, 'medium': 300, 'hard': 500 };
    const waktuMaksimal = { 'easy': 90, 'medium': 60, 'hard': 30 };
    
    let waktuBonus = 0;
    if (detik <= waktuMaksimal[difficulty]) {
      waktuBonus = Math.round(baseRewards[difficulty] * 0.5);
    }
    
    const totalReward = baseRewards[difficulty] + waktuBonus;
    const rankBonus = Math.floor(Math.random() * 50) + 1;
    
    user.saldo += totalReward;
    user.rank += rankBonus;
    
    user.asahotak_stats[difficulty].win++;
    user.asahotak_stats[difficulty].total++;
    user.asahotak_stats[difficulty].waktu.push(detik);
    
    if (detik < user.asahotak_best_time) {
      user.asahotak_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.asahotak_ranking) {
      db.game.asahotak_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.asahotak_ranking.top1;
    
    const allUsers = [];
    let userAsahOtak = await getAllUsers();
    for (let jid in userAsahOtak) {
      const u = db.users[jid];
      if (u && u.asahotak_win > 0) {
        allUsers.push({
          jid,
          wins: u.asahotak_win || 0,
          lastWin: u.asahotak_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.asahotak_top = (index === 0);
        userData.asahotak_top_rank = index + 1;
      }
    });
    
    const userWins = user.asahotak_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    
    if (allUsers.length > 0) {
      db.game.asahotak_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.asahotak_ranking.top2 = allUsers[1].jid;
      } else {
        db.game.asahotak_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.asahotak_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
    
    const difficultyEmoji = { 'easy': '🟢', 'medium': '🟡', 'hard': '🔴' };
        await Ditss.sendMessage(
  m.chat,
  {
    text: `
${difficultyEmoji[difficulty]} *ASAH OTAK - LEVEL ${difficulty.toUpperCase()} - BENAR!* 

🧠 *Soal:* ${game.soal}
✅ *Jawaban:* ${game.jawaban}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah (${difficulty}):*
├ +${totalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.asahotak_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Asah Otak!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${totalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Asah Otak telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    if (user.asahotak_limit[difficulty] > 0) {
      user.asahotak_limit[difficulty]--;
    }
    
    delete db.game.asahotak[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
await Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      asahotak_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.asahotak_wrong) wrongUser.asahotak_wrong = 0;
  wrongUser.asahotak_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan jawaban itu!",
      "Coba asah otakmu dengan lebih dalam!",
      "Masih ada waktu, coba lagi!"
    ];
   // m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}
if (db.game.tebakjkt48?.[m.chat] && !isCmd) {
  const game = db.game.tebakjkt48[m.chat];
  const jawaban = game.jawaban.toLowerCase().replace(/\s+/g, ' ').trim();
  const userJawab = m.text.toLowerCase().trim().replace(/\s+/g, ' ').trim();
  
  const waktuJawab = Date.now() - game.startTime;
  const detik = Math.floor(waktuJawab / 1000);
  
  if (Date.now() > game.timeout) {
              await Ditss.sendMessage(
  m.chat,
  {
    text: `⏰ *WAKTU HABIS!*\n\nJawaban: *${game.jawaban}*`,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    delete db.game.tebakjkt48[m.chat];
    return;
  }
  
  if (['nyerah', 'skip', 'menyerah', 'gak tau', 'gatau', 'pasrah', 'stop', 'quit'].includes(userJawab)) {
    await m.reply(`🏳️ *KAMU MENYERAH!*\n\nJawaban: *${game.jawaban}*`);
    delete db.game.tebakjkt48[m.chat];
    return;
  }
  
  if (['bantuan', 'petunjuk', 'help', 'hint', 'clue'].includes(userJawab)) {
    try {
      await Ditss.sendMessage(m.sender, {
        text: `💡 *HINT TEBAK JKT48*\n\nNama member terdiri dari: ${game.jawaban.split(' ').length} kata\n\n_Hint ini rahasia ya! Jangan kasih tau yang lain_`
      });
      await m.reply(`📩 *Hint sudah dikirim ke chat pribadimu!*\nCek DM dari bot ya!`);
    } catch (err) {
      await m.reply(`❌ *Gagal mengirim hint ke DM*\n\nPastikan kamu sudah memulai chat dengan bot!`);
    }
    return;
  }
  
  if (userJawab === jawaban) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    
    const user = db.users[m.sender];
    const difficulty = game.difficulty || 'medium';
    
    if (!user.name) user.name = m.pushName || 'Unknown';
    if (!user.saldo) user.saldo = 0;
    if (!user.rank) user.rank = 0;
    if (!user.tebakjkt48_win) user.tebakjkt48_win = 0;
    if (!user.tebakjkt48_total) user.tebakjkt48_total = 0;
    if (!user.tebakjkt48_wrong) user.tebakjkt48_wrong = 0;
    if (!user.tebakjkt48_best_time) user.tebakjkt48_best_time = Infinity;
    if (!user.tebakjkt48_lastwin) user.tebakjkt48_lastwin = 0;
    if (!user.tebakjkt48_last_difficulty) user.tebakjkt48_last_difficulty = '';
    if (!user.tebakjkt48_top) user.tebakjkt48_top = false;
    if (!user.tebakjkt48_top_rank) user.tebakjkt48_top_rank = 0;
    
    if (!user.tebakjkt48_stats) {
      user.tebakjkt48_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      };
    }
    
    ['easy', 'medium', 'hard'].forEach(diff => {
      if (!user.tebakjkt48_stats[diff]) {
        user.tebakjkt48_stats[diff] = { win: 0, total: 0, waktu: [] };
      }
      if (!user.tebakjkt48_stats[diff].waktu) {
        user.tebakjkt48_stats[diff].waktu = [];
      }
    });
    
    if (!user.tebakjkt48_limit) {
      user.tebakjkt48_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    user.tebakjkt48_win++;
    user.tebakjkt48_total++;
    user.tebakjkt48_lastwin = Date.now();
    user.tebakjkt48_last_difficulty = difficulty;
    
    const baseRewards = { 'easy': 200, 'medium': 300, 'hard': 500 };
    const waktuMaksimal = { 'easy': 90, 'medium': 60, 'hard': 30 };
    
    let waktuBonus = 0;
    if (detik <= waktuMaksimal[difficulty]) {
      waktuBonus = Math.round(baseRewards[difficulty] * 0.5);
    }
    
    const totalReward = baseRewards[difficulty] + waktuBonus;
    const rankBonus = Math.floor(Math.random() * 50) + 1;
    
    user.saldo += totalReward;
    user.rank += rankBonus;
    
    user.tebakjkt48_stats[difficulty].win++;
    user.tebakjkt48_stats[difficulty].total++;
    user.tebakjkt48_stats[difficulty].waktu.push(detik);
    
    if (detik < user.tebakjkt48_best_time) {
      user.tebakjkt48_best_time = detik;
    }
    
    const displayName = user.name !== 'Unknown' ? user.name : m.sender.split('@')[0];
    
    if (!db.game.top_notif) db.game.top_notif = {};
    if (!db.game.tebakjkt48_ranking) {
      db.game.tebakjkt48_ranking = { top1: null, top2: null };
    }
    
    const oldTop1 = db.game.tebakjkt48_ranking.top1;
    
    const allUsers = [];
    let userTebakJkt = await getAllUsers();
    for (let jid in userTebakJkt) {
      const u = db.users[jid];
      if (u && u.tebakjkt48_win > 0) {
        allUsers.push({
          jid,
          wins: u.tebakjkt48_win || 0,
          lastWin: u.tebakjkt48_lastwin || 0,
          name: u.name && u.name !== 'Unknown' ? u.name : jid.split('@')[0]
        });
      }
    }
    
    allUsers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.lastWin - a.lastWin;
    });
    
    allUsers.forEach((u, index) => {
      const userData = db.users[u.jid];
      if (userData) {
        userData.tebakjkt48_top = (index === 0);
        userData.tebakjkt48_top_rank = index + 1;
      }
    });
    
    const userWins = user.tebakjkt48_win;
    const currentRank = allUsers.findIndex(u => u.jid === m.sender) + 1;
    const isTop1Now = currentRank === 1;
    
    let isNewTop1 = false;
    
    if (allUsers.length > 0) {
      db.game.tebakjkt48_ranking.top1 = allUsers[0].jid;
      if (allUsers.length > 1) {
        db.game.tebakjkt48_ranking.top2 = allUsers[1].jid;
      } else {
        db.game.tebakjkt48_ranking.top2 = null;
      }
    }
    
    if (isTop1Now && oldTop1 !== m.sender) {
      isNewTop1 = true;
    }
    
    const top5 = allUsers.slice(0, 5).map((u, i) => {
      const userData = db.users[u.jid];
      const total = userData?.tebakjkt48_total || 1;
      const winRate = Math.round((u.wins / total) * 100);
      const medal = i === 0 ? '👑' : ['🥇','🥈','🥉','4️⃣','5️⃣'][i];
      return `${medal} ${u.name}\n   ├ ${u.wins} wins\n   └ ${winRate}% WR`;
    }).join('\n\n');
    
    const difficultyEmoji = { 'easy': '🟢', 'medium': '🟡', 'hard': '🔴' };
            await Ditss.sendMessage(
  m.chat,
  {
    text: `
${difficultyEmoji[difficulty]} *TEBAK JKT48 - LEVEL ${difficulty.toUpperCase()} - BENAR!* 

🎤 *Member:* ${game.jawaban}
⏱️ *Waktu:* ${detik} detik${waktuBonus > 0 ? ` (+${waktuBonus} bonus)` : ''}
🏅 *Peringkat:* #${currentRank}

💰 *Hadiah (${difficulty}):*
├ +${totalReward} saldo
└ +${rankBonus} rank

📊 *Statistik:*
├ Menang: ${userWins} kali
├ Total: ${user.tebakjkt48_total} game
└ Saldo: ${user.saldo}

🏆 *Top 5 Leaderboard:*
${top5 || 'Belum ada data...'}

${isNewTop1 ? '🎖️ *KAMU TOP 1 SEKARANG!*\n' : ''}
    `,
    footer: "Powered By Asuma",
    headerType: 1,
    buttons: [
    {
      buttonId: `.${randomGame.cmd}`,
        buttonText: { displayText: randomGame.name },
          type: 1
          }
    ]
  },
  { quoted: m }
)
    if (isNewTop1) {
      const now = Date.now();
      const lastNotif = db.game.top_notif[m.sender] || 0;
      const cooldown = 6 * 60 * 60 * 1000;
      
      if (now - lastNotif > cooldown) {
        try {
          await Ditss.sendMessage(m.sender, {
            text: `🏆 *SELAMAT!*\n\nKamu sekarang menjadi TOP 1 di game Tebak JKT48!\n\n🏅 Peringkat: #1\n✅ Kemenangan: ${userWins}\n💰 Reward: +${totalReward} saldo\n⏱️ Waktu: ${detik} detik\n\nPertahankan posisimu!`
          });
          db.game.top_notif[m.sender] = now;
        } catch (err) {}
      }
    }
    
    if (oldTop1 && oldTop1 !== m.sender && isTop1Now) {
      try {
        const lastWarned = db.game.top_notif[oldTop1] || 0;
        if (Date.now() - lastWarned > 3600000) {
          await Ditss.sendMessage(oldTop1, {
            text: `⚠️ *PERINGATAN!*\n\nPosisi TOP 1 kamu di game Tebak JKT48 telah disusul oleh *${displayName}*!\n\n🏅 Peringkat kamu sekarang: #2\n\nMain lagi untuk merebut kembali posisimu! 💪`
          });
          db.game.top_notif[oldTop1] = Date.now();
        }
      } catch (err) {}
    }
    
    if (user.tebakjkt48_limit[difficulty] > 0) {
      user.tebakjkt48_limit[difficulty]--;
    }
    
    delete db.game.tebakjkt48[m.chat];
    return;
  }
  
  if (similarity(userJawab, jawaban) >= 0.85) {
    await m.reply(`🎯 *Hampir tepat!* (${Math.round(similarity(userJawab, jawaban) * 100)}% mirip)\nCoba lagi!`);
    return;
  }
  
  Ditss.sendMessage(m.chat, {
    react: { text: "❌", key: m.key }
  }).catch(() => {});
  
  if (!db.users[m.sender]) {
    db.users[m.sender] = {
      name: m.pushName || 'Unknown',
      tebakjkt48_wrong: 0
    };
  }
  
  const wrongUser = db.users[m.sender];
  if (!wrongUser.tebakjkt48_wrong) wrongUser.tebakjkt48_wrong = 0;
  wrongUser.tebakjkt48_wrong++;
  
  setTimeout(() => {
    const pesanSalah = [
      "Salah! Coba lagi!",
      "Bukan member itu!",
      "Coba tebak member JKT48 dengan lebih teliti!",
      "Masih ada waktu, coba lagi!"
    ];
    m.reply(pesanSalah[Math.floor(Math.random() * pesanSalah.length)]);
  }, 500);
}










































































        
  // === [FAMILY 100]  ===
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

// ================= LOAD PLUGIN =================
const readPlugins = async (dir) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(async (file) => {
        const fullPath = join(dir, file.name);

        // 📁 kalau folder → masuk lagi
        if (file.isDirectory()) {
            readPlugins(fullPath);
            return;
        }

        // 📄 kalau bukan js skip
        if (!file.name.endsWith('.js')) return;

        try {
            const plg = (await import(
                pathToFileURL(fullPath).href
            )).default;

            if (plg?.command?.length) {
                plg.filePath = fullPath;
                plg.command.forEach(cmd => global.plugins[cmd] = plg);
                // console.log(`✅ Plugin loaded: ${fullPath}`);
            }
        } catch (err) {
            console.error(`❌ Gagal load plugin ${fullPath}:`, err);
        }
    });
};

await readPlugins(pluginPath);

// ================= HOT RELOAD =================
fs.watch(pluginPath, { recursive: true }, async (eventType, filename) => {
    if (!filename || !filename.endsWith('.js')) return;

    const fullPath = join(pluginPath, filename);

    // hapus plugin lama
    Object.keys(global.plugins).forEach(cmd => {
        if (global.plugins[cmd]?.filePath === fullPath) {
            delete global.plugins[cmd];
        }
    });

    try {
        if (!fs.existsSync(fullPath)) {
            console.log(`🗑️ Plugin deleted: ${filename}`);
            return;
        }

        const plg = (await import(
            pathToFileURL(fullPath).href + '?update=' + Date.now()
        )).default;

        if (plg?.command?.length) {
            plg.filePath = fullPath;
            plg.command.forEach(cmd => global.plugins[cmd] = plg);
            console.log(`🔄 Plugin updated: ${filename}`);
        }
    } catch (err) {
        console.error(`❌ Error reload plugin ${filename}:`, err);
    }
});


        
        switch (command) {
                case 'resetgame': {
  if (!m.isOwner) return m.reply('❌ Khusus owner')

  const users = await getAllUsers()
  let totalReset = 0

  for (const jid in users) {
    const user = db.users[jid]
    if (!user) continue

    let hasGameData = false

    // === TEBAK KATA ===
    if (
      user.tebakkata_win !== undefined ||
      user.tebakkata_total !== undefined ||
      user.tebakkata_stats
    ) {
      user.tebakkata_win = 0
      user.tebakkata_total = 0
      user.tebakkata_wrong = 0
      user.tebakkata_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      }
      user.tebakkata_lastwin = 0
      user.tebakkata_last_difficulty = null
      user.tebakkata_best_time = 0
      user.tebakkata_limit = { easy: 10, medium: 5, hard: 3 }
      hasGameData = true
    }

    // === SUSUN KATA ===
    if (
      user.susunkata_win !== undefined ||
      user.susunkata_total !== undefined ||
      user.susunkata_stats
    ) {
      user.susunkata_win = 0
      user.susunkata_total = 0
      user.susunkata_wrong = 0
      user.susunkata_stats = {
        easy: { win: 0, total: 0, waktu: [] },
        medium: { win: 0, total: 0, waktu: [] },
        hard: { win: 0, total: 0, waktu: [] }
      }
      user.susunkata_lastwin = 0
      user.susunkata_last_difficulty = null
      user.susunkata_best_time = 0
      user.susunkata_limit = { easy: 10, medium: 5, hard: 3 }
      hasGameData = true
    }

    // === SIAPAKAH AKU ===
    if (
      user.siapakahaku_win !== undefined ||
      user.siapakahaku_total !== undefined ||
      user.siapakahaku_stats
    ) {
      user.siapakahaku_win = 0
      user.siapakahaku_total = 0
      user.siapakahaku_stats = {}
      hasGameData = true
    }

    if (hasGameData) totalReset++
  }

  m.reply(`♻️ *RESET GAME GLOBAL BERHASIL!*

👥 User terdampak: *${totalReset}*
🧹 Hanya user yang pernah main game yang direset
💾 User pasif tidak disentuh

⚠️ Aman untuk database besar`)
}
break
                
                // group 
            case 'h':
            case 'ht':
            case 'hidetag': 
            case 'tagal':
            case 'tagall': 
            case 'totag': {
                if (!m.isGroup) return reply(ress.ingroup)

    let groupMetadata = await Ditss.groupMetadata(m.chat)
    let participants = groupMetadata.participants || []
    let mentionList = participants.map(p => p.id)
    let isAdmin = participants.some(p => p.admin && p.id === m.sender)
    if (!m.isAdmin && !m.isCreator) return reply(ress.admin)
    if (m.quoted && m.quoted.mtype && m.quoted.fakeObj) {
        await Ditss.sendMessage(m.chat, {
            forward: m.quoted.fakeObj,
            mentions: mentionList
        }, { quoted: m })
    } else if (m.quoted && m.quoted.text) {
        await Ditss.sendMessage(m.chat, {
            text: m.quoted.text,
            mentions: mentionList
        }, { quoted: m })
    } else if (text) {
        await Ditss.sendMessage(m.chat, {
            text: text,
            mentions: mentionList
        }, { quoted: m })
    } else {
        await Ditss.sendMessage(m.chat, {
            text: `@${m.sender.split('@')[0]} telah melakukan hidetag grup.`,
            mentions: [m.sender, ...mentionList]
        }, { quoted: m })
    }

    break
}
                
            case "editimg": {
    if (!q) return m.reply("Masukkan prompt!\nContoh: *.editimg Using the model, create a 1/7 scale commercialized figurine based on the character(s) shown in the image, rendered in a realistic style within a real-life environment. The figurine is displayed on a computer desk and stands on a round, fully transparent acrylic base with no text or markings. On the computer monitor, show the 3D modeling process of this figurine, including visible modeling tools, wireframes, and interface elements. Next to the monitor, place a BANDAI-style toy packaging box printed with the original character artwork. The packaging should feature high-quality, two-dimensional flat illustrations in authentic commercial packaging style.*");
    try {
        let usedPrompt = q.trim();

        let targetMsg = m.quoted ? m.quoted : m;
        let mime = (targetMsg.msg || targetMsg).mimetype || "";
        if (!mime || !/image\/(webp|jpeg|png)/.test(mime))
            return reply("Kirim atau reply gambar dengan caption:\n*.editimg (prompt)*");
        await reply("⏳ Sedang memproses gambar…");
        let media = await targetMsg.download();
        let uploaded = await UguuSe(media);
        let imgURL = uploaded.url;
        let { data } = await axios.get("https://api.asuma.my.id/v1/ai/imgeditor", {
            params: {
                url: imgURL,
                prompt: usedPrompt,
                apikey: `demo`
            }
        });

        if (!data.status || !data.url)
            return reply("❌ API Error: gagal menghasilkan gambar");
        await Ditss.sendMessage(m.chat, {
            image: { url: data.url },
            caption: `✨ *Edit Berhasil!*`
        }, { quoted: m });

    } catch (e) {
        console.log(e);
        reply("❌ Terjadi kesalahan!");
    }
}
break;                
                
                case 'ping':
case 'speed':
case 'speed-bot': {
    const execAsync = promisify(exec);
    
    try {
        const startTime = Date.now();
       // const sentMsg = await message.reply('📊 Fetching real-time server stats...');
        
        const latency = Date.now() - startTime;
        
        const formatBytes = (bytes) => {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };
        
        const getCPUPercentage = async () => {
            try {
                const { stdout } = await execAsync("top -bn1 | grep 'Cpu(s)' | awk '{print $2 + $4}'");
                const cpu = parseFloat(stdout.trim()).toFixed(2);
                return Math.min(100, cpu);
            } catch {
                const cpus = os.cpus();
                let totalIdle = 0;
                let totalTick = 0;
                
                cpus.forEach(cpu => {
                    for (let type in cpu.times) {
                        totalTick += cpu.times[type];
                    }
                    totalIdle += cpu.times.idle;
                });
                
                const idlePercent = (totalIdle / totalTick) * 100;
                return (100 - idlePercent).toFixed(2);
            }
        };
        
        const getDiskUsage = async () => {
            try {
                const { stdout } = await execAsync("df -h / | awk 'NR==2{print $3\" / \"$2\" (\"$5\")\"}'");
                return stdout.trim();
            } catch {
                try {
                    const stats = await fs.statfs('/');
                    const total = stats.blocks * stats.bsize;
                    const free = stats.bfree * stats.bsize;
                    const used = total - free;
                    const percent = ((used / total) * 100).toFixed(1);
                    return `${formatBytes(used)} / ${formatBytes(total)} (${percent}%)`;
                } catch {
                    return "∞ / ∞";
                }
            }
        };
        
        const getUptime = () => {
            const uptime = os.uptime();
            const days = Math.floor(uptime / 86400);
            const hours = Math.floor((uptime % 86400) / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);
            
            if (days > 0) return `${days}d ${hours}h ${minutes}m`;
            if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
            return `${minutes}m ${seconds}s`;
        };
        
        const getNetworkStats = async () => {
            try {
                const { stdout } = await execAsync("cat /proc/net/dev 2>/dev/null | grep -E '(eth0|wlan0|enp|wlp)' | head -1");
                if (stdout) {
                    const parts = stdout.trim().split(/\s+/);
                    const rxBytes = parseInt(parts[1]) || 0;
                    const txBytes = parseInt(parts[9]) || 0;
                    return {
                        rx: formatBytes(rxBytes),
                        tx: formatBytes(txBytes)
                    };
                }
            } catch {}
            
            return { rx: "0.00 B", tx: "0.00 B" };
        };
        
        const cpuLoad = await getCPUPercentage();
        const diskUsage = await getDiskUsage();
        const uptime = getUptime();
        const network = await getNetworkStats();
        
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const memPercent = ((usedMem / totalMem) * 100).toFixed(2);
        
        const createBar = (percent, length = 10) => {
            const filled = Math.min(length, Math.round(percent / 100 * length));
            return '█'.repeat(filled) + '░'.repeat(length - filled);
        };
        
        const cpuBar = createBar(cpuLoad);
        const memBar = createBar(memPercent);
        
        const cpus = os.cpus();
        const cpuModel = cpus[0]?.model.split('@')[0]?.substring(0, 30) + '...' || 'Unknown';
        const cpuCores = cpus.length;
        const cpuSpeed = (cpus[0]?.speed || 0) + ' MHz';
        
        const loadAvg = os.loadavg()[0].toFixed(2);
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        const dateString = now.toLocaleDateString('id-ID');
        //let hwmnelan = `${FileSize(process.memoryUsage().rss)} / ${process.env.SERVER_MEMORY ?? 0} MB`
        const response = `
🖥️ *REAL-TIME SERVER PANEL* 🖥️

📊 *PERFORMANCE STATUS*
┌─ Latency: ${latensi.toFixed(4)} ms
├─ Uptime: ${uptime}
└─ Last Update: ${timeString}

💾 *MEMORY USAGE*
${memBar} ${memPercent}%
${FileSize(process.memoryUsage().rss)} / ${process.env.SERVER_MEMORY ?? 0} MB

⚡ *CPU LOAD*
${cpuBar} ${cpuLoad}%
Load Average: ${loadAvg}
Cores: ${cpuCores} @ ${cpuSpeed}
Model: ${cpuModel}

💿 *DISK USAGE*
${diskUsage}

🌐 *NETWORK TRAFFIC*
┌─ Inbound: ${network.rx}
└─ Outbound: ${network.tx}

📈 *SYSTEM INFO*
┌─ OS: ${os.type()} ${os.release()}
├─ Arch: ${os.arch()}
├─ Platform: ${os.platform()}
├─ Host: ${os.hostname()}
├─ Node: ${process.version}
└─ Date: ${dateString}

✅ *BOT STATUS: ACTIVE & RESPONSIVE*
        `.trim();
        
        await editp("pong 🐧", response)
    } catch (error) {
        console.error('Real-time Ping Error:', error);
        await message.reply('❌ Failed to fetch real-time server data');
    }
    break;
}
                
                
      case 'tourl': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";

    if (!mime) return m.reply("Reply foto/video/dokumen yang mau dijadiin URLnya..");

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
                url: "https://asuma.my.id"
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
                document: fs.readFileSync('./database/session'),
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
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                



case 'tebakjkt48':
case 'tjkt48': {
  const subCmd = args[0]?.toLowerCase();
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersTebakJKT48 = [];
    let usersTebakJKT48Lb = await getAllUsers();
    
    for (let jid in usersTebakJKT48Lb) {
      const userData = db.users[jid];
      if (userData && userData.tebakjkt48_win > 0) {
        const winRate = userData.tebakjkt48_total > 0 ? 
          Math.round((userData.tebakjkt48_win / userData.tebakjkt48_total) * 100) : 0;
        
        allUsersTebakJKT48.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.tebakjkt48_win || 0,
          total: userData.tebakjkt48_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.tebakjkt48_top || false
        });
      }
    }
    
    allUsersTebakJKT48.sort((a, b) => b.wins - a.wins);
    
    if (allUsersTebakJKT48.length === 0) {
      return m.reply('🏆 *Leaderboard Tebak JKT48*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮');
    }
    
    const top = allUsersTebakJKT48.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`;
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`;
    }).join('\n\n');
    
    const totalWins = allUsersTebakJKT48.reduce((sum, u) => sum + u.wins, 0);
    const totalGames = allUsersTebakJKT48.reduce((sum, u) => sum + u.total, 0);
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    return m.reply(`🏆 *LEADERBOARD TEBAK JKT48*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .tebakjkt48 stats untuk statistikmu_`);
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {};
    const win = user.tebakjkt48_win || 0;
    const total = user.tebakjkt48_total || 0;
    const wrong = user.tebakjkt48_wrong || 0;
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0;
    
    const allUsersTebakJKT48 = [];
    let usersTebakJKT48 = await getAllUsers();
    
    for (let jid in usersTebakJKT48) {
      const u = db.users[jid];
      if (u && u.tebakjkt48_win > 0) {
        allUsersTebakJKT48.push({
          jid,
          wins: u.tebakjkt48_win || 0
        });
      }
    }
    
    allUsersTebakJKT48.sort((a, b) => b.wins - a.wins);
    const position = allUsersTebakJKT48.findIndex(u => u.jid === m.sender) + 1;
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0];
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`;
    statsText += `🎮 Game: Tebak JKT48\n`;
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`;
    statsText += `✅ Menang: ${win} kali\n`;
    statsText += `❌ Kalah: ${wrong} kali\n`;
    statsText += `🎮 Total Game: ${total} kali\n`;
    statsText += `📈 Win Rate: ${winRate}%\n`;
    statsText += `💰 Saldo: ${user.saldo || 0}\n`;
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`;
    
    if (user.tebakjkt48_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`;
    }
    
    if (user.tebakjkt48_stats) {
      statsText += `🎚️ *STATS PER LEVEL:*\n`;
      Object.entries(user.tebakjkt48_stats).forEach(([diff, stats]) => {
        if (stats.total > 0) {
          const diffWinRate = Math.round((stats.win / stats.total) * 100);
          const avgTime = stats.waktu && stats.waktu.length > 0 ? 
            Math.round(stats.waktu.reduce((a, b) => a + b, 0) / stats.waktu.length) : 0;
          const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
          statsText += `${emoji} ${diff.toUpperCase()}: ${stats.win}/${stats.total} (${diffWinRate}%)`;
          if (avgTime > 0) statsText += ` ⏱️${avgTime}s\n`;
          else statsText += '\n';
        }
      });
    }
    
    if (user.tebakjkt48_best_time && user.tebakjkt48_best_time < Infinity) {
      statsText += `\n⚡ *Best Time:* ${user.tebakjkt48_best_time} detik\n`;
    }
    
    if (user.tebakjkt48_limit) {
      statsText += `\n🎮 *Limit Harian Tersisa:*\n`;
      statsText += `🟢 Easy: ${user.tebakjkt48_limit.easy || 0}/10\n`;
      statsText += `🟡 Medium: ${user.tebakjkt48_limit.medium || 0}/5\n`;
      statsText += `🔴 Hard: ${user.tebakjkt48_limit.hard || 0}/3\n`;
    }
    
    if (user.tebakjkt48_lastwin) {
      const lastWin = new Date(user.tebakjkt48_lastwin);
      const diff = user.tebakjkt48_last_difficulty || 'medium';
      const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')} (${emoji} ${diff.toUpperCase()})`;
    }
    
    return m.reply(statsText);
  }
  
  let selectedDifficulty = 'random';
  if (['easy', 'medium', 'hard'].includes(subCmd)) {
    selectedDifficulty = subCmd;
    
    if (!db.users[m.sender]) {
      db.users[m.sender] = {
        tebakjkt48_limit: {
          easy: 10,
          medium: 5,
          hard: 3
        }
      };
    }
    
    const user = db.users[m.sender];
    if (!user.tebakjkt48_limit) {
      user.tebakjkt48_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    const remaining = user.tebakjkt48_limit[selectedDifficulty] || 0;
    if (remaining <= 0 && !isPremium && !isCreator) {
      return m.reply(`🎮 *Limit ${selectedDifficulty.toUpperCase()} Habis!*\n\nKamu sudah main level ${selectedDifficulty} terlalu banyak hari ini.\n\nCoba level lain atau tunggu besok!`);
    }
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000);
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Tebak JKT48.`);
  }
  
  if (!db.game.tebakjkt48) db.game.tebakjkt48 = {};
  if (db.game.tebakjkt48[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.');
  }
  
  if (!isCreator && !isPremium) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    if (!db.users[m.sender].glimit) db.users[m.sender].glimit = 0;
    if (db.users[m.sender].glimit < 1) {
      return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
    }
    db.users[m.sender].glimit--;
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/tebakjkt48?apikey=demo');
    
    if (!res.status || !res.result?.gambar || !res.result?.jawaban) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.');
    }
    
    const imgUrl = res.result.gambar.trim();
    const jawaban = res.result.jawaban.trim().toLowerCase();
    
    let finalDifficulty = selectedDifficulty;
    if (finalDifficulty === 'random') {
      const difficulties = ['easy', 'medium', 'hard'];
      finalDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    
    const difficultySettings = {
      'easy': {
        time: 90000,
        reward: 200,
        emoji: '🟢',
        desc: '1 menit 30 detik'
      },
      'medium': {
        time: 60000,
        reward: 300,
        emoji: '🟡',
        desc: '1 menit'
      },
      'hard': {
        time: 30000,
        reward: 500,
        emoji: '🔴',
        desc: '30 detik'
      }
    };
    
    const settings = difficultySettings[finalDifficulty];
    
    const teks = `
${settings.emoji} *TEBAK JKT48 - LEVEL ${finalDifficulty.toUpperCase()}*

🎤 *Tebak member JKT48 berdasarkan foto!*

⏱️ *Waktu:* ${settings.desc}
💰 *Hadiah:* ${settings.reward} saldo
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Tebak nama member JKT48 berdasarkan foto di atas!_
    `;
    
    const sent = await Ditss.sendMessage(m.chat, { 
      image: { url: imgUrl },
      caption: teks
    }, { quoted: m });
    
    db.game.tebakjkt48[m.chat] = {
      id: 'tebakjkt48',
      msgId: sent.key.id,
      img: imgUrl,
      jawaban: jawaban,
      difficulty: finalDifficulty,
      hadiah: settings.reward,
      time: settings.time,
      timeout: Date.now() + settings.time,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    };
    console.log(jawaban)
    
    setTimeout(async () => {
      if (db.game.tebakjkt48?.[m.chat]) {
        await Ditss.sendMessage(m.chat, {
          text: `⏰ *WAKTU HABIS!*\n\nLevel: ${db.game.tebakjkt48[m.chat].difficulty.toUpperCase()}\nJawaban: *${db.game.tebakjkt48[m.chat].jawaban}*\n\nKetik .tebakjkt48 untuk main lagi!`
        });
        delete db.game.tebakjkt48[m.chat];
      }
    }, settings.time);
    
    if (!db.game.cooldown) db.game.cooldown = {};
    const cooldownTime = {
      'easy': 15000,
      'medium': 30000,
      'hard': 45000
    };
    
    db.game.cooldown[m.sender] = Date.now() + (cooldownTime[finalDifficulty] || 30000);
    
  } catch (error) {
    console.error('[TEBAK JKT48] API Error:', error);
    m.reply('❌ Gagal terhubung ke server game.');
  }
  
  break;
}
case 'asahotak':
case 'aotak': {
  const subCmd = args[0]?.toLowerCase();
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersAsahOtak = [];
    let usersAsahOtakLb = await getAllUsers();
    
    for (let jid in usersAsahOtakLb) {
      const userData = db.users[jid];
      if (userData && userData.asahotak_win > 0) {
        const winRate = userData.asahotak_total > 0 ? 
          Math.round((userData.asahotak_win / userData.asahotak_total) * 100) : 0;
        
        allUsersAsahOtak.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.asahotak_win || 0,
          total: userData.asahotak_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.asahotak_top || false
        });
      }
    }
    
    allUsersAsahOtak.sort((a, b) => b.wins - a.wins);
    
    if (allUsersAsahOtak.length === 0) {
      return m.reply('🏆 *Leaderboard Asah Otak*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮');
    }
    
    const top = allUsersAsahOtak.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`;
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`;
    }).join('\n\n');
    
    const totalWins = allUsersAsahOtak.reduce((sum, u) => sum + u.wins, 0);
    const totalGames = allUsersAsahOtak.reduce((sum, u) => sum + u.total, 0);
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    return m.reply(`🏆 *LEADERBOARD ASAH OTAK*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .asahotak stats untuk statistikmu_`);
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {};
    const win = user.asahotak_win || 0;
    const total = user.asahotak_total || 0;
    const wrong = user.asahotak_wrong || 0;
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0;
    
    const allUsersAsahOtak = [];
    let usersAsahOtak = await getAllUsers();
    
    for (let jid in usersAsahOtak) {
      const u = db.users[jid];
      if (u && u.asahotak_win > 0) {
        allUsersAsahOtak.push({
          jid,
          wins: u.asahotak_win || 0
        });
      }
    }
    
    allUsersAsahOtak.sort((a, b) => b.wins - a.wins);
    const position = allUsersAsahOtak.findIndex(u => u.jid === m.sender) + 1;
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0];
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`;
    statsText += `🎮 Game: Asah Otak\n`;
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`;
    statsText += `✅ Menang: ${win} kali\n`;
    statsText += `❌ Kalah: ${wrong} kali\n`;
    statsText += `🎮 Total Game: ${total} kali\n`;
    statsText += `📈 Win Rate: ${winRate}%\n`;
    statsText += `💰 Saldo: ${user.saldo || 0}\n`;
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`;
    
    if (user.asahotak_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`;
    }
    
    if (user.asahotak_stats) {
      statsText += `🎚️ *STATS PER LEVEL:*\n`;
      Object.entries(user.asahotak_stats).forEach(([diff, stats]) => {
        if (stats.total > 0) {
          const diffWinRate = Math.round((stats.win / stats.total) * 100);
          const avgTime = stats.waktu && stats.waktu.length > 0 ? 
            Math.round(stats.waktu.reduce((a, b) => a + b, 0) / stats.waktu.length) : 0;
          const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
          statsText += `${emoji} ${diff.toUpperCase()}: ${stats.win}/${stats.total} (${diffWinRate}%)`;
          if (avgTime > 0) statsText += ` ⏱️${avgTime}s\n`;
          else statsText += '\n';
        }
      });
    }
    
    if (user.asahotak_best_time && user.asahotak_best_time < Infinity) {
      statsText += `\n⚡ *Best Time:* ${user.asahotak_best_time} detik\n`;
    }
    
    if (user.asahotak_limit) {
      statsText += `\n🎮 *Limit Harian Tersisa:*\n`;
      statsText += `🟢 Easy: ${user.asahotak_limit.easy || 0}/10\n`;
      statsText += `🟡 Medium: ${user.asahotak_limit.medium || 0}/5\n`;
      statsText += `🔴 Hard: ${user.asahotak_limit.hard || 0}/3\n`;
    }
    
    if (user.asahotak_lastwin) {
      const lastWin = new Date(user.asahotak_lastwin);
      const diff = user.asahotak_last_difficulty || 'medium';
      const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')} (${emoji} ${diff.toUpperCase()})`;
    }
    
    return m.reply(statsText);
  }
  
  let selectedDifficulty = 'random';
  if (['easy', 'medium', 'hard'].includes(subCmd)) {
    selectedDifficulty = subCmd;
    
    if (!db.users[m.sender]) {
      db.users[m.sender] = {
        asahotak_limit: {
          easy: 10,
          medium: 5,
          hard: 3
        }
      };
    }
    
    const user = db.users[m.sender];
    if (!user.asahotak_limit) {
      user.asahotak_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    const remaining = user.asahotak_limit[selectedDifficulty] || 0;
    if (remaining <= 0 && !isPremium && !isCreator) {
      return m.reply(`🎮 *Limit ${selectedDifficulty.toUpperCase()} Habis!*\n\nKamu sudah main level ${selectedDifficulty} terlalu banyak hari ini.\n\nCoba level lain atau tunggu besok!`);
    }
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000);
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Asah Otak.`);
  }
  
  if (!db.game.asahotak) db.game.asahotak = {};
  if (db.game.asahotak[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.');
  }
  
  if (!isCreator && !isPremium) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    if (!db.users[m.sender].glimit) db.users[m.sender].glimit = 0;
    if (db.users[m.sender].glimit < 1) {
      return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
    }
    db.users[m.sender].glimit--;
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/asahotak?apikey=demo');
    
    if (!res.status || !res.result?.soal || !res.result?.jawaban) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.');
    }
    
    const soal = res.result.soal.trim();
    const jawaban = res.result.jawaban.trim().toLowerCase();
    
    let finalDifficulty = selectedDifficulty;
    if (finalDifficulty === 'random') {
      const difficulties = ['easy', 'medium', 'hard'];
      finalDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    
    const difficultySettings = {
      'easy': {
        time: 90000,
        reward: 200,
        emoji: '🟢',
        desc: '1 menit 30 detik'
      },
      'medium': {
        time: 60000,
        reward: 300,
        emoji: '🟡',
        desc: '1 menit'
      },
      'hard': {
        time: 30000,
        reward: 500,
        emoji: '🔴',
        desc: '30 detik'
      }
    };
    
    const settings = difficultySettings[finalDifficulty];
    
    const teks = `
${settings.emoji} *ASAH OTAK - LEVEL ${finalDifficulty.toUpperCase()}*

🧠 *Soal:* ${soal}

⏱️ *Waktu:* ${settings.desc}
💰 *Hadiah:* ${settings.reward} saldo
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Jawab pertanyaan untuk mengasah otakmu!_
    `;
    
    const sent = await Ditss.sendMessage(m.chat, { text: teks }, { quoted: m });
    db.game.asahotak[m.chat] = {
      id: 'asahotak',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban,
      difficulty: finalDifficulty,
      hadiah: settings.reward,
      time: settings.time,
      timeout: Date.now() + settings.time,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    };
    console.log(jawaban)
    
    setTimeout(async () => {
      if (db.game.asahotak?.[m.chat] && Date.now() > db.game.asahotak[m.chat].timeout) {
        await Ditss.sendMessage(m.chat, {
          text: `⏰ *WAKTU HABIS!*\n\nLevel: ${db.game.asahotak[m.chat].difficulty.toUpperCase()}\nJawaban: *${db.game.asahotak[m.chat].jawaban}*\n\nKetik .asahotak untuk main lagi!`
        });
        delete db.game.asahotak[m.chat];
      }
    }, settings.time);
    
    if (!db.game.cooldown) db.game.cooldown = {};
    const cooldownTime = {
      'easy': 15000,
      'medium': 30000,
      'hard': 45000
    };
    
    db.game.cooldown[m.sender] = Date.now() + (cooldownTime[finalDifficulty] || 30000);
    
  } catch (error) {
    console.error('[ASAH OTAK] API Error:', error);
    m.reply('❌ Gagal terhubung ke server game.');
  }
  
  break;
}
case 'caklontong':
case 'clontong': {
  const subCmd = args[0]?.toLowerCase();
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersCakLontong = [];
    let usersCakLontongLb = await getAllUsers();
    
    for (let jid in usersCakLontongLb) {
      const userData = db.users[jid];
      if (userData && userData.caklontong_win > 0) {
        const winRate = userData.caklontong_total > 0 ? 
          Math.round((userData.caklontong_win / userData.caklontong_total) * 100) : 0;
        
        allUsersCakLontong.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.caklontong_win || 0,
          total: userData.caklontong_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.caklontong_top || false
        });
      }
    }
    
    allUsersCakLontong.sort((a, b) => b.wins - a.wins);
    
    if (allUsersCakLontong.length === 0) {
      return m.reply('🏆 *Leaderboard Cak Lontong*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮');
    }
    
    const top = allUsersCakLontong.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`;
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`;
    }).join('\n\n');
    
    const totalWins = allUsersCakLontong.reduce((sum, u) => sum + u.wins, 0);
    const totalGames = allUsersCakLontong.reduce((sum, u) => sum + u.total, 0);
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    return m.reply(`🏆 *LEADERBOARD CAK LONTONG*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .caklontong stats untuk statistikmu_`);
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {};
    const win = user.caklontong_win || 0;
    const total = user.caklontong_total || 0;
    const wrong = user.caklontong_wrong || 0;
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0;
    
    const allUsersCakLontong = [];
    let usersCakLontong = await getAllUsers();
    
    for (let jid in usersCakLontong) {
      const u = db.users[jid];
      if (u && u.caklontong_win > 0) {
        allUsersCakLontong.push({
          jid,
          wins: u.caklontong_win || 0
        });
      }
    }
    
    allUsersCakLontong.sort((a, b) => b.wins - a.wins);
    const position = allUsersCakLontong.findIndex(u => u.jid === m.sender) + 1;
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0];
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`;
    statsText += `🎮 Game: Cak Lontong\n`;
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`;
    statsText += `✅ Menang: ${win} kali\n`;
    statsText += `❌ Kalah: ${wrong} kali\n`;
    statsText += `🎮 Total Game: ${total} kali\n`;
    statsText += `📈 Win Rate: ${winRate}%\n`;
    statsText += `💰 Saldo: ${user.saldo || 0}\n`;
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`;
    
    if (user.caklontong_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`;
    }
    
    if (user.caklontong_stats) {
      statsText += `🎚️ *STATS PER LEVEL:*\n`;
      Object.entries(user.caklontong_stats).forEach(([diff, stats]) => {
        if (stats.total > 0) {
          const diffWinRate = Math.round((stats.win / stats.total) * 100);
          const avgTime = stats.waktu && stats.waktu.length > 0 ? 
            Math.round(stats.waktu.reduce((a, b) => a + b, 0) / stats.waktu.length) : 0;
          const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
          statsText += `${emoji} ${diff.toUpperCase()}: ${stats.win}/${stats.total} (${diffWinRate}%)`;
          if (avgTime > 0) statsText += ` ⏱️${avgTime}s\n`;
          else statsText += '\n';
        }
      });
    }
    
    if (user.caklontong_best_time && user.caklontong_best_time < Infinity) {
      statsText += `\n⚡ *Best Time:* ${user.caklontong_best_time} detik\n`;
    }
    
    if (user.caklontong_limit) {
      statsText += `\n🎮 *Limit Harian Tersisa:*\n`;
      statsText += `🟢 Easy: ${user.caklontong_limit.easy || 0}/10\n`;
      statsText += `🟡 Medium: ${user.caklontong_limit.medium || 0}/5\n`;
      statsText += `🔴 Hard: ${user.caklontong_limit.hard || 0}/3\n`;
    }
    
    if (user.caklontong_lastwin) {
      const lastWin = new Date(user.caklontong_lastwin);
      const diff = user.caklontong_last_difficulty || 'medium';
      const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')} (${emoji} ${diff.toUpperCase()})`;
    }
    
    return m.reply(statsText);
  }
  
  let selectedDifficulty = 'random';
  if (['easy', 'medium', 'hard'].includes(subCmd)) {
    selectedDifficulty = subCmd;
    
    if (!db.users[m.sender]) {
      db.users[m.sender] = {
        caklontong_limit: {
          easy: 10,
          medium: 5,
          hard: 3
        }
      };
    }
    
    const user = db.users[m.sender];
    if (!user.caklontong_limit) {
      user.caklontong_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    const remaining = user.caklontong_limit[selectedDifficulty] || 0;
    if (remaining <= 0 && !isPremium && !isCreator) {
      return m.reply(`🎮 *Limit ${selectedDifficulty.toUpperCase()} Habis!*\n\nKamu sudah main level ${selectedDifficulty} terlalu banyak hari ini.\n\nCoba level lain atau tunggu besok!`);
    }
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000);
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Cak Lontong.`);
  }
  
  if (!db.game.caklontong) db.game.caklontong = {};
  if (db.game.caklontong[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.');
  }
  
  if (!isCreator && !isPremium) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    if (!db.users[m.sender].glimit) db.users[m.sender].glimit = 0;
    if (db.users[m.sender].glimit < 1) {
      return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
    }
    db.users[m.sender].glimit--;
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/caklontong?apikey=demo');
    
    if (!res.status || !res.result?.soal || !res.result?.jawaban) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.');
    }
    
    const soal = res.result.soal.trim();
    const jawaban = res.result.jawaban.trim().toLowerCase();
    const deskripsi = res.result.deskripsi || '';
    
    let finalDifficulty = selectedDifficulty;
    if (finalDifficulty === 'random') {
      const difficulties = ['easy', 'medium', 'hard'];
      finalDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    
    const difficultySettings = {
      'easy': {
        time: 90000,
        reward: 200,
        emoji: '🟢',
        desc: '1 menit 30 detik'
      },
      'medium': {
        time: 60000,
        reward: 300,
        emoji: '🟡',
        desc: '1 menit'
      },
      'hard': {
        time: 30000,
        reward: 500,
        emoji: '🔴',
        desc: '30 detik'
      }
    };
    
    const settings = difficultySettings[finalDifficulty];
    
    const teks = `
${settings.emoji} *CAK LONTONG - LEVEL ${finalDifficulty.toUpperCase()}*

📝 *Soal:* ${soal}

⏱️ *Waktu:* ${settings.desc}
💰 *Hadiah:* ${settings.reward} saldo
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Jawab teka-teki Cak Lontong di atas!_
    `;
    
    const sent = await Ditss.sendMessage(m.chat, { text: teks }, { quoted: m });
    db.game.caklontong[m.chat] = {
      id: 'caklontong',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban,
      deskripsi: deskripsi,
      difficulty: finalDifficulty,
      hadiah: settings.reward,
      time: settings.time,
      timeout: Date.now() + settings.time,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    };
    console.log(jawaban)
    setTimeout(async () => {
      if (db.game.caklontong?.[m.chat] && Date.now() > db.game.caklontong[m.chat].timeout) {
        let timeoutText = `⏰ *WAKTU HABIS!*\n\nLevel: ${db.game.caklontong[m.chat].difficulty.toUpperCase()}\nJawaban: *${db.game.caklontong[m.chat].jawaban}*`;
        if (db.game.caklontong[m.chat].deskripsi) {
          timeoutText += `\nPenjelasan: ${db.game.caklontong[m.chat].deskripsi}`;
        }
        timeoutText += `\n\nKetik .caklontong untuk main lagi!`;
        
        await Ditss.sendMessage(m.chat, { text: timeoutText });
        delete db.game.caklontong[m.chat];
      }
    }, settings.time);
    
    if (!db.game.cooldown) db.game.cooldown = {};
    const cooldownTime = {
      'easy': 15000,
      'medium': 30000,
      'hard': 45000
    };
    
    db.game.cooldown[m.sender] = Date.now() + (cooldownTime[finalDifficulty] || 30000);
    
  } catch (error) {
    console.error('[CAK LONTONG] API Error:', error);
    m.reply('❌ Gagal terhubung ke server game.');
  }
  
  break;
}
case 'tebakbendera':
case 'tbendera': {
  const subCmd = args[0]?.toLowerCase();
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersTebakBendera = [];
    let usersTebakBenderaLb = await getAllUsers();
    
    for (let jid in usersTebakBenderaLb) {
      const userData = db.users[jid];
      if (userData && userData.tebakbendera_win > 0) {
        const winRate = userData.tebakbendera_total > 0 ? 
          Math.round((userData.tebakbendera_win / userData.tebakbendera_total) * 100) : 0;
        
        allUsersTebakBendera.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.tebakbendera_win || 0,
          total: userData.tebakbendera_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.tebakbendera_top || false
        });
      }
    }
    
    allUsersTebakBendera.sort((a, b) => b.wins - a.wins);
    
    if (allUsersTebakBendera.length === 0) {
      return m.reply('🏆 *Leaderboard Tebak Bendera*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮');
    }
    
    const top = allUsersTebakBendera.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`;
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`;
    }).join('\n\n');
    
    const totalWins = allUsersTebakBendera.reduce((sum, u) => sum + u.wins, 0);
    const totalGames = allUsersTebakBendera.reduce((sum, u) => sum + u.total, 0);
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    return m.reply(`🏆 *LEADERBOARD TEBAK BENDERA*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .tebakbendera stats untuk statistikmu_`);
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {};
    const win = user.tebakbendera_win || 0;
    const total = user.tebakbendera_total || 0;
    const wrong = user.tebakbendera_wrong || 0;
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0;
    
    const allUsersTebakBendera = [];
    let usersTebakBendera = await getAllUsers();
    
    for (let jid in usersTebakBendera) {
      const u = db.users[jid];
      if (u && u.tebakbendera_win > 0) {
        allUsersTebakBendera.push({
          jid,
          wins: u.tebakbendera_win || 0
        });
      }
    }
    
    allUsersTebakBendera.sort((a, b) => b.wins - a.wins);
    const position = allUsersTebakBendera.findIndex(u => u.jid === m.sender) + 1;
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0];
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`;
    statsText += `🎮 Game: Tebak Bendera\n`;
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`;
    statsText += `✅ Menang: ${win} kali\n`;
    statsText += `❌ Kalah: ${wrong} kali\n`;
    statsText += `🎮 Total Game: ${total} kali\n`;
    statsText += `📈 Win Rate: ${winRate}%\n`;
    statsText += `💰 Saldo: ${user.saldo || 0}\n`;
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`;
    
    if (user.tebakbendera_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`;
    }
    
    if (user.tebakbendera_stats) {
      statsText += `🎚️ *STATS PER LEVEL:*\n`;
      Object.entries(user.tebakbendera_stats).forEach(([diff, stats]) => {
        if (stats.total > 0) {
          const diffWinRate = Math.round((stats.win / stats.total) * 100);
          const avgTime = stats.waktu && stats.waktu.length > 0 ? 
            Math.round(stats.waktu.reduce((a, b) => a + b, 0) / stats.waktu.length) : 0;
          const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
          statsText += `${emoji} ${diff.toUpperCase()}: ${stats.win}/${stats.total} (${diffWinRate}%)`;
          if (avgTime > 0) statsText += ` ⏱️${avgTime}s\n`;
          else statsText += '\n';
        }
      });
    }
    
    if (user.tebakbendera_best_time && user.tebakbendera_best_time < Infinity) {
      statsText += `\n⚡ *Best Time:* ${user.tebakbendera_best_time} detik\n`;
    }
    
    if (user.tebakbendera_limit) {
      statsText += `\n🎮 *Limit Harian Tersisa:*\n`;
      statsText += `🟢 Easy: ${user.tebakbendera_limit.easy || 0}/10\n`;
      statsText += `🟡 Medium: ${user.tebakbendera_limit.medium || 0}/5\n`;
      statsText += `🔴 Hard: ${user.tebakbendera_limit.hard || 0}/3\n`;
    }
    
    if (user.tebakbendera_lastwin) {
      const lastWin = new Date(user.tebakbendera_lastwin);
      const diff = user.tebakbendera_last_difficulty || 'medium';
      const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')} (${emoji} ${diff.toUpperCase()})`;
    }
    
    return m.reply(statsText);
  }
  
  let selectedDifficulty = 'random';
  if (['easy', 'medium', 'hard'].includes(subCmd)) {
    selectedDifficulty = subCmd;
    
    if (!db.users[m.sender]) {
      db.users[m.sender] = {
        tebakbendera_limit: {
          easy: 10,
          medium: 5,
          hard: 3
        }
      };
    }
    
    const user = db.users[m.sender];
    if (!user.tebakbendera_limit) {
      user.tebakbendera_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    const remaining = user.tebakbendera_limit[selectedDifficulty] || 0;
    if (remaining <= 0 && !isPremium && !isCreator) {
      return m.reply(`🎮 *Limit ${selectedDifficulty.toUpperCase()} Habis!*\n\nKamu sudah main level ${selectedDifficulty} terlalu banyak hari ini.\n\nCoba level lain atau tunggu besok!`);
    }
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000);
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Tebak Bendera.`);
  }
  
  if (!db.game.tebakbendera) db.game.tebakbendera = {};
  if (db.game.tebakbendera[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.');
  }
  
  if (!isCreator && !isPremium) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    if (!db.users[m.sender].glimit) db.users[m.sender].glimit = 0;
    if (db.users[m.sender].glimit < 1) {
      return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
    }
    db.users[m.sender].glimit--;
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/tebakbendera?apikey=demo');
    
    if (!res.status || !res.result?.img || !res.result?.name) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.');
    }
    
    const imgUrl = res.result.img.trim();
    const flagCode = res.result.flag || '';
    const countryName = res.result.name.trim().toLowerCase();
    
    let finalDifficulty = selectedDifficulty;
    if (finalDifficulty === 'random') {
      const difficulties = ['easy', 'medium', 'hard'];
      finalDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    
    const difficultySettings = {
      'easy': {
        time: 90000,
        reward: 200,
        emoji: '🟢',
        desc: '1 menit 30 detik'
      },
      'medium': {
        time: 60000,
        reward: 300,
        emoji: '🟡',
        desc: '1 menit'
      },
      'hard': {
        time: 30000,
        reward: 500,
        emoji: '🔴',
        desc: '30 detik'
      }
    };
    
    const settings = difficultySettings[finalDifficulty];
    
    const teks = `
${settings.emoji} *TEBAK BENDERA - LEVEL ${finalDifficulty.toUpperCase()}*

${flagCode ? `🏳️ *Kode Bendera:* ${flagCode}\n` : ''}
⏱️ *Waktu:* ${settings.desc}
💰 *Hadiah:* ${settings.reward} saldo
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Tebak nama negara berdasarkan bendera di atas!_
    `;
    
    const sent = await Ditss.sendMessage(m.chat, { 
      image: { url: imgUrl },
      caption: teks
    }, { quoted: m });
    
    db.game.tebakbendera[m.chat] = {
      id: 'tebakbendera',
      msgId: sent.key.id,
      img: imgUrl,
      flag: flagCode,
      name: countryName,
      difficulty: finalDifficulty,
      hadiah: settings.reward,
      time: settings.time,
      timeout: Date.now() + settings.time,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    };
    // console.log(jawaban)
    setTimeout(async () => {
      if (db.game.tebakbendera?.[m.chat]) {
        await Ditss.sendMessage(m.chat, {
          text: `⏰ *WAKTU HABIS!*\n\nLevel: ${db.game.tebakbendera[m.chat].difficulty.toUpperCase()}\nJawaban: *${db.game.tebakbendera[m.chat].name.toUpperCase()}* (${db.game.tebakbendera[m.chat].flag})\n\nKetik .tebakbendera untuk main lagi!`
        });
        delete db.game.tebakbendera[m.chat];
      }
    }, settings.time);
    
    if (!db.game.cooldown) db.game.cooldown = {};
    const cooldownTime = {
      'easy': 15000,
      'medium': 30000,
      'hard': 45000
    };
    
    db.game.cooldown[m.sender] = Date.now() + (cooldownTime[finalDifficulty] || 30000);
    
  } catch (error) {
    console.error('[TEBAK BENDERA] API Error:', error);
    m.reply('❌ Gagal terhubung ke server game.');
  }
  
  break;
}
case 'tebaktebakan':
case 'ttebakan': {
  const subCmd = args[0]?.toLowerCase();
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersTebakTebakan = [];
    let usersTebakTebakanLb = await getAllUsers();
    
    for (let jid in usersTebakTebakanLb) {
      const userData = db.users[jid];
      if (userData && userData.tebaktebakan_win > 0) {
        const winRate = userData.tebaktebakan_total > 0 ? 
          Math.round((userData.tebaktebakan_win / userData.tebaktebakan_total) * 100) : 0;
        
        allUsersTebakTebakan.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.tebaktebakan_win || 0,
          total: userData.tebaktebakan_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.tebaktebakan_top || false
        });
      }
    }
    
    allUsersTebakTebakan.sort((a, b) => b.wins - a.wins);
    
    if (allUsersTebakTebakan.length === 0) {
      return m.reply('🏆 *Leaderboard Tebak-Tebakan*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮');
    }
    
    const top = allUsersTebakTebakan.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`;
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`;
    }).join('\n\n');
    
    const totalWins = allUsersTebakTebakan.reduce((sum, u) => sum + u.wins, 0);
    const totalGames = allUsersTebakTebakan.reduce((sum, u) => sum + u.total, 0);
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    return m.reply(`🏆 *LEADERBOARD TEBAK-TEBAKAN*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .tebaktebakan stats untuk statistikmu_`);
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {};
    const win = user.tebaktebakan_win || 0;
    const total = user.tebaktebakan_total || 0;
    const wrong = user.tebaktebakan_wrong || 0;
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0;
    
    const allUsersTebakTebakan = [];
    let usersTebakTebakan = await getAllUsers();
    
    for (let jid in usersTebakTebakan) {
      const u = db.users[jid];
      if (u && u.tebaktebakan_win > 0) {
        allUsersTebakTebakan.push({
          jid,
          wins: u.tebaktebakan_win || 0
        });
      }
    }
    
    allUsersTebakTebakan.sort((a, b) => b.wins - a.wins);
    const position = allUsersTebakTebakan.findIndex(u => u.jid === m.sender) + 1;
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0];
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`;
    statsText += `🎮 Game: Tebak-Tebakan\n`;
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`;
    statsText += `✅ Menang: ${win} kali\n`;
    statsText += `❌ Kalah: ${wrong} kali\n`;
    statsText += `🎮 Total Game: ${total} kali\n`;
    statsText += `📈 Win Rate: ${winRate}%\n`;
    statsText += `💰 Saldo: ${user.saldo || 0}\n`;
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`;
    
    if (user.tebaktebakan_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`;
    }
    
    if (user.tebaktebakan_stats) {
      statsText += `🎚️ *STATS PER LEVEL:*\n`;
      Object.entries(user.tebaktebakan_stats).forEach(([diff, stats]) => {
        if (stats.total > 0) {
          const diffWinRate = Math.round((stats.win / stats.total) * 100);
          const avgTime = stats.waktu && stats.waktu.length > 0 ? 
            Math.round(stats.waktu.reduce((a, b) => a + b, 0) / stats.waktu.length) : 0;
          const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
          statsText += `${emoji} ${diff.toUpperCase()}: ${stats.win}/${stats.total} (${diffWinRate}%)`;
          if (avgTime > 0) statsText += ` ⏱️${avgTime}s\n`;
          else statsText += '\n';
        }
      });
    }
    
    if (user.tebaktebakan_best_time && user.tebaktebakan_best_time < Infinity) {
      statsText += `\n⚡ *Best Time:* ${user.tebaktebakan_best_time} detik\n`;
    }
    
    if (user.tebaktebakan_limit) {
      statsText += `\n🎮 *Limit Harian Tersisa:*\n`;
      statsText += `🟢 Easy: ${user.tebaktebakan_limit.easy || 0}/10\n`;
      statsText += `🟡 Medium: ${user.tebaktebakan_limit.medium || 0}/5\n`;
      statsText += `🔴 Hard: ${user.tebaktebakan_limit.hard || 0}/3\n`;
    }
    
    if (user.tebaktebakan_lastwin) {
      const lastWin = new Date(user.tebaktebakan_lastwin);
      const diff = user.tebaktebakan_last_difficulty || 'medium';
      const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')} (${emoji} ${diff.toUpperCase()})`;
    }
    
    return m.reply(statsText);
  }
  
  let selectedDifficulty = 'random';
  if (['easy', 'medium', 'hard'].includes(subCmd)) {
    selectedDifficulty = subCmd;
    
    if (!db.users[m.sender]) {
      db.users[m.sender] = {
        tebaktebakan_limit: {
          easy: 10,
          medium: 5,
          hard: 3
        }
      };
    }
    
    const user = db.users[m.sender];
    if (!user.tebaktebakan_limit) {
      user.tebaktebakan_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    const remaining = user.tebaktebakan_limit[selectedDifficulty] || 0;
    if (remaining <= 0 && !isPremium && !isCreator) {
      return m.reply(`🎮 *Limit ${selectedDifficulty.toUpperCase()} Habis!*\n\nKamu sudah main level ${selectedDifficulty} terlalu banyak hari ini.\n\nCoba level lain atau tunggu besok!`);
    }
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000);
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Tebak-Tebakan.`);
  }
  
  if (!db.game.tebaktebakan) db.game.tebaktebakan = {};
  if (db.game.tebaktebakan[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.');
  }
  
  if (!isCreator && !isPremium) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    if (!db.users[m.sender].glimit) db.users[m.sender].glimit = 0;
    if (db.users[m.sender].glimit < 1) {
      return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
    }
    db.users[m.sender].glimit--;
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/tebaktebakan?apikey=demo');
    
    if (!res.status || !res.result?.soal || !res.result?.jawaban) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.');
    }
    
    const soal = res.result.soal.trim();
    const jawaban = res.result.jawaban.trim().toLowerCase();
    
    let finalDifficulty = selectedDifficulty;
    if (finalDifficulty === 'random') {
      const difficulties = ['easy', 'medium', 'hard'];
      finalDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    
    const difficultySettings = {
      'easy': {
        time: 90000,
        reward: 200,
        emoji: '🟢',
        desc: '1 menit 30 detik'
      },
      'medium': {
        time: 60000,
        reward: 300,
        emoji: '🟡',
        desc: '1 menit'
      },
      'hard': {
        time: 30000,
        reward: 500,
        emoji: '🔴',
        desc: '30 detik'
      }
    };
    
    const settings = difficultySettings[finalDifficulty];
    
    const teks = `
${settings.emoji} *TEBAK-TEBAKAN - LEVEL ${finalDifficulty.toUpperCase()}*

❓ *Soal:* ${soal}

⏱️ *Waktu:* ${settings.desc}
💰 *Hadiah:* ${settings.reward} saldo
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Jawab tebakan di atas!_
    `;
    
    const sent = await Ditss.sendMessage(m.chat, { text: teks }, { quoted: m });
    db.game.tebaktebakan[m.chat] = {
      id: 'tebaktebakan',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban,
      difficulty: finalDifficulty,
      hadiah: settings.reward,
      time: settings.time,
      timeout: Date.now() + settings.time,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    };
       console.log(jawaban)
    setTimeout(async () => {
      if (db.game.tebaktebakan?.[m.chat] && Date.now() > db.game.tebaktebakan[m.chat].timeout) {
        await Ditss.sendMessage(m.chat, {
          text: `⏰ *WAKTU HABIS!*\n\nLevel: ${db.game.tebaktebakan[m.chat].difficulty.toUpperCase()}\nJawaban: *${db.game.tebaktebakan[m.chat].jawaban}*\n\nKetik .tebaktebakan untuk main lagi!`
        });
        delete db.game.tebaktebakan[m.chat];
      }
    }, settings.time);
    
    if (!db.game.cooldown) db.game.cooldown = {};
    const cooldownTime = {
      'easy': 15000,
      'medium': 30000,
      'hard': 45000
    };
    
    db.game.cooldown[m.sender] = Date.now() + (cooldownTime[finalDifficulty] || 30000);
    
  } catch (error) {
    console.error('[TEBAK-TEBAKAN] API Error:', error);
    m.reply('❌ Gagal terhubung ke server game.');
  }
  
  break;
}
                case 'tebakgambar':
case 'tgambar': {
  const subCmd = args[0]?.toLowerCase();
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersTebakGambar = [];
    let usersTebakGambarLb = await getAllUsers();
    
    for (let jid in usersTebakGambarLb) {
      const userData = db.users[jid];
      if (userData && userData.tebakgambar_win > 0) {
        const winRate = userData.tebakgambar_total > 0 ? 
          Math.round((userData.tebakgambar_win / userData.tebakgambar_total) * 100) : 0;
        
        allUsersTebakGambar.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.tebakgambar_win || 0,
          total: userData.tebakgambar_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.tebakgambar_top || false
        });
      }
    }
    
    allUsersTebakGambar.sort((a, b) => b.wins - a.wins);
    
    if (allUsersTebakGambar.length === 0) {
      return m.reply('🏆 *Leaderboard Tebak Gambar*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮');
    }
    
    const top = allUsersTebakGambar.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`;
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`;
    }).join('\n\n');
    
    const totalWins = allUsersTebakGambar.reduce((sum, u) => sum + u.wins, 0);
    const totalGames = allUsersTebakGambar.reduce((sum, u) => sum + u.total, 0);
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    return m.reply(`🏆 *LEADERBOARD TEBAK GAMBAR*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .tebakgambar stats untuk statistikmu_`);
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {};
    const win = user.tebakgambar_win || 0;
    const total = user.tebakgambar_total || 0;
    const wrong = user.tebakgambar_wrong || 0;
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0;
    
    const allUsersTebakGambar = [];
    let usersTebakGambar = await getAllUsers();
    
    for (let jid in usersTebakGambar) {
      const u = db.users[jid];
      if (u && u.tebakgambar_win > 0) {
        allUsersTebakGambar.push({
          jid,
          wins: u.tebakgambar_win || 0
        });
      }
    }
    
    allUsersTebakGambar.sort((a, b) => b.wins - a.wins);
    const position = allUsersTebakGambar.findIndex(u => u.jid === m.sender) + 1;
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0];
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`;
    statsText += `🎮 Game: Tebak Gambar\n`;
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`;
    statsText += `✅ Menang: ${win} kali\n`;
    statsText += `❌ Kalah: ${wrong} kali\n`;
    statsText += `🎮 Total Game: ${total} kali\n`;
    statsText += `📈 Win Rate: ${winRate}%\n`;
    statsText += `💰 Saldo: ${user.saldo || 0}\n`;
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`;
    
    if (user.tebakgambar_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`;
    }
    
    if (user.tebakgambar_stats) {
      statsText += `🎚️ *STATS PER LEVEL:*\n`;
      Object.entries(user.tebakgambar_stats).forEach(([diff, stats]) => {
        if (stats.total > 0) {
          const diffWinRate = Math.round((stats.win / stats.total) * 100);
          const avgTime = stats.waktu && stats.waktu.length > 0 ? 
            Math.round(stats.waktu.reduce((a, b) => a + b, 0) / stats.waktu.length) : 0;
          const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
          statsText += `${emoji} ${diff.toUpperCase()}: ${stats.win}/${stats.total} (${diffWinRate}%)`;
          if (avgTime > 0) statsText += ` ⏱️${avgTime}s\n`;
          else statsText += '\n';
        }
      });
    }
    
    if (user.tebakgambar_best_time && user.tebakgambar_best_time < Infinity) {
      statsText += `\n⚡ *Best Time:* ${user.tebakgambar_best_time} detik\n`;
    }
    
    if (user.tebakgambar_limit) {
      statsText += `\n🎮 *Limit Harian Tersisa:*\n`;
      statsText += `🟢 Easy: ${user.tebakgambar_limit.easy || 0}/10\n`;
      statsText += `🟡 Medium: ${user.tebakgambar_limit.medium || 0}/5\n`;
      statsText += `🔴 Hard: ${user.tebakgambar_limit.hard || 0}/3\n`;
    }
    
    if (user.tebakgambar_lastwin) {
      const lastWin = new Date(user.tebakgambar_lastwin);
      const diff = user.tebakgambar_last_difficulty || 'medium';
      const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')} (${emoji} ${diff.toUpperCase()})`;
    }
    
    return m.reply(statsText);
  }
  
  let selectedDifficulty = 'random';
  if (['easy', 'medium', 'hard'].includes(subCmd)) {
    selectedDifficulty = subCmd;
    
    if (!db.users[m.sender]) {
      db.users[m.sender] = {
        tebakgambar_limit: {
          easy: 10,
          medium: 5,
          hard: 3
        }
      };
    }
    
    const user = db.users[m.sender];
    if (!user.tebakgambar_limit) {
      user.tebakgambar_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    const remaining = user.tebakgambar_limit[selectedDifficulty] || 0;
    if (remaining <= 0 && !isPremium && !isCreator) {
      return m.reply(`🎮 *Limit ${selectedDifficulty.toUpperCase()} Habis!*\n\nKamu sudah main level ${selectedDifficulty} terlalu banyak hari ini.\n\nCoba level lain atau tunggu besok!`);
    }
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000);
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Tebak Gambar.`);
  }
  
  if (!db.game.tebakgambar) db.game.tebakgambar = {};
  if (db.game.tebakgambar[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.');
  }
  
  if (!isCreator && !isPremium) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    if (!db.users[m.sender].glimit) db.users[m.sender].glimit = 0;
    if (db.users[m.sender].glimit < 1) {
      return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
    }
    db.users[m.sender].glimit--;
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/tebakgambar?apikey=demo');
    
    if (!res.status || !res.result?.img || !res.result?.jawaban) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.');
    }
    
    const imgUrl = res.result.img.trim();
    const jawaban = res.result.jawaban.trim().toLowerCase();
    const deskripsi = res.result.deskripsi || '';
    
    let finalDifficulty = selectedDifficulty;
    if (finalDifficulty === 'random') {
      const difficulties = ['easy', 'medium', 'hard'];
      finalDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    
    const difficultySettings = {
      'easy': {
        time: 90000,
        reward: 200,
        emoji: '🟢',
        desc: '1 menit 30 detik'
      },
      'medium': {
        time: 60000,
        reward: 300,
        emoji: '🟡',
        desc: '1 menit'
      },
      'hard': {
        time: 30000,
        reward: 500,
        emoji: '🔴',
        desc: '30 detik'
      }
    };
    
    const settings = difficultySettings[finalDifficulty];
    
    const teks = `
${settings.emoji} *TEBAK GAMBAR - LEVEL ${finalDifficulty.toUpperCase()}*

${deskripsi ? `📝 *Deskripsi:* ${deskripsi}\n` : ''}
⏱️ *Waktu:* ${settings.desc}
💰 *Hadiah:* ${settings.reward} saldo
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Tebak kata berdasarkan gambar di atas!_
    `;
    
    const sent = await Ditss.sendMessage(m.chat, { 
      image: { url: imgUrl },
      caption: teks
    }, { quoted: m });
    
    db.game.tebakgambar[m.chat] = {
      id: 'tebakgambar',
      msgId: sent.key.id,
      img: imgUrl,
      deskripsi: deskripsi,
      jawaban: jawaban,
      difficulty: finalDifficulty,
      hadiah: settings.reward,
      time: settings.time,
      timeout: Date.now() + settings.time,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    };
       console.log(jawaban)
    setTimeout(async () => {
      if (db.game.tebakgambar?.[m.chat]) {
        await Ditss.sendMessage(m.chat, {
          text: `⏰ *WAKTU HABIS!*\n\nLevel: ${db.game.tebakgambar[m.chat].difficulty.toUpperCase()}\nJawaban: *${db.game.tebakgambar[m.chat].jawaban.toUpperCase()}*${db.game.tebakgambar[m.chat].deskripsi ? `\nDeskripsi: ${db.game.tebakgambar[m.chat].deskripsi}` : ''}\n\nKetik .tebakgambar untuk main lagi!`
        });
        delete db.game.tebakgambar[m.chat];
      }
    }, settings.time);
    
    if (!db.game.cooldown) db.game.cooldown = {};
    const cooldownTime = {
      'easy': 15000,
      'medium': 30000,
      'hard': 45000
    };
    
    db.game.cooldown[m.sender] = Date.now() + (cooldownTime[finalDifficulty] || 30000);
    
  } catch (error) {
    console.error('[TEBAK GAMBAR] API Error:', error);
    m.reply('❌ Gagal terhubung ke server game.');
  }
  
  break;
}
case 'tekateki':
case 'tteki': {
  const subCmd = args[0]?.toLowerCase();
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersTekaTeki = [];
    let usersTekaTekiLb = await getAllUsers();
    
    for (let jid in usersTekaTekiLb) {
      const userData = db.users[jid];
      if (userData && userData.tekateki_win > 0) {
        const winRate = userData.tekateki_total > 0 ? 
          Math.round((userData.tekateki_win / userData.tekateki_total) * 100) : 0;
        
        allUsersTekaTeki.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.tekateki_win || 0,
          total: userData.tekateki_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.tekateki_top || false
        });
      }
    }
    
    allUsersTekaTeki.sort((a, b) => b.wins - a.wins);
    
    if (allUsersTekaTeki.length === 0) {
      return m.reply('🏆 *Leaderboard Teka-Teki*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮');
    }
    
    const top = allUsersTekaTeki.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`;
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`;
    }).join('\n\n');
    
    const totalWins = allUsersTekaTeki.reduce((sum, u) => sum + u.wins, 0);
    const totalGames = allUsersTekaTeki.reduce((sum, u) => sum + u.total, 0);
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    return m.reply(`🏆 *LEADERBOARD TEKA-TEKI*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .tekateki stats untuk statistikmu_`);
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {};
    const win = user.tekateki_win || 0;
    const total = user.tekateki_total || 0;
    const wrong = user.tekateki_wrong || 0;
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0;
    
    const allUsersTekaTeki = [];
    let usersTekaTeki = await getAllUsers();
    
    for (let jid in usersTekaTeki) {
      const u = db.users[jid];
      if (u && u.tekateki_win > 0) {
        allUsersTekaTeki.push({
          jid,
          wins: u.tekateki_win || 0
        });
      }
    }
    
    allUsersTekaTeki.sort((a, b) => b.wins - a.wins);
    const position = allUsersTekaTeki.findIndex(u => u.jid === m.sender) + 1;
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0];
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`;
    statsText += `🎮 Game: Teka-Teki\n`;
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`;
    statsText += `✅ Menang: ${win} kali\n`;
    statsText += `❌ Kalah: ${wrong} kali\n`;
    statsText += `🎮 Total Game: ${total} kali\n`;
    statsText += `📈 Win Rate: ${winRate}%\n`;
    statsText += `💰 Saldo: ${user.saldo || 0}\n`;
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`;
    
    if (user.tekateki_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`;
    }
    
    if (user.tekateki_stats) {
      statsText += `🎚️ *STATS PER LEVEL:*\n`;
      Object.entries(user.tekateki_stats).forEach(([diff, stats]) => {
        if (stats.total > 0) {
          const diffWinRate = Math.round((stats.win / stats.total) * 100);
          const avgTime = stats.waktu && stats.waktu.length > 0 ? 
            Math.round(stats.waktu.reduce((a, b) => a + b, 0) / stats.waktu.length) : 0;
          const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
          statsText += `${emoji} ${diff.toUpperCase()}: ${stats.win}/${stats.total} (${diffWinRate}%)`;
          if (avgTime > 0) statsText += ` ⏱️${avgTime}s\n`;
          else statsText += '\n';
        }
      });
    }
    
    if (user.tekateki_best_time && user.tekateki_best_time < Infinity) {
      statsText += `\n⚡ *Best Time:* ${user.tekateki_best_time} detik\n`;
    }
    
    if (user.tekateki_limit) {
      statsText += `\n🎮 *Limit Harian Tersisa:*\n`;
      statsText += `🟢 Easy: ${user.tekateki_limit.easy || 0}/10\n`;
      statsText += `🟡 Medium: ${user.tekateki_limit.medium || 0}/5\n`;
      statsText += `🔴 Hard: ${user.tekateki_limit.hard || 0}/3\n`;
    }
    
    if (user.tekateki_lastwin) {
      const lastWin = new Date(user.tekateki_lastwin);
      const diff = user.tekateki_last_difficulty || 'medium';
      const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')} (${emoji} ${diff.toUpperCase()})`;
    }
    
    return m.reply(statsText);
  }
  
  let selectedDifficulty = 'random';
  if (['easy', 'medium', 'hard'].includes(subCmd)) {
    selectedDifficulty = subCmd;
    
    if (!db.users[m.sender]) {
      db.users[m.sender] = {
        tekateki_limit: {
          easy: 10,
          medium: 5,
          hard: 3
        }
      };
    }
    
    const user = db.users[m.sender];
    if (!user.tekateki_limit) {
      user.tekateki_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    const remaining = user.tekateki_limit[selectedDifficulty] || 0;
    if (remaining <= 0 && !isPremium && !isCreator) {
      return m.reply(`🎮 *Limit ${selectedDifficulty.toUpperCase()} Habis!*\n\nKamu sudah main level ${selectedDifficulty} terlalu banyak hari ini.\n\nCoba level lain atau tunggu besok!`);
    }
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000);
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Teka-Teki.`);
  }
  
  if (!db.game.tekateki) db.game.tekateki = {};
  if (db.game.tekateki[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.');
  }
  
  if (!isCreator && !isPremium) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    if (!db.users[m.sender].glimit) db.users[m.sender].glimit = 0;
    if (db.users[m.sender].glimit < 1) {
      return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
    }
    db.users[m.sender].glimit--;
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/tekateki?apikey=demo');
    
    if (!res.status || !res.result?.soal || !res.result?.jawaban) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.');
    }
    
    const soal = res.result.soal.trim();
    const jawaban = res.result.jawaban.trim().toLowerCase();
    
    let finalDifficulty = selectedDifficulty;
    if (finalDifficulty === 'random') {
      const difficulties = ['easy', 'medium', 'hard'];
      finalDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    
    const difficultySettings = {
      'easy': {
        time: 90000,
        reward: 200,
        emoji: '🟢',
        desc: '1 menit 30 detik'
      },
      'medium': {
        time: 60000,
        reward: 300,
        emoji: '🟡',
        desc: '1 menit'
      },
      'hard': {
        time: 30000,
        reward: 500,
        emoji: '🔴',
        desc: '30 detik'
      }
    };
    
    const settings = difficultySettings[finalDifficulty];
    
    const teks = `
${settings.emoji} *TEKA-TEKI - LEVEL ${finalDifficulty.toUpperCase()}*

❓ *Soal:* ${soal}

⏱️ *Waktu:* ${settings.desc}
💰 *Hadiah:* ${settings.reward} saldo
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Jawab teka-teki di atas!_
    `;
    
    const sent = await Ditss.sendMessage(m.chat, { text: teks }, { quoted: m });
    db.game.tekateki[m.chat] = {
      id: 'tekateki',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban,
      difficulty: finalDifficulty,
      hadiah: settings.reward,
      time: settings.time,
      timeout: Date.now() + settings.time,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    };
       console.log(jawaban)
    setTimeout(async () => {
      if (db.game.tekateki?.[m.chat] && Date.now() > db.game.tekateki[m.chat].timeout) {
        await Ditss.sendMessage(m.chat, {
          text: `⏰ *WAKTU HABIS!*\n\nLevel: ${db.game.tekateki[m.chat].difficulty.toUpperCase()}\nJawaban: *${db.game.tekateki[m.chat].jawaban}*\n\nKetik .tekateki untuk main lagi!`
        });
        delete db.game.tekateki[m.chat];
      }
    }, settings.time);
    
    if (!db.game.cooldown) db.game.cooldown = {};
    const cooldownTime = {
      'easy': 15000,
      'medium': 30000,
      'hard': 45000
    };
    
    db.game.cooldown[m.sender] = Date.now() + (cooldownTime[finalDifficulty] || 30000);
    
  } catch (error) {
    console.error('[TEKA-TEKI] API Error:', error);
    m.reply('❌ Gagal terhubung ke server game.');
  }
  
  break;
}
                case 'tebakkalimat':
case 'tkalimat': {
  const subCmd = args[0]?.toLowerCase()
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersTebakKalimat = []
    let usersTebakKalimatLb = await getAllUsers()
    for (let jid in usersTebakKalimatLb) {
      const userData = db.users[jid]
      if (userData && userData.tebakkalimat_win > 0) {
        const winRate = userData.tebakkalimat_total > 0 ? 
          Math.round((userData.tebakkalimat_win / userData.tebakkalimat_total) * 100) : 0
        
        allUsersTebakKalimat.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.tebakkalimat_win || 0,
          total: userData.tebakkalimat_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.tebakkalimat_top || false
        })
      }
    }
    
    allUsersTebakKalimat.sort((a, b) => b.wins - a.wins)
    
    if (allUsersTebakKalimat.length === 0) {
      return m.reply('🏆 *Leaderboard Tebak Kalimat*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮')
    }
    
    const top = allUsersTebakKalimat.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`
    }).join('\n\n')
    
    const totalWins = allUsersTebakKalimat.reduce((sum, u) => sum + u.wins, 0)
    const totalGames = allUsersTebakKalimat.reduce((sum, u) => sum + u.total, 0)
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0
    
    return m.reply(`🏆 *LEADERBOARD TEBAK KALIMAT*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .tebakkalimat stats untuk statistikmu_`)
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {}
    const win = user.tebakkalimat_win || 0
    const total = user.tebakkalimat_total || 0
    const wrong = user.tebakkalimat_wrong || 0
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0
    
    const allUsersTebakKalimat = []
    let usersTebakKalimat = await getAllUsers()
    for (let jid in usersTebakKalimat) {
      const u = db.users[jid]
      if (u && u.tebakkalimat_win > 0) {
        allUsersTebakKalimat.push({
          jid,
          wins: u.tebakkalimat_win || 0
        })
      }
    }
    
    allUsersTebakKalimat.sort((a, b) => b.wins - a.wins)
    const position = allUsersTebakKalimat.findIndex(u => u.jid === m.sender) + 1
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0]
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`
    statsText += `📝 Game: Tebak Kalimat\n`
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`
    statsText += `✅ Menang: ${win} kali\n`
    statsText += `❌ Kalah: ${wrong} kali\n`
    statsText += `🎮 Total Game: ${total} kali\n`
    statsText += `📈 Win Rate: ${winRate}%\n`
    statsText += `💰 Saldo: ${user.saldo || 0}\n`
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`
    
    if (user.tebakkalimat_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`
    }
    
    if (user.tebakkalimat_stats) {
      statsText += `🎚️ *STATS PER LEVEL:*\n`
      Object.entries(user.tebakkalimat_stats).forEach(([diff, stats]) => {
        if (stats.total > 0) {
          const diffWinRate = Math.round((stats.win / stats.total) * 100)
          const avgTime = stats.waktu && stats.waktu.length > 0 ? 
            Math.round(stats.waktu.reduce((a, b) => a + b, 0) / stats.waktu.length) : 0
          const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴'
          statsText += `${emoji} ${diff.toUpperCase()}: ${stats.win}/${stats.total} (${diffWinRate}%)`
          if (avgTime > 0) statsText += ` ⏱️${avgTime}s\n`
          else statsText += '\n'
        }
      })
    }
    
    if (user.tebakkalimat_best_time && user.tebakkalimat_best_time < Infinity) {
      statsText += `\n⚡ *Best Time:* ${user.tebakkalimat_best_time} detik\n`
    }
    
    if (user.tebakkalimat_limit) {
      statsText += `\n🎮 *Limit Harian Tersisa:*\n`
      statsText += `🟢 Easy: ${user.tebakkalimat_limit.easy || 0}/10\n`
      statsText += `🟡 Medium: ${user.tebakkalimat_limit.medium || 0}/5\n`
      statsText += `🔴 Hard: ${user.tebakkalimat_limit.hard || 0}/3\n`
    }
    
    if (user.tebakkalimat_lastwin) {
      const lastWin = new Date(user.tebakkalimat_lastwin)
      const diff = user.tebakkalimat_last_difficulty || 'medium'
      const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴'
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')} (${emoji} ${diff.toUpperCase()})`
    }
    
    return m.reply(statsText)
  }
  
  let selectedDifficulty = 'random'
  if (['easy', 'medium', 'hard'].includes(subCmd)) {
    selectedDifficulty = subCmd
    
    if (!db.users[m.sender]) {
      db.users[m.sender] = {
        tebakkalimat_limit: {
          easy: 10,
          medium: 5,
          hard: 3
        }
      }
    }
    
    const user = db.users[m.sender]
    if (!user.tebakkalimat_limit) {
      user.tebakkalimat_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      }
    }
    
    const remaining = user.tebakkalimat_limit[selectedDifficulty] || 0
    if (remaining <= 0 && !isPremium && !isCreator) {
      return m.reply(`🎮 *Limit ${selectedDifficulty.toUpperCase()} Habis!*\n\nKamu sudah main level ${selectedDifficulty} terlalu banyak hari ini.\n\nCoba level lain atau tunggu besok!`)
    }
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`)
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000)
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Tebak Kalimat.`)
  }
  
  if (!db.game.tebakkalimat) db.game.tebakkalimat = {}
  if (db.game.tebakkalimat[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.')
  }
  
  if (!isCreator && !isPremium) {
    db.users[m.sender].glimit = (db.users[m.sender].glimit || 0) - 1
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/tebakkalimat?apikey=demo')
    
    if (!res.status || !res.result?.soal || !res.result?.jawaban) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.')
    }
    
    const soal = res.result.soal.trim()
    const jawaban = res.result.jawaban.trim().toLowerCase()
    
    let finalDifficulty = selectedDifficulty
    if (finalDifficulty === 'random') {
      const difficulties = ['easy', 'medium', 'hard']
      finalDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)]
    }
    
    const difficultySettings = {
      'easy': {
        time: 180000,
        reward: 200,
        emoji: '🟢',
        desc: '3 menit'
      },
      'medium': {
        time: 120000,
        reward: 300,
        emoji: '🟡',
        desc: '2 menit'
      },
      'hard': {
        time: 60000,
        reward: 500,
        emoji: '🔴',
        desc: '1 menit'
      }
    }
    
    const settings = difficultySettings[finalDifficulty]
    
    const teks = `
${settings.emoji} *TEBAK KALIMAT - LEVEL ${finalDifficulty.toUpperCase()}*

📝 *Kalimat:* ${soal}

⏱️ *Waktu:* ${settings.desc}
💰 *Hadiah:* ${settings.reward} saldo
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Lengkapi kalimat di atas dengan kata yang tepat!_
    `
    
    const sent = await Ditss.sendMessage(m.chat, { text: teks }, { quoted: m })
    db.game.tebakkalimat[m.chat] = {
      id: 'tebakkalimat',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban,
      difficulty: finalDifficulty,
      hadiah: settings.reward,
      time: settings.time,
      timeout: Date.now() + settings.time,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    }
    console.log(jawaban)
    setTimeout(async () => {
      if (db.game.tebakkalimat?.[m.chat] && Date.now() > db.game.tebakkalimat[m.chat].timeout) {
        await Ditss.sendMessage(m.chat, {
          text: `⏰ *WAKTU HABIS!*\n\nLevel: ${db.game.tebakkalimat[m.chat].difficulty.toUpperCase()}\nJawaban: *${db.game.tebakkalimat[m.chat].jawaban}*\n\nKetik .tebakkalimat untuk main lagi!`
        })
        delete db.game.tebakkalimat[m.chat]
      }
    }, settings.time)
    
    if (!db.game.cooldown) db.game.cooldown = {}
    const cooldownTime = {
      'easy': 15000,
      'medium': 30000,
      'hard': 45000
    }
    
    db.game.cooldown[m.sender] = Date.now() + (cooldownTime[finalDifficulty] || 30000)
    
  } catch (error) {
    console.error('[TEBAK KALIMAT] API Error:', error)
    m.reply('❌ Gagal terhubung ke server game.')
  }
  
  break
}                
case 'tebakkata':
case 'tkata': {
  const subCmd = args[0]?.toLowerCase();
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersTebakKata = [];
    let usersTebakKataLb = await getAllUsers();
    
    for (let jid in usersTebakKataLb) {
      const userData = db.users[jid];
      if (userData && userData.tebakkata_win > 0) {
        const winRate = userData.tebakkata_total > 0 ? 
          Math.round((userData.tebakkata_win / userData.tebakkata_total) * 100) : 0;
        
        allUsersTebakKata.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.tebakkata_win || 0,
          total: userData.tebakkata_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.tebakkata_top || false
        });
      }
    }
    
    allUsersTebakKata.sort((a, b) => b.wins - a.wins);
    
    if (allUsersTebakKata.length === 0) {
      return m.reply('🏆 *Leaderboard Tebak Kata*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮');
    }
    
    const top = allUsersTebakKata.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`;
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`;
    }).join('\n\n');
    
    const totalWins = allUsersTebakKata.reduce((sum, u) => sum + u.wins, 0);
    const totalGames = allUsersTebakKata.reduce((sum, u) => sum + u.total, 0);
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    return m.reply(`🏆 *LEADERBOARD TEBAK KATA*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .tebakkata stats untuk statistikmu_`);
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {};
    const win = user.tebakkata_win || 0;
    const total = user.tebakkata_total || 0;
    const wrong = user.tebakkata_wrong || 0;
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0;
    
    const allUsersTebakKata = [];
    let usersTebakKata = await getAllUsers();
    
    for (let jid in usersTebakKata) {
      const u = db.users[jid];
      if (u && u.tebakkata_win > 0) {
        allUsersTebakKata.push({
          jid,
          wins: u.tebakkata_win || 0
        });
      }
    }
    
    allUsersTebakKata.sort((a, b) => b.wins - a.wins);
    const position = allUsersTebakKata.findIndex(u => u.jid === m.sender) + 1;
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0];
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`;
    statsText += `🎮 Game: Tebak Kata\n`;
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`;
    statsText += `✅ Menang: ${win} kali\n`;
    statsText += `❌ Kalah: ${wrong} kali\n`;
    statsText += `🎮 Total Game: ${total} kali\n`;
    statsText += `📈 Win Rate: ${winRate}%\n`;
    statsText += `💰 Saldo: ${user.saldo || 0}\n`;
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`;
    
    if (user.tebakkata_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`;
    }
    
    if (user.tebakkata_stats) {
      statsText += `🎚️ *STATS PER LEVEL:*\n`;
      Object.entries(user.tebakkata_stats).forEach(([diff, stats]) => {
        if (stats.total > 0) {
          const diffWinRate = Math.round((stats.win / stats.total) * 100);
          const avgTime = stats.waktu && stats.waktu.length > 0 ? 
            Math.round(stats.waktu.reduce((a, b) => a + b, 0) / stats.waktu.length) : 0;
          const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
          statsText += `${emoji} ${diff.toUpperCase()}: ${stats.win}/${stats.total} (${diffWinRate}%)`;
          if (avgTime > 0) statsText += ` ⏱️${avgTime}s\n`;
          else statsText += '\n';
        }
      });
    }
    
    if (user.tebakkata_best_time && user.tebakkata_best_time < Infinity) {
      statsText += `\n⚡ *Best Time:* ${user.tebakkata_best_time} detik\n`;
    }
    
    if (user.tebakkata_limit) {
      statsText += `\n🎮 *Limit Harian Tersisa:*\n`;
      statsText += `🟢 Easy: ${user.tebakkata_limit.easy || 0}/10\n`;
      statsText += `🟡 Medium: ${user.tebakkata_limit.medium || 0}/5\n`;
      statsText += `🔴 Hard: ${user.tebakkata_limit.hard || 0}/3\n`;
    }
    
    if (user.tebakkata_lastwin) {
      const lastWin = new Date(user.tebakkata_lastwin);
      const diff = user.tebakkata_last_difficulty || 'medium';
      const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')} (${emoji} ${diff.toUpperCase()})`;
    }
    
    return m.reply(statsText);
  }
  
  let selectedDifficulty = 'random';
  if (['easy', 'medium', 'hard'].includes(subCmd)) {
    selectedDifficulty = subCmd;
    
    if (!db.users[m.sender]) {
      db.users[m.sender] = {
        tebakkata_limit: {
          easy: 10,
          medium: 5,
          hard: 3
        }
      };
    }
    
    const user = db.users[m.sender];
    if (!user.tebakkata_limit) {
      user.tebakkata_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    const remaining = user.tebakkata_limit[selectedDifficulty] || 0;
    if (remaining <= 0 && !isPremium && !isCreator) {
      return m.reply(`🎮 *Limit ${selectedDifficulty.toUpperCase()} Habis!*\n\nKamu sudah main level ${selectedDifficulty} terlalu banyak hari ini.\n\nCoba level lain atau tunggu besok!`);
    }
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000);
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Tebak Kata.`);
  }
  
  if (!db.game.tebakkata) db.game.tebakkata = {};
  if (db.game.tebakkata[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.');
  }
  
  if (!isCreator && !isPremium) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    if (!db.users[m.sender].glimit) db.users[m.sender].glimit = 0;
    if (db.users[m.sender].glimit < 1) {
      return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
    }
    db.users[m.sender].glimit--;
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/tebakkata?apikey=demo');
    
    if (!res.status || !res.result?.soal || !res.result?.jawaban) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.');
    }
    
    const soal = res.result.soal.trim();
    const jawaban = res.result.jawaban.trim().toLowerCase();
    
    let finalDifficulty = selectedDifficulty;
    if (finalDifficulty === 'random') {
      const difficulties = ['easy', 'medium', 'hard'];
      finalDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    
    const difficultySettings = {
      'easy': {
        time: 90000,
        reward: 200,
        emoji: '🟢',
        desc: '1 menit 30 detik'
      },
      'medium': {
        time: 60000,
        reward: 300,
        emoji: '🟡',
        desc: '1 menit'
      },
      'hard': {
        time: 30000,
        reward: 500,
        emoji: '🔴',
        desc: '30 detik'
      }
    };
    
    const settings = difficultySettings[finalDifficulty];
    
    const teks = `
${settings.emoji} *TEBAK KATA - LEVEL ${finalDifficulty.toUpperCase()}*

📝 *Soal:* ${soal}

⏱️ *Waktu:* ${settings.desc}
💰 *Hadiah:* ${settings.reward} saldo
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Tebak kata berdasarkan petunjuk di atas!_
    `;
    
    const sent = await Ditss.sendMessage(m.chat, { text: teks }, { quoted: m });
    db.game.tebakkata[m.chat] = {
      id: 'tebakkata',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban,
      difficulty: finalDifficulty,
      hadiah: settings.reward,
      time: settings.time,
      timeout: Date.now() + settings.time,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    };
       console.log(jawaban)
    setTimeout(async () => {
      if (db.game.tebakkata?.[m.chat] && Date.now() > db.game.tebakkata[m.chat].timeout) {
        await Ditss.sendMessage(m.chat, {
          text: `⏰ *WAKTU HABIS!*\n\nLevel: ${db.game.tebakkata[m.chat].difficulty.toUpperCase()}\nJawaban: *${db.game.tebakkata[m.chat].jawaban}*\n\nKetik .tebakkata untuk main lagi!`
        });
        delete db.game.tebakkata[m.chat];
      }
    }, settings.time);
    
    if (!db.game.cooldown) db.game.cooldown = {};
    const cooldownTime = {
      'easy': 15000,
      'medium': 30000,
      'hard': 45000
    };
    
    db.game.cooldown[m.sender] = Date.now() + (cooldownTime[finalDifficulty] || 30000);
    
  } catch (error) {
    console.error('[TEBAK KATA] API Error:', error);
    m.reply('❌ Gagal terhubung ke server game.');
  }
  
  break;
}
case 'siapakahaku':
case 'saku': {
  const subCmd = args[0]?.toLowerCase();
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersSiapakahAku = [];
    let usersSiapakahAkuLb = await getAllUsers();
    
    for (let jid in usersSiapakahAkuLb) {
      const userData = db.users[jid];
      if (userData && userData.siapakahaku_win > 0) {
        const winRate = userData.siapakahaku_total > 0 ? 
          Math.round((userData.siapakahaku_win / userData.siapakahaku_total) * 100) : 0;
        
        allUsersSiapakahAku.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.siapakahaku_win || 0,
          total: userData.siapakahaku_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.siapakahaku_top || false
        });
      }
    }
    
    allUsersSiapakahAku.sort((a, b) => b.wins - a.wins);
    
    if (allUsersSiapakahAku.length === 0) {
      return m.reply('🏆 *Leaderboard Siapakah Aku*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮');
    }
    
    const top = allUsersSiapakahAku.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`;
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`;
    }).join('\n\n');
    
    const totalWins = allUsersSiapakahAku.reduce((sum, u) => sum + u.wins, 0);
    const totalGames = allUsersSiapakahAku.reduce((sum, u) => sum + u.total, 0);
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    return m.reply(`🏆 *LEADERBOARD SIAPAKAH AKU*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .siapakahaku stats untuk statistikmu_`);
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {};
    const win = user.siapakahaku_win || 0;
    const total = user.siapakahaku_total || 0;
    const wrong = user.siapakahaku_wrong || 0;
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0;
    
    const allUsersSiapakahAku = [];
    let usersSiapakahAku = await getAllUsers();
    
    for (let jid in usersSiapakahAku) {
      const u = db.users[jid];
      if (u && u.siapakahaku_win > 0) {
        allUsersSiapakahAku.push({
          jid,
          wins: u.siapakahaku_win || 0
        });
      }
    }
    
    allUsersSiapakahAku.sort((a, b) => b.wins - a.wins);
    const position = allUsersSiapakahAku.findIndex(u => u.jid === m.sender) + 1;
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0];
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`;
    statsText += `🎮 Game: Siapakah Aku\n`;
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`;
    statsText += `✅ Menang: ${win} kali\n`;
    statsText += `❌ Kalah: ${wrong} kali\n`;
    statsText += `🎮 Total Game: ${total} kali\n`;
    statsText += `📈 Win Rate: ${winRate}%\n`;
    statsText += `💰 Saldo: ${user.saldo || 0}\n`;
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`;
    
    if (user.siapakahaku_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`;
    }
    
    if (user.siapakahaku_stats) {
      statsText += `🎚️ *STATS PER LEVEL:*\n`;
      Object.entries(user.siapakahaku_stats).forEach(([diff, stats]) => {
        if (stats.total > 0) {
          const diffWinRate = Math.round((stats.win / stats.total) * 100);
          const avgTime = stats.waktu && stats.waktu.length > 0 ? 
            Math.round(stats.waktu.reduce((a, b) => a + b, 0) / stats.waktu.length) : 0;
          const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
          statsText += `${emoji} ${diff.toUpperCase()}: ${stats.win}/${stats.total} (${diffWinRate}%)`;
          if (avgTime > 0) statsText += ` ⏱️${avgTime}s\n`;
          else statsText += '\n';
        }
      });
    }
    
    if (user.siapakahaku_best_time && user.siapakahaku_best_time < Infinity) {
      statsText += `\n⚡ *Best Time:* ${user.siapakahaku_best_time} detik\n`;
    }
    
    if (user.siapakahaku_limit) {
      statsText += `\n🎮 *Limit Harian Tersisa:*\n`;
      statsText += `🟢 Easy: ${user.siapakahaku_limit.easy || 0}/10\n`;
      statsText += `🟡 Medium: ${user.siapakahaku_limit.medium || 0}/5\n`;
      statsText += `🔴 Hard: ${user.siapakahaku_limit.hard || 0}/3\n`;
    }
    
    if (user.siapakahaku_lastwin) {
      const lastWin = new Date(user.siapakahaku_lastwin);
      const diff = user.siapakahaku_last_difficulty || 'medium';
      const emoji = diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')} (${emoji} ${diff.toUpperCase()})`;
    }
    
    return m.reply(statsText);
  }
  
  let selectedDifficulty = 'random';
  if (['easy', 'medium', 'hard'].includes(subCmd)) {
    selectedDifficulty = subCmd;
    
    if (!db.users[m.sender]) {
      db.users[m.sender] = {
        siapakahaku_limit: {
          easy: 10,
          medium: 5,
          hard: 3
        }
      };
    }
    
    const user = db.users[m.sender];
    if (!user.siapakahaku_limit) {
      user.siapakahaku_limit = {
        easy: 10,
        medium: 5,
        hard: 3
      };
    }
    
    const remaining = user.siapakahaku_limit[selectedDifficulty] || 0;
    if (remaining <= 0 && !isPremium && !isCreator) {
      return m.reply(`🎮 *Limit ${selectedDifficulty.toUpperCase()} Habis!*\n\nKamu sudah main level ${selectedDifficulty} terlalu banyak hari ini.\n\nCoba level lain atau tunggu besok!`);
    }
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000);
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Siapakah Aku.`);
  }
  
  if (!db.game.siapakahaku) db.game.siapakahaku = {};
  if (db.game.siapakahaku[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.');
  }
  
  if (!isCreator && !isPremium) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    if (!db.users[m.sender].glimit) db.users[m.sender].glimit = 0;
    if (db.users[m.sender].glimit < 1) {
      return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
    }
    db.users[m.sender].glimit--;
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/siapakahaku?apikey=demo');
    
    if (!res.status || !res.result?.soal || !res.result?.jawaban) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.');
    }
    
    const soal = res.result.soal.trim();
    const jawaban = res.result.jawaban.trim().toLowerCase();
    
    let finalDifficulty = selectedDifficulty;
    if (finalDifficulty === 'random') {
      const difficulties = ['easy', 'medium', 'hard'];
      finalDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    
    const difficultySettings = {
      'easy': {
        time: 90000,
        reward: 200,
        emoji: '🟢',
        desc: '1 menit 30 detik'
      },
      'medium': {
        time: 60000,
        reward: 300,
        emoji: '🟡',
        desc: '1 menit'
      },
      'hard': {
        time: 30000,
        reward: 500,
        emoji: '🔴',
        desc: '30 detik'
      }
    };
    
    const settings = difficultySettings[finalDifficulty];
    
    const teks = `
${settings.emoji} *SIAPAKAH AKU - LEVEL ${finalDifficulty.toUpperCase()}*

📝 *Petunjuk:* ${soal}

⏱️ *Waktu:* ${settings.desc}
💰 *Hadiah:* ${settings.reward} saldo
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Tebak siapa/sesuatu berdasarkan petunjuk di atas!_
    `;
    
    const sent = await Ditss.sendMessage(m.chat, { text: teks }, { quoted: m });
    db.game.siapakahaku[m.chat] = {
      id: 'siapakahaku',
      msgId: sent.key.id,
      soal: soal,
      jawaban: jawaban,
      difficulty: finalDifficulty,
      hadiah: settings.reward,
      time: settings.time,
      timeout: Date.now() + settings.time,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    };
      console.log(jawaban)
    setTimeout(async () => {
      if (db.game.siapakahaku?.[m.chat] && Date.now() > db.game.siapakahaku[m.chat].timeout) {
        await Ditss.sendMessage(m.chat, {
          text: `⏰ *WAKTU HABIS!*\n\nLevel: ${db.game.siapakahaku[m.chat].difficulty.toUpperCase()}\nJawaban: *${db.game.siapakahaku[m.chat].jawaban}*\n\nKetik .siapakahaku untuk main lagi!`
        });
        delete db.game.siapakahaku[m.chat];
      }
    }, settings.time);
    
    if (!db.game.cooldown) db.game.cooldown = {};
    const cooldownTime = {
      'easy': 15000,
      'medium': 30000,
      'hard': 45000
    };
    
    db.game.cooldown[m.sender] = Date.now() + (cooldownTime[finalDifficulty] || 30000);
    
  } catch (error) {
    console.error('[SIAPAKAH AKU] API Error:', error);
    m.reply('❌ Gagal terhubung ke server game.');
  }
  
  break;
}
case 'susunkata':
case 'skata': {
  const subCmd = args[0]?.toLowerCase();
  
  if (subCmd === 'leaderboard' || subCmd === 'top' || subCmd === 'lb') {
    const allUsersSusunKata = [];
    let usersSusunKataLb = await getAllUsers();
    
    for (let jid in usersSusunKataLb) {
      const userData = db.users[jid];
      if (userData && userData.susunkata_win > 0) {
        const winRate = userData.susunkata_total > 0 ? 
          Math.round((userData.susunkata_win / userData.susunkata_total) * 100) : 0;
        
        allUsersSusunKata.push({
          jid,
          name: userData.name && userData.name !== 'Unknown' ? 
            (userData.name.length > 15 ? userData.name.substring(0, 15) + '...' : userData.name) : 
            jid.split('@')[0],
          wins: userData.susunkata_win || 0,
          total: userData.susunkata_total || 0,
          winRate: winRate,
          saldo: userData.saldo || 0,
          isTop: userData.susunkata_top || false
        });
      }
    }
    
    allUsersSusunKata.sort((a, b) => b.wins - a.wins);
    
    if (allUsersSusunKata.length === 0) {
      return m.reply('🏆 *Leaderboard Susun Kata*\n\nBelum ada yang menang...\nJadilah yang pertama! 🎮');
    }
    
    const top = allUsersSusunKata.slice(0, 10).map((user, i) => {
      const medal = user.isTop ? '👑' : ['🥇', '🥈', '🥉'][i] || `${i+1}️⃣`;
      return `${medal} ${user.name}\n   ├ ${user.wins} wins\n   ├ ${user.winRate}% WR\n   └ ${user.saldo} saldo`;
    }).join('\n\n');
    
    const totalWins = allUsersSusunKata.reduce((sum, u) => sum + u.wins, 0);
    const totalGames = allUsersSusunKata.reduce((sum, u) => sum + u.total, 0);
    const globalWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    return m.reply(`🏆 *LEADERBOARD SUSUN KATA*\n\n${top}\n\n📊 *Global Stats:*\n├ Total Wins: ${totalWins}\n├ Total Games: ${totalGames}\n└ Win Rate: ${globalWinRate}%\n\n_Ketik .susunkata stats untuk statistikmu_`);
  }
  
  if (subCmd === 'stats' || subCmd === 'stat') {
    const user = db.users[m.sender] || {};
    const win = user.susunkata_win || 0;
    const total = user.susunkata_total || 0;
    const wrong = user.susunkata_wrong || 0;
    const winRate = total > 0 ? Math.round((win / total) * 100) : 0;
    
    const allUsersSusunKata = [];
    let usersSusunKata = await getAllUsers();
    
    for (let jid in usersSusunKata) {
      const u = db.users[jid];
      if (u && u.susunkata_win > 0) {
        allUsersSusunKata.push({
          jid,
          wins: u.susunkata_win || 0
        });
      }
    }
    
    allUsersSusunKata.sort((a, b) => b.wins - a.wins);
    const position = allUsersSusunKata.findIndex(u => u.jid === m.sender) + 1;
    
    const displayName = user.name && user.name !== 'Unknown' ? 
      user.name : m.sender.split('@')[0];
    
    let statsText = `📊 *STATISTIK ${displayName.toUpperCase()}*\n\n`;
    statsText += `🎮 Game: Susun Kata\n`;
    statsText += `🏆 Posisi: ${position > 0 ? `#${position}` : 'Unranked'}\n`;
    statsText += `✅ Menang: ${win} kali\n`;
    statsText += `❌ Kalah: ${wrong} kali\n`;
    statsText += `🎮 Total Game: ${total} kali\n`;
    statsText += `📈 Win Rate: ${winRate}%\n`;
    statsText += `💰 Saldo: ${user.saldo || 0}\n`;
    statsText += `⭐ Rank: ${user.rank || 0}\n\n`;
    
    if (user.susunkata_top) {
      statsText += `👑 *Kamu adalah TOP 1!*\n\n`;
    }
    
    if (user.susunkata_best_time && user.susunkata_best_time < Infinity) {
      statsText += `⚡ *Best Time:* ${user.susunkata_best_time} detik\n`;
    }
    
    if (user.susunkata_lastwin) {
      const lastWin = new Date(user.susunkata_lastwin);
      statsText += `\n⏰ Terakhir Menang: ${lastWin.toLocaleDateString('id-ID')}`;
    }
    
    return m.reply(statsText);
  }
  
  if (!isCreator && !isPremium && db.users[m.sender]?.glimit < 1) {
    return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
  }
  
  if (db.game.cooldown?.[m.sender] && Date.now() < db.game.cooldown[m.sender]) {
    const remaining = Math.ceil((db.game.cooldown[m.sender] - Date.now()) / 1000);
    return m.reply(`⏳ *Cooldown!*\n\nTunggu ${remaining} detik lagi sebelum main game Susun Kata.`);
  }
  
  if (!db.game.susunkata) db.game.susunkata = {};
  if (db.game.susunkata[m.chat]) {
    return m.reply('🎮 *Game sedang berjalan!*\n\nSelesaikan game yang ada dulu atau tunggu timeout.');
  }
  
  if (!isCreator && !isPremium) {
    if (!db.users[m.sender]) db.users[m.sender] = {};
    if (!db.users[m.sender].glimit) db.users[m.sender].glimit = 0;
    if (db.users[m.sender].glimit < 1) {
      return m.reply(`🎮 *Limit Game Habis!*\n\nLimit harian kamu sudah habis!\nReset setiap hari pukul 00:00 WIB.`);
    }
    db.users[m.sender].glimit--;
  }
  
  try {
    const res = await fetchJson('https://api.asuma.my.id/v1/game/susunkata?apikey=demo');
    
    if (!res.status || !res.result?.soal || !res.result?.jawaban) {
      return m.reply('❌ Gagal mengambil soal.\nSilakan coba lagi nanti.');
    }
    
    const soal = res.result.soal.trim();
    const tipe = res.result.tipe || 'Umum';
    const jawaban = res.result.jawaban.trim();
    
    const teks = `
🧩 *GAME SUSUN KATA*

🔤 *Huruf:* ${soal}
📝 *Tipe:* ${tipe}

⏱️ *Waktu:* 2 menit
💰 *Hadiah:* 250 saldo + bonus waktu
💡 *Hint:* Ketik "bantuan" (dikirim ke DM)

📝 *Perintah:*
├ "nyerah" = Menyerah
├ "bantuan" = Minta hint (DM)
└ "stats" = Lihat statistik

_Susun huruf-huruf di atas menjadi kata yang sesuai dengan tipenya!_
    `;
    
    const sent = await Ditss.sendMessage(m.chat, { text: teks }, { quoted: m });
    db.game.susunkata[m.chat] = {
      id: 'susunkata',
      msgId: sent.key.id,
      soal: soal,
      tipe: tipe,
      jawaban: jawaban,
      timeout: Date.now() + 120000,
      key: sent.key,
      startedBy: m.sender,
      startTime: Date.now()
    };
       console.log(jawaban)
    
    setTimeout(async () => {
      if (db.game.susunkata?.[m.chat]) {
       await Ditss.sendMessage(
         m.chat,
           {
               text: `⏰ *WAKTU HABIS!*\n\nHuruf: ${db.game.susunkata[m.chat].soal}\nTipe: ${db.game.susunkata[m.chat].tipe}\nJawaban: *${db.game.susunkata[m.chat].jawaban}*\n\nKetik .susunkata untuk main lagi!`,
                  footer: "Powered By Asuma",
                      headerType: 1,
                          buttons: [
                              {
                                    buttonId: `.${randomGame.cmd}`,
                                            buttonText: { displayText: randomGame.name },
                                                      type: 1
                                                                }
                                                                    ]
                                                                      },
                                                                        { quoted: m }
                                                                        )
        delete db.game.susunkata[m.chat];
      }
    }, 120000);
    
    if (!db.game.cooldown) db.game.cooldown = {};
    db.game.cooldown[m.sender] = Date.now() + 15000;
    
  } catch (error) {
    console.error('[SUSUN KATA] API Error:', error);
    m.reply('❌ Gagal terhubung ke server game.');
  }
  
  break;
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
                const res = await fetch(`https://api.asuma.my.id/v2/nsfw/${kategori}?apikey=demo`)
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
        url: "https://asuma.my.id" 
      })
    },
    {
      name: "cta_url",
      buttonParamsJson: JSON.stringify({
        display_text: "🐙 Lihat di GitHub",
        url: "https://github.com/ditss-labs/asuma"
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
/*  if (!m.fromMe) {
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
}*/
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

let file = fileURLToPath(import.meta.url, true)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Updte 'WhatsApp.js'"))
    import(`${file}?update=${Date.now()}`)
})
