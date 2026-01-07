// settings.js (asumsikan ini sudah ES Module)
import '../config.js';

import fs from 'fs';
import pino from 'pino';
import chalk from 'chalk';
import path from 'path';
import { Boom } from '@hapi/boom';
import NodeCache from 'node-cache';
import { exec, spawn, execSync } from 'child_process';
import * as baileys from '@whiskeysockets/baileys';
const { 
    useMultiFileAuthState, 
    Browsers, 
    makeWASocket,
    DisconnectReason, 
    makeInMemoryStore, 
    makeCacheableSignalKeyStore,
    proto, 
    getAggregateVotesInPollMessage 
} = baileys;

import { smsg, GroupParticipantsUpdate } from './myfunction.js';

global.client = {};

const msgRetryCounterCache = new NodeCache();
const groupCache = new NodeCache({ stdTTL: 5 * 60, useClones: false });

async function JadiBot(conn, from, m, store) {
    async function startJadiBot() {
        try {
            const { state, saveCreds } = await useMultiFileAuthState(`./database/jadibot/${from}`);      
            const getMessage = async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id);
                    return msg?.message || ''
                }
                return {
                    conversation: 'Halo Saya Adalah Bot'
                }
            }
            
            const usePairingCode = true; // Atau sesuai kebutuhan
            
            client[from] = makeWASocket({
                logger: pino({ level: "silent" }),
                printQRInTerminal: !usePairingCode,
                auth: state,
                browser: ["Ubuntu", "Chrome", "20.0.04"],
                markOnlineOnConnect: false,
                syncFullHistory: false,
                fireInitQueries: false,
                connectTimeoutMs: 60000,
                keepAliveIntervalMs: 30000,
                defaultQueryTimeoutMs: 60000,
                transactionOpts: { 
                    maxCommitRetries: 3, 
                    delayBetweenTriesMs: 2000 
                },
                // Tambahkan opsi yang masih diperlukan dari kode asli
                getMessage,
                maxMsgRetryCount: 15,
                msgRetryCounterCache,
                retryRequestDelayMs: 10,
                cachedGroupMetadata: async (jid) => groupCache.get(jid),
                appStateMacVerification: {
                    patch: true,
                    snapshot: true,
                },
            })
            
            //await Solving(client[from], store)
            
            client[from].pairingStarted = false;
            
            client[from].ev.on('creds.update', saveCreds)
            
            client[from].ev.on('connection.update', async (update) => {
                const { connection, lastDisconnect, receivedPendingNotifications } = update
                if (connection === 'connecting' && !client[from].authState.creds.registered && !client[from].pairingStarted) {
                    setTimeout(async () => {
                        client[from].pairingStarted = true;
                        exec('rm -rf ./database/jadibot/' + from + '/*');
                        let code = await client[from].requestPairingCode(from.replace(/[^0-9]/g, ''));
                        m.reply(`Your Pairing Code : ${code?.match(/.{1,4}/g)?.join('-') || code}`);
                    }, 3000);
                }
                if (connection === 'close') {
                    const reason = new Boom(lastDisconnect?.error)?.output.statusCode
                    console.log(reason)
                    if ([DisconnectReason.connectionLost, DisconnectReason.connectionClosed, DisconnectReason.restartRequired, DisconnectReason.timedOut, DisconnectReason.badSession, DisconnectReason.connectionReplaced].includes(reason)) {
                        JadiBot(conn, from, m, store)
                    } else if (reason === DisconnectReason.loggedOut) {
                        m.reply('Scan again and Run...');
                        StopJadiBot(conn, from, m)
                    } else if (reason === DisconnectReason.Multidevicemismatch) {
                        m.reply('Scan again...');
                        StopJadiBot(conn, from, m)
                    } else {
                        m.reply('Anda Sudah Tidak Lagi Menjadi Bot!')
                    }
                }
                if (connection == 'open') {
                 let botNumber = client[from].user.id.split(':')[0] + '@s.whatsapp.net';
                    if (db.set[botNumber] && !db.set[botNumber]?.join) {
                        db.set[botNumber].original = false
                        if (my.ch.length > 0 && my.ch.includes('@newsletter')) {
                            if (my.ch) await client[from].newsletterMsg(my.ch, { type: 'follow' }).catch(e => {})
                            db.set[botNumber].join = true
                        }
                    }
                }
                if (receivedPendingNotifications == 'true') {
                    client[from].ev.flush()
                }
            });
            
            client[from].ev.on('contacts.update', (update) => {
                for (let contact of update) {
                   let id = client[from].user.id.split(':')[0] + '@s.whatsapp.net';
                    if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
                }
            });
            
            client[from].ev.on('call', async (call) => {
                let botNumber = await client[from].decodeJid(client[from].user.id);
                if (db.set[botNumber].anticall) {
                    for (let id of call) {
                        if (id.status === 'offer') {
                            let msg = await client[from].sendMessage(id.from, { text: `Saat Ini, Kami Tidak Dapat Menerima Panggilan ${id.isVideo ? 'Video' : 'Suara'}.\nJika @${id.from.split('@')[0]} Memerlukan Bantuan, Silakan Hubungi Owner :)`, mentions: [id.from]});
                            await client[from].sendContact(id.from, global.owner, msg);
                            await client[from].rejectCall(id.id, id.from)
                        }
                    }
                }
            });
            
            client[from].ev.on('groups.update', (update) => {
                for (let n of update) {
                    if (store.groupMetadata[n.id]) {
                        groupCache.set(n.id, n);
                        Object.assign(store.groupMetadata[n.id], n);
                    }
                }
            });
            
            client[from].ev.on('group-participants.update', async (update) => {
                await GroupParticipantsUpdate(client[from], update, store, groupCache);
            });
            
           /* client[from].ev.on('messages.upsert', async (message) => {
                await MessagesUpsert(client[from], message, store, groupCache);
            })*/
            
              client[from].ev.on('messages.upsert', async (chatUpdate) => {
    try {
      let mek = chatUpdate.messages?.[0];
      if (!proto?.WebMessageInfo || !mek?.message || !mek.key) return;

      mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage')
        ? mek.message.ephemeralMessage.message
        : mek.message;

      if (mek.key?.remoteJid === 'status@broadcast') return;
      if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
      if (mek.key.id.startsWith('Pondaaa_')) return;

      const remoteJid = mek.key.remoteJid;
      global.store.messages[remoteJid] ??= {};
      global.store.messages[remoteJid].array ??= [];
      global.store.messages[remoteJid].keyId ??= new Set();

      if (!(global.store.messages[remoteJid].keyId instanceof Set)) {
        global.store.messages[remoteJid].keyId = new Set(global.store.messages[remoteJid].array.map(m => m.key.id));
      }

      if (global.store.messages[remoteJid].keyId.has(mek.key.id)) return;

      global.store.messages[remoteJid].array.push(mek);
      global.store.messages[remoteJid].keyId.add(mek.key.id);

      if (global.store.messages[remoteJid].array.length > (global.chatLength || 250)) {
        const removed = global.store.messages[remoteJid].array.shift();
        global.store.messages[remoteJid].keyId.delete(removed.key.id);
      }

      if (!global.store.groupMetadata || Object.keys(global.store.groupMetadata).length === 0) {
        global.store.groupMetadata = await client[from].groupFetchAllParticipating().catch(() => ({}));
      }

      const m = smsg(client[from], mek, global.store);
      const { default: handlemsg } = await import('../WhatsApp.js');
      handlemsg(client[from], m, chatUpdate, global.store);

    } catch (err) {
      console.log(chalk.redBright("Error on messages.upsert:"), err);
    }
  });;
        
            return client[from]
        } catch (e) {
            console.log('Error di jadibot : ', e)
        }
    }
    return startJadiBot()
}

async function StopJadiBot(conn, from, m) {
    if (!Object.keys(client).includes(from)) {
        return conn.sendMessage(m.chat, { text: 'Anda Tidak Sedang jadibot!' }, { quoted: m })
    }
    try {
        client[from].end('Stop')
        client[from].ev.removeAllListeners()
    } catch (e) {
        console.log('Errornya di stopjadibot : ', e)
    }
    delete client[from]
    exec(`rm -rf ./database/jadibot/${from}`)
    return m.reply('Sukses Keluar Dari Sessi Jadi bot')
}

async function ListJadiBot(conn, m) {
    let teks = 'List Jadi Bot :\n\n'
    for (let jadibot of Object.values(client)) {
        teks += (jadibot.user?.id ? `- @${conn.decodeJid(jadibot.user.id).split('@')[0]}\n` : '')
    }
    return m.reply(teks)
}

export { JadiBot, StopJadiBot, ListJadiBot };
