import axios from 'axios';

let pakustadz = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  if (!text) return m.reply(`✏️ Contoh penggunaan:\n${usedPrefix + command} Assalamualaikum`);
  if (text.length > 500) return m.reply('❌ Teks terlalu panjang. Maksimal 500 karakter.');

  await m.react("📖");
  
  try {
    const version = Math.random() > 0.5 ? 'v1' : 'v2';
    const apiUrl = `${global.api.domain}/${version}/maker/pakustadz?apikey=demo&teks=${encodeURIComponent(text)}`;
    
    const response = await axios.post(apiUrl, null, {
      responseType: 'arraybuffer',
      timeout: 60000
    });

    const buffer = Buffer.from(response.data);

    await Ditss.sendMessage(
      m.chat,
      {
        image: buffer,
        caption: `✅ Berhasil! (Version: ${version.toUpperCase()})`
      },
      { quoted: m }
    );
    
    await m.react("✅");

  } catch (e) {
    console.error(e);
    
    if (e.response?.status === 401 || e.response?.status === 403) {
      m.reply('❌ API key tidak valid.');
    } else if (e.response?.status === 400) {
      m.reply('❌ Teks tidak boleh kosong.');
    } else if (e.code === 'ECONNABORTED') {
      m.reply('❌ Timeout. Server terlalu lama merespons.');
    } else {
      m.reply('❌ Gagal membuat gambar.');
    }
  }
}

pakustadz.help = ['pakustadz <teks>'];
pakustadz.tags = ['islami', 'image', 'fun'];
pakustadz.command = ['pakustadz', 'ustadz', 'ustad', 'kyai'];
pakustadz.limit = 1;

export default pakustadz;
