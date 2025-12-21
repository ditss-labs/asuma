import fs from 'fs'

let handler = async (m, { conn: Ditss, text }) => {
  let quoted = m.quoted
  if (!quoted) {
    return m.reply('Reply foto / video / audio *View Once* untuk mengambil.')
  }

  let mime = quoted.mimetype || ''
  let mediaType = ''

  if (/image/.test(mime)) mediaType = 'image'
  else if (/video/.test(mime)) mediaType = 'video'
  else if (/audio/.test(mime)) mediaType = 'audio'

  if (!mediaType) {
    return m.reply('❌ Media tidak didukung! (gambar / video / audio)')
  }

  let mediaPath
  try {
    mediaPath = await Ditss.downloadAndSaveMediaMessage(quoted)
  } catch (e) {
    console.error('[RVO ERROR]', e)
    return m.reply('❌ Gagal mendownload media.')
  }

  let messageOptions = {}

  if (mediaType === 'audio') {
    messageOptions.audio = { url: mediaPath }
    messageOptions.mimetype = 'audio/mp4'
    messageOptions.ptt = true
  } else {
    messageOptions[mediaType] = { url: mediaPath }
    if (text) messageOptions.caption = text
  }

  // ❌ TANPA contextInfo
  await Ditss.sendMessage(m.chat, messageOptions, { quoted: m })

  if (mediaPath && fs.existsSync(mediaPath)) {
    fs.unlinkSync(mediaPath)
  }
}

handler.command = ['rvo', 'readviewonce', 'readvo']
handler.tags = ['tools']
handler.help = ['rvo']

export default handler
