let sticker = async (m, { conn: Ditss, quoted }) => {
  if (!quoted) return m.reply('Kirim atau balas media (gambar/video) dengan caption .sticker')
  
  //if (!/image|video/gi.test(quoted.mime)) return m.reply('Kirim atau balas media (gambar/video)')
  if (/video/gi.test(quoted.mime) && quoted.seconds > 15) return m.reply('Durasi video maksimal 15 detik!')
  
  try {
    const image = await Ditss.downloadAndSaveMediaMessage(quoted)
    if (!image) return m.reply('Gagal mengunduh media!')
    
    const pushname = m.pushName || 'User'
    const salam = ['Selamat pagi', 'Selamat siang', 'Selamat sore', 'Selamat malam'][Math.floor(Math.random() * 4)]
    
    await Ditss.sendSticker(m.chat, image, m, {
      packname: `stiker maker\ncreate by: ${pushname}  ${salam}`,
      author: global.namabot
    })
    
    const fs = await import('fs')
    if (fs.existsSync(image)) fs.unlinkSync(image)
    
  } catch (e) {
    m.reply('Gagal membuat stiker.')
  }
}

sticker.help = ['sticker [reply image/video]']
sticker.tags = ['sticker']
sticker.command = ['sticker', 's', 'stiker']

export default sticker
