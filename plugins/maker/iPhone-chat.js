import axios from 'axios';

let iqc = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  if (!text) return m.reply(`📱 Contoh penggunaan:\n${usedPrefix + command} Hello world`);
  if (text.length > 500) return m.reply('❌ Teks terlalu panjang. Maksimal 500 karakter.');

  await m.react("💬");
  
  try {
    const API_KEY = `${global.api.key}`;
    const apiUrl = `${global.api.domain}/v2/maker/imessage?apikey=${API_KEY}&text=${encodeURIComponent(text)}`;
    
    const response = await axios.get(apiUrl, {
      responseType: 'arraybuffer',
      timeout: 30000
    });

    const buffer = Buffer.from(response.data);

    await Ditss.sendMessage(
      m.chat,
      {
        image: buffer,
        caption: `💬 iMessage: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`
      },
      { quoted: m }
    );
    
    await m.react("✅");

  } catch (e) {
    console.error('❌ Error iqc:', e.message);
    
    if (e.response?.status === 401 || e.response?.status === 403) {
      m.reply('❌ API key tidak valid atau dibutuhkan.');
    } else if (e.response?.status === 400) {
      m.reply('❌ Format request salah.');
    } else if (e.code === 'ECONNABORTED') {
      m.reply('❌ Timeout: Server terlalu lama merespons.');
    } else {
      m.reply('❌ Gagal membuat iPhone chat.');
    }
  }
}

iqc.help = ['iqc <teks>'];
iqc.tags = ['maker', 'fun', 'image'];
iqc.command = ['iqc', 'imessage', 'iphonechat', 'ichat'];
iqc.limit = 1;

export default iqc;
