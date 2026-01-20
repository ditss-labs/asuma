import axios from 'axios'

let playvideo = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Contoh: ${usedPrefix + command} cupid mv`)
  
  try {
    await m.reply("🔍 Mencari...")
    
    const searchUrl = `https://api.asuma.my.id/v1/search/youtube?q=${encodeURIComponent(text)}`
    const searchRes = await axios.get(searchUrl)
    
    if (!searchRes.data?.status || !searchRes.data?.results?.[0]) {
      return m.reply('❌ Tidak ditemukan')
    }
    
    const video = searchRes.data.results[0]
    
    const downloadUrl = `https://api.asuma.my.id/v1/download/youtube?url=${encodeURIComponent(video.url)}&quality=360`
    const downloadRes = await axios.get(downloadUrl)
    
    if (!downloadRes.data?.status || !downloadRes.data?.result?.download?.main) {
      return m.reply('❌ Gagal download video')
    }
    
    const videoUrl = downloadRes.data.result.download.main
    const title = downloadRes.data.result.title || video.title
    
    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl },
        caption: `🎬 ${title}`
      },
      { quoted: m }
    )
    
  } catch {
    m.reply('❌ Error')
  }
}

playvideo.help = ['playvideo <judul>']
playvideo.tags = ['downloader']
playvideo.command = ['playvideo', 'playvid']
playvideo.limit = 2

export default playvideo
