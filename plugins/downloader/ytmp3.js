import axios from 'axios'

let ytmp3 = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🎵 *Contoh:* ${usedPrefix + command} https://youtube.com/watch?v=...`)
  
  try {
    const url = text.trim()
    const downloadUrl = `https://api.nekolabs.web.id/downloader/youtube/v1?url=${encodeURIComponent(url)}&format=mp3`
    
    const response = await axios.get(downloadUrl)
    
    if (!response.data?.success || !response.data?.result?.downloadUrl) {
      return m.reply('❌ Gagal mendapatkan link download.')
    }
    
    const audioInfo = response.data.result
    
    await Ditss.sendMessage(
      m.chat,
      {
        audio: { url: audioInfo.downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${audioInfo.title}.mp3`,
        caption: `🎵 *${audioInfo.title}*\n⏱️ ${audioInfo.duration || 'Unknown'}\n📁 Format: ${audioInfo.format || 'mp3'}`
      },
      { quoted: m }
    )
    
  } catch (error) {
    console.error('[YTMP3 ERROR]', error)
    m.reply('❌ Error: ' + error.message)
  }
}

ytmp3.help = ['ytmp3 <url>']
ytmp3.tags = ['downloader', 'youtube']
ytmp3.command = ['ytmp3', 'ytaudio']
ytmp3.limit = 2

export default ytmp3
