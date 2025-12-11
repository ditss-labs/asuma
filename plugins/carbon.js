import axios from 'axios';

let carbon = async (m, { conn: Ditss, text, command, reply, usedPrefix }) => {
  if (!text) return reply(`⚠️ Contoh penggunaan:\n${usedPrefix + command} DitssGanteng`);
  if (text.length > 500) return reply("⚠️ Karakter terbatas, maksimal 500!");
  
  await reply("⏳ Tunggu sebentar, sedang diproses...");

  try {
    let { data } = await axios.post(
      `https://ditss.vercel.app/api/maker/carbon`,
      {
        code: text,
        apikey: 'DitssGanteng' 
      },
      { responseType: 'arraybuffer' }
    );

    await Ditss.sendSticker(m.chat, Buffer.from(data), m, {
      packname: text,
      author: `asuma md - powered by ${global.info.nama_owner}`,
    });
  } catch (err) {
    console.error(err);
    reply("❌ Gagal membuat stiker. Coba lagi nanti.");
  }
};

carbon.help = ["carbon"];
carbon.tags = ["sticker", "fun"];
carbon.command = ["carbon"];
carbon.limit = 1;

export default carbon;