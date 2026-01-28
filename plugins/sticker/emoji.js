let emoji = async (m, { conn: Ditss, usedPrefix, args, reply }) => {
    if (!args[0]) return reply(`Example: ${usedPrefix}emoji 🐶`);

    try {
        const emojiChar = encodeURIComponent(args[0]);
        const url = `${global.api.domain}/v1/tools/emoji?emoji=${emojiChar}&apikey=${global.api.key}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Gagal mendapatkan emoji');
        const buffer = await res.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);
        await Ditss.sendSticker(m.chat, image, m, { 
    packname: info.namabot,
    author: m.pushName
});
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat membuat emoji, gunakan 1 emoji');
    }
}

emoji.help = ['emoji']
emoji.tags = ['tools']
emoji.command = ['emoji']
emoji.limit = 1;

export default emoji;
