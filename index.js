import chalk from 'chalk';
import pino from 'pino';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import readline from 'readline';
import PhoneNumber from 'awesome-phonenumber';

import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers,
    jidDecode
} from '@whiskeysockets/baileys';

import { config, init } from './config.js';
import { smsg, getBuffer, getSizeMedia } from './src/core/message.js';
import { imageToWebp, videoToWebp, writeExifImg, writeExifVid } from './src/lib/exif.js';
import MediaHandler from './src/core/media.js';
import AsumaHandler from './asuma.js';
import mongoose from 'mongoose';
import Pairing from './database/models/Pairing.js';
import BotSettings from './database/models/BotSettings.js';
import { setModels, autoCloneFromWeb, loadCloneBots } from './src/core/jadibot.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usePairingCode = true;

function question(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(query, (ans) => {
            rl.close();
            resolve(ans);
        });
    });
}

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(init.session);
    const { version } = await fetchLatestBaileysVersion().catch(() => ({ version: [2, 3000, 0] }));
    const logger = pino({ level: 'silent' });
  const Ditss = makeWASocket({
     auth: {
       creds: state.creds,
       keys: makeCacheableSignalKeyStore(state.keys, logger),
     },
     retryRequestDelayMs: 300,
     maxMsgRetryCount: 10,
     version: version,
     logger: logger,  
     markOnlineOnConnect: true,
     printQRInTerminal: !usePairingCode,
     generateHighQualityLinkPreview: true,
     browser: Browsers.macOS('Chrome')
   });

    const media = new MediaHandler(Ditss, { getBuffer, getSizeMedia });
    Ditss.media = media;
    Ditss.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };
    Ditss.ev.on('call', async (caller) => {
        console.log("📞 Call detected:", caller);
    });
    Ditss.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            let mek = chatUpdate.messages[0];
            if (!mek.message) return;
            
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') 
                ? mek.message.ephemeralMessage.message 
                : mek.message;
            
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
            if (!Ditss.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
            
            let m = smsg(Ditss, mek, null);

            // Skip own messages kecuali eval command
            if (m.fromMe && !m.body?.startsWith('>') && !m.body?.startsWith('=>') && !m.body?.startsWith('$')) return;

            await AsumaHandler(Ditss, m, chatUpdate);
            //await handler.process();
        } catch (error) {
            console.error("Error processing message upsert:", error);
        }
    });
    Ditss.getFile = (PATH, save) => media.getFile(PATH, save);
    Ditss.downloadMediaMessage = (message) => media.downloadMediaMessage(message);
    Ditss.sendText = (jid, text, quoted = '', options) => Ditss.sendMessage(jid, { text, ...options }, { quoted });
    
    Ditss.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) 
            ? Buffer.from(path.split`,`[1], 'base64') 
            : /^https?:\/\//.test(path) 
                ? await (await getBuffer(path)) 
                : fs.existsSync(path) 
                    ? fs.readFileSync(path) 
                    : Buffer.alloc(0);
        let buffer = options && (options.packname || options.author) 
            ? await writeExifImg(buff, options) 
            : await imageToWebp(buff);
        await Ditss.sendMessage(jid, { sticker: buffer, ...options }, { quoted });
        return buffer;
    };

    Ditss.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) 
            ? Buffer.from(path.split`,`[1], 'base64') 
            : /^https?:\/\//.test(path) 
                ? await (await getBuffer(path)) 
                : fs.existsSync(path) 
                    ? fs.readFileSync(path) 
                    : Buffer.alloc(0);
        let buffer = options && (options.packname || options.author) 
            ? await writeExifVid(buff, options) 
            : await videoToWebp(buff);
        await Ditss.sendMessage(jid, { sticker: buffer, ...options }, { quoted });
        return buffer;
    };

    Ditss.downloadAndSaveMediaMessage = (message, filename, attachExtension) =>
        media.downloadAndSaveMediaMessage(message, filename, attachExtension);

    Ditss.sendMedia = async (jid, path, caption = '', quoted = '', options = {}) => {
        let { mime, data } = await Ditss.getFile(path, true);
        let messageType = mime.split('/')[0];
        let messageContent = {};

        if (messageType === 'image') {
            messageContent = { image: data, caption: caption, ...options };
        } else if (messageType === 'video') {
            messageContent = { video: data, caption: caption, ...options };
        } else if (messageType === 'audio') {
            messageContent = { audio: data, ptt: options.ptt || false, ...options };
        } else {
            messageContent = { document: data, mimetype: mime, fileName: options.fileName || 'file' };
        }

        await Ditss.sendMessage(jid, messageContent, { quoted });
    };

    Ditss.sendPoll = async (jid, question, options) => {
        const pollMessage = {
            pollCreationMessage: {
                name: question,
                options: options.map(option => ({ optionName: option })),
                selectableCount: 1,
            },
        };
        await Ditss.sendMessage(jid, pollMessage);
    };

    Ditss.public = true;
    Ditss.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            
            console.log(chalk.red(`Connection closed. Reconnecting: ${shouldReconnect}`));
            
            if (shouldReconnect) {
                setTimeout(() => connectToWhatsApp(), 5000); 
            }
        } else if (connection === 'open') {
            console.log(chalk.green("✅ Ditss Bot Connected Successfully!"));
        }
    });
    if (!Ditss.authState.creds.registered && usePairingCode) {
        const phoneNumber = await question(chalk.blue('Masukkan nomor WhatsApp (628xx):\n'));
        const code = await Ditss.requestPairingCode(phoneNumber.replace(/[^0-9]/g, ''));
        console.log(chalk.green(`Pairing Code → ${code}`));
    }
    Ditss.ev.on('error', (err) => {
        console.error(chalk.red("Error: "), err.message || err);
    });
    Ditss.ev.on('creds.update', saveCreds);
setModels(Pairing, BotSettings);

setInterval(async () => {
    if (Ditss && Ditss.user) {
        await autoCloneFromWeb(Ditss);
    }
}, 10000);

setTimeout(async () => {
    if (Ditss && Ditss.user) {
        await loadCloneBots(Ditss);
    }
}, 5000);
setTimeout(() => {
    console.log(chalk.blue('🚀 Memulai auto detect system...'));
}, 3000);
    setInterval(() => {
  const usedMB = process.memoryUsage().rss / 1024 / 1024;

  //console.log(`[ MEMORY ] ${usedMB.toFixed(2)} MB`);

  if (usedMB >= 4096) {
    console.log("⚠️ Restart: RAM > 4GB");
    process.exit(1);
  }
}, 30000);
}
console.clear();
console.log(chalk.cyan(`
╔═══════════════════════════════════════╗
║       🤖 ASUMA BOT STARTING           ║
║    WhatsApp Bot - Super Stable        ║
║         ESM Version v2.0              ║
╚═══════════════════════════════════════╝
`));

connectToWhatsApp().catch((err) => {
    console.error(chalk.red("Fatal error:"), err);
    process.exit(1);
});
process.on('SIGINT', async () => {
    console.log(chalk.yellow('\n👋 Shutting down Asuma Bot...'));
    process.exit(0);
});