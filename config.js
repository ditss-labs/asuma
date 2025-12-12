import chalk from 'chalk';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// system 
global.autogempa = false
global.pairingQr = true



global.owner = "6281513607731"
global.info = {
    owner: [global.owner],
    namabot: 'asuma - md',
    nama_owner: 'ditss.'
};
global.limit = {
	free: 35,
	premium: 999,
	vip: 99999
}

global.user = {
    owner: 'ⓞ',       // Owner
    admin: 'Ⓐ',       // Admin
    premium: 'Ⓟ',     // Premium
    limit: 'Ⓛ',       // Limit
    vip: 'Ⓥ',         // VIP
    member: 'Ⓜ',      // Member
    guest: 'Ⓖ'        // Guest
}

global.my = {
  yt: "https://youtube.com/@paaditt?si=ElVYrC7CtH3ETTS6", // YouTube Channel
  web: "https://www.ditss.cloud", // Website Utama
  ig: "https://www.instagram.com/dits.v2?igsh=NmE3Mmt0MWRmc2Uz", // Instagram
  tt: "https://www.tiktok.com/@paadit?_t=ZS-8v3k5dYzrho&_r=1", // TikTok
  gh: "https://github.com/ditss-dev", // GitHub
  ch: "https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L", // WhatsApp Channel
  gc: "https://chat.whatsapp.com/IEGSv0bv5gC2etNuXJajd0", // Grup Bot
  idgc: "120363179230732743@g.us", // ID grup
  idch: "120363314209665405@newsletter", // ID channel
  idch2: "120363302356434279@newsletter"
}

global.money = {
	free: 10000,
	premium: 1000000,
	vip: 10000000
}

global.api = {
    ditss: "https://ditss.vercel.app",
    example: "https://example.com/api"
};
global.ress = {
    key: 'Apikey Anda telah habis',
    owner: `${global.user?.owner || 'ⓞ'} Fitur Khusus Owner!`,
    admin: `${global.user?.admin || 'Ⓐ'} Fitur Khusus Admin!`,
    BotAdmin: 'Bot Bukan Admin!',
    ingroup: 'Gunakan di Group!',
    private: 'Gunakan di Privat Chat!',
    limit: `${global.user?.limit || 'Ⓛ'} Limit Anda Telah Habis!`,
    premium: `${global.user?.premium || 'Ⓟ'} Khusus User Premium!`,
    wait: 'Loading...',
    error: 'Error!',
    done: 'Done'
}


//db
global.tempatDB = 'database.json' // Taruh url mongodb di sini jika menggunakan mongodb. Format : 'mongodb+srv://...'
global.tempatStore = 'baileys_store.json' // Taruh url mongodb di sini jika menggunakan mongodb. Format : 'mongodb+srv://...'

// Hot reload opsional
fs.watchFile(__filename, () => {
    fs.unwatchFile(__filename);
    console.log(chalk.redBright(`Config diperbarui: ${__filename}`));
    import(`${import.meta.url}?update=${Date.now()}`)
        .then(() => console.log('Config berhasil reload!'))
        .catch(err => console.error('Gagal reload config:', err));
});
