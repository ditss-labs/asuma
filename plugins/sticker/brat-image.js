import axios from 'axios';

let brat = async (m, { conn: Ditss, text, command, reply, usedPrefix }) => {
  if (!text) return reply(`⚠️ Contoh penggunaan:\n${usedPrefix + command} DitssGanteng`);
  if (text.length > 250) return reply("⚠️ Karakter terbatas, maksimal 250!");
  
  await m.react("🐱")
  try {
    let res = await axios.post(
      `${global.api.domain}/v2/maker/brat?apikey=${global.api.key}&text=${encodeURIComponent(text)}`,
      null,
      {
        responseType: 'arraybuffer'
      }
    );

    let buffer = Buffer.from(res.data);

    await Ditss.sendSticker(m.chat, buffer, m, {
      packname: text,
      author: `asuma multi device - ${m.pushName}`,
    });
  } catch (err) {
    console.error(err);
    if (err.response?.status === 403) {
      reply("❌ API Key 'demo' tidak valid. Cek settings.json server Anda");
    } else if (err.response) {
      reply(`❌ Error ${err.response.status}: ${err.response.statusText}`);
    } else if (err.request) {
      reply("❌ Tidak bisa terhubung ke server");
    } else {
      reply("❌ Gagal membuat stiker. Coba lagi nanti.");
    }
  }
};

brat.help = ["brat"];
brat.tags = ["sticker", "fun"];
brat.command = ["brat", "bratt"];
brat.limit = 2;

export default brat;
