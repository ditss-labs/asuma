import axios from 'axios'

let ytmp4 = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🎬 *Contoh:* ${usedPrefix + command} https://youtube.com/watch?v=... 720`)
  
  try {
    const [url, quality = '360'] = text.trim().split(' ')
    const downloadUrl = `https://api.nekolabs.web.id/downloader/youtube/v1?url=${encodeURIComponent(url)}&format=${quality}`
    
    const response = await axios.get(downloadUrl)
    
    if (!response.data?.success || !response.data?.result?.downloadUrl) {
      return m.reply('❌ Gagal mendapatkan link download.')
    }
    
    const videoInfo = response.data.result
    
    await Ditss.sendMessage(
      m.chat,
      {
        video: { url: videoInfo.downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${videoInfo.title}.mp4`,
        caption: `🎬 *${videoInfo.title}*\n⏱️ ${videoInfo.duration || 'Unknown'}\n📺 Kualitas: ${quality}p\n📁 Format: ${videoInfo.format || 'mp4'}`
      },
      { quoted: m }
    )
    
  } catch (error) {
    console.error('[YTMP4 ERROR]', error)
    m.reply('❌ Error: ' + error.message)
  }
}

ytmp4.help = ['ytmp4 <url> <quality>']
ytmp4.tags = ['downloader', 'youtube']
ytmp4.command = ['ytmp4', 'ytvideo']
ytmp4.limit = 1

export default ytmp4
