import axios from 'axios';

let bokep = async (m, { conn: Ditss }) => {
  try {
    await Ditss.sendMessage(m.chat, {
      react: { text: '⏳', key: m.key }
    });

    const apiUrl = `${global.api.domain}/v2/nsfw/bkp`;

    const response = await axios.post(apiUrl, {
      responseType: 'arraybuffer',
      timeout: 90000
    });

    await Ditss.sendMessage(
      m.chat,
      {
        video: Buffer.from(response.data),
        mimetype: 'video/mp4',
        caption: '😋'
      },
      { quoted: m }
    );

  } catch (err) {
    console.error('[BOKEP ERROR]', err);
    await m.reply('❌ Gagal mengambil video dari API.');
  }
};

bokep.help = ['dosa tanggung sendiri'];
bokep.tags = ['nsfw'];
bokep.command = ['bokep'];
bokep.nsfw = true;
export default bokep;
