let swm = async (m, { conn: Ditss, quoted, text }) => {
  if (!quoted) return m.reply('❌ Balas stiker yang ingin dicuri watermarknya!')
  //if (!quoted.isSticker) return m.reply('❌ Itu bukan stiker!')
  if (!text) return m.reply('❌ Masukkan teks watermark!\nContoh: .swm Ditss Ganteng')

  try {
    const media = await Ditss.downloadAndSaveMediaMessage(quoted)
    if (!media) return m.reply('❌ Gagal mengunduh stiker!')

    const fs = await import('fs')
    const buffer = fs.readFileSync(media)

    await Ditss.sendSticker(m.chat, buffer, m, {
      packname: text.trim(),
      author: m.pushName
    })

    fs.unlinkSync(media)

   // m.reply(`✅ Berhasil mencuri stiker!\n\n✍️ Watermark diubah menjadi:\n*${text.trim()}*`)
  } catch (error) {
    m.reply(`❌ Gagal: ${error.message}`)
  }
}

swm.help = ['swm <teks> (reply sticker)']
swm.tags = ['sticker']
swm.command = ['swm', 'stealwm', 'curiwm']

export default swm
