import { config } from './config.js';
import {
    getContentType,
    areJidsSameUser,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    DisconnectReason,
    proto
} from '@whiskeysockets/baileys';
import fs from 'fs';
import util from 'util';
import chalk from 'chalk';
import path from 'path';
import axios from 'axios';
import crypto from 'crypto';
import moment from 'moment-timezone';
import logger from './src/core/logger.js';
import {
    smsg,
    tanggal,
    getTime,
    isUrl,
    sleep,
    clockString,
    runtime,
    fetchJson,
    getBuffer,
    jsonformat,
    format,
    parseMention,
    getRandom,
    getGroupAdm,
    generateProfilePicture
} from './src/core/message.js';
import {
    spawn,
    spawnSync,
    exec,
    execSync,
    execFile,
    execFileSync,
    fork
} from 'child_process'
import Case from "./src/lib/system.js";
import handleMessage from "./src/lib/handler.mjs";

const OWNER_PATH = './database/owner.json';
const PREMIUM_PATH = './database/premium.json';
const CreatorOnly = false;

export default async function AsumaHandler(Ditss, m, chatUpdate, store) {
    try {
        const sock = Ditss
        const conn = sock
        const client = conn
        const body = m.body || '';
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefixPattern = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi;
        const prefixMatch = body.match(prefixPattern);
        const prefix = config.prefa ? (prefixMatch ? prefixMatch[0] : "") : (config.prefa ?? "!");

        let Owner = [];
        let Premium = [];

        try {
            if (fs.existsSync(OWNER_PATH)) {
                Owner = JSON.parse(fs.readFileSync(OWNER_PATH));
            }
        } catch (error) {
            console.error('Error loading owner data:', error);
        }
        if (!Array.isArray(Owner)) Owner = [];

        try {
            if (fs.existsSync(PREMIUM_PATH)) {
                Premium = JSON.parse(fs.readFileSync(PREMIUM_PATH));
            }
        } catch (error) {
            console.error('Error loading premium data:', error);
        }
        if (!Array.isArray(Premium)) Premium = [];

        const CMD = body.startsWith(prefix);
        const command = CMD ? body.slice(prefix.length).trim().split(' ')[0].toLowerCase() : '';
        const args = CMD ? body.slice(prefix.length).trim().split(' ').slice(1) : [];
        const text = args.join(' ');

        const cleanJid = (jid) => {
            if (!jid) return jid;
            if (jid.includes('@s.whatsapp.net')) {
                return jid;
            }
            if (jid.includes('@lid')) {
                if (m.key.remoteJidAlt && m.key.remoteJidAlt.includes('@s.whatsapp.net')) {
                    return m.key.remoteJidAlt;
                }
                const number = jid.split('@')[0];
                return number + '@s.whatsapp.net';
            }
            const numberOnly = jid.replace(/[^0-9]/g, '');
            if (numberOnly) {
                return numberOnly + '@s.whatsapp.net';
            }
            return jid;
        };

        const getCorrectSender = (m) => {
            if (m.key.addressingMode === 'lid' && m.key.remoteJidAlt && m.key.remoteJidAlt.includes('@s.whatsapp.net')) {
                return m.key.remoteJidAlt;
            }
            if (m.key.addressingMode === 'pn' && m.key.remoteJid && m.key.remoteJid.includes('@s.whatsapp.net')) {
                return m.key.remoteJid;
            }
            return cleanJid(m.sender);
        };

        const botJid = cleanJid(Ditss.user.id);
        const senderJid = getCorrectSender(m);

        const getCorrectFrom = (m) => {
            if (m.key.addressingMode === 'lid' && m.key.remoteJidAlt && m.key.remoteJidAlt.includes('@s.whatsapp.net')) {
                return m.key.remoteJidAlt;
            }
            return m.key.remoteJid;
        };

        const from = getCorrectFrom(m);
        const sender = m.isGroup ? (m.key.participant ? getCorrectSender({ ...m, sender: m.key.participant }) : getCorrectSender(m)) : senderJid;

        const isOwn = [
            ...Owner,
            ...config.owner
        ].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
            .includes(senderJid) || botJid === senderJid;

        const isPrem = [
            ...Premium,
            ...config.owner
        ].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
            .includes(senderJid) || botJid === senderJid;

        let quoted = m.quoted || m;

        if (quoted.mtype === 'buttonsMessage') {
            quoted = quoted[Object.keys(quoted)[1]];
        } else if (quoted.mtype === 'templateMessage') {
            quoted = quoted.hydratedTemplate?.[Object.keys(quoted.hydratedTemplate)[1]];
        } else if (quoted.mtype === 'product') {
            quoted = quoted[Object.keys(quoted)[0]];
        }

        const pushname = m.pushName || "No Name";

        let groupMetadata = null;
        let groupName = "";
        let participants = [];
        let groupAdmin = [];
        let botAdmin = false;
        let isAdmin = false;

        if (m.isGroup) {
            try {
                groupMetadata = await Ditss.groupMetadata(from);
                groupName = groupMetadata.subject || "";
                participants = groupMetadata.participants || [];
                groupAdmin = await getGroupAdm(participants);
                botAdmin = groupAdmin.includes(botJid);
                isAdmin = groupAdmin.includes(senderJid);
            } catch (error) {
                console.error('Error fetching group metadata:', error);
            }
        }

        const reply = (teks) => {
            Ditss.sendMessage(m.chat, {
                text: teks
            }, { quoted: m });
        };

        const time = moment().tz("Asia/Jakarta").format("HH:mm:ss");
        const todayDateWIB = new Date().toLocaleDateString('id-ID', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const RunTime = `_${runtime(process.uptime())}_`;

        const pickRandom = (arr) => {
            return arr[Math.floor(Math.random() * arr.length)];
        };

        console.log(util.inspect(m, { colors: true, depth: 1 }));

        const logItems = [
            `📅 ${chalk.cyan('Date')}    : ${todayDateWIB}`,
            `🕐 ${chalk.cyan('Time')}    : ${time}`,
            `💬 ${chalk.cyan('Type')}    : ${m.mtype}`,
            `🗣️ ${chalk.cyan('Sender')}  : ${pushname}`,
            `🤖 ${chalk.cyan('Bot')}     : ${botJid}`,
            `📝 ${chalk.cyan('Command')} : ${chalk.yellow(command)}`,
            `📋 ${chalk.cyan('Args')}    : ${args.length > 0 ? chalk.green(args.join(' ')) : chalk.gray('None')}`
        ];

        if (m.isGroup) {
            logItems.splice(3, 0, `🌐 ${chalk.cyan('Group')}   : ${groupName}`);
            logItems.splice(4, 0, `🔑 ${chalk.cyan('Chat ID')} : ${m.chat}`);
            logger.box(`📱 GROUP MESSAGE • ${groupName}`, '#3498db', logItems);
        } else {
            logger.box(`🔒 PRIVATE MESSAGE • ${pushname}`, '#9b59b6', logItems);
        }
                const plug = { text, args, isOwn, isPrem, CMD, command, reply
        }
        const handleData = plug
        
        if (CMD) {
            await handleMessage(m, command, handleData);
        }

        if (!Ditss.public && !CreatorOnly) {
            if (!isOwn) return;
        }

        switch (command) {
                
                
                                  case 'backup': {
  // if (isClone) return m.reply("hanya bot utama yang bisa");
    //if (!isCreator) return m.reply(ress.owner);

    switch (args[0]) {
case 'all': {
    try {
        m.reply('📦 Sedang mengumpulkan semua file untuk backup...');

        const ls = execSync("ls").toString().split("\n").filter((file) =>
            file !== "node_modules" &&
            file !== "package-lock.json" &&
            file !== "yarn.lock" &&
            file !== "jadibot" &&
            file !== "temp" &&
            file !== "tmp" &&
            file !== ""
        );

        console.log("🗂️ File yang akan dibackup:", ls);

        const escapedFiles = ls.map(file => `"${file}"`).join(" ");
        execSync(`zip -r Backup.zip ${escapedFiles}`, {
            maxBuffer: 1024 * 1024 * 1024 // 1GB
        });

        if (!fs.existsSync('./Backup.zip')) {
            return m.reply('❌ File ZIP tidak ditemukan, backup gagal.');
        }

        await Ditss.sendMessage(m.sender, {
            document: fs.readFileSync('./Backup.zip'),
            mimetype: "application/zip",
            fileName: `Backup_${new Date().toISOString().slice(0,10)}.zip`,
        });

        execSync("rm -rf Backup.zip");
        m.reply('✅ Backup selesai, file berhasil dikirim ke owner.');
    } catch (err) {
        console.error(err);
        m.reply('⚠️ Terjadi kesalahan saat proses backup.');
        
        try {
            execSync("rm -rf Backup.zip");
        } catch (e) {}
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
                    footer: `© Powered by Asuma`,
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
            default:
                if (budy.startsWith('=>') && isOwn) {
                    try {
                        const code = budy.slice(2);
                        const result = await eval(`(async () => { return ${code} })()`);
                        const formattedResult = util.format(result);
                        await m.reply(formattedResult);
                    } catch (error) {
                        await m.reply(`❌ Error:\n${error.message}`);
                    }
                }
                else if (budy.startsWith('>') && isOwn) {
                    try {
                        const code = budy.slice(1);
                        let evaled = await eval(code);
                        if (typeof evaled !== 'string') {
                            evaled = util.inspect(evaled, { depth: 1 });
                        }
                        await m.reply(evaled);
                    } catch (error) {
                        await m.reply(`❌ Error:\n${error.message}`);
                    }
                }
                else if (budy.startsWith('$') && isOwn) {
                    exec(budy.slice(1), (error, stdout, stderr) => {
                        if (error) {
                            return m.reply(`❌ Error:\n${error.message}`);
                        }
                        if (stderr) {
                            return m.reply(`⚠️ stderr:\n${stderr}`);
                        }
                        if (stdout) {
                            return m.reply(`📤 stdout:\n${stdout}`);
                        }
                        return m.reply('✅ Command executed (no output)');
                    });
                }
                break;
        }

    } catch (error) {
        console.error(chalk.red.bold('Error in message handler:'), error);
        if (m && m.chat) {
            try {
                await Ditss.sendMessage("0@s.whatsapp.net", {
                    text: `❌ Error occurred:\n${error.message}\n\nPlease contact the bot owner if this persists.`
                }, { quoted: m });
            } catch (sendError) {
                console.error('Failed to send error message:', sendError);
            }
        }
    }
}

const currentFile = new URL(import.meta.url).pathname;
fs.watchFile(currentFile, () => {
    fs.unwatchFile(currentFile);
    console.log(chalk.green(`✓ ${path.basename(currentFile)} updated! Reloading...`));
});