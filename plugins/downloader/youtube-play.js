import axios from 'axios'

let play = async (m, { conn:Ditss, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Contoh: ${usedPrefix + command} cupid`)
  
  try {
    await m.reply("🔍 Mencari...")
    
    const searchUrl = `https://api.asuma.my.id/v1/search/youtube?q=${encodeURIComponent(text)}`
    const searchRes = await axios.get(searchUrl)
    
    if (!searchRes.data?.status || !searchRes.data?.results?.[0]) {
      return m.reply('❌ Tidak ditemukan')
    }
    
    const video = searchRes.data.results[0]
    
    const durationMatch = video.duration.match(/\d+/)
    const durationSeconds = durationMatch ? parseInt(durationMatch[0]) : 0
    if (durationSeconds > 600) return m.reply('❌ Lagu terlalu panjang')
    
    const downloadUrl = `https://api.asuma.my.id/v1/download/youtube?url=${encodeURIComponent(video.url)}&quality=mp3`
    const downloadRes = await axios.get(downloadUrl)
    
    if (!downloadRes.data?.status || !downloadRes.data?.result?.download?.main) {
      return m.reply('❌ Gagal download audio')
    }
    
    const audioUrl = downloadRes.data.result.download.main
    const title = downloadRes.data.result.title || video.title
    
    await Ditss.sendMessage(
    m.chat,
    {
      audio: { url: audioUrl },
      mimetype: 'audio/ogg; codecs=opus',
    },
    { quoted: m }
  )
    
  } catch {
    m.reply('❌ Error')
  }
}

play.help = ['play <judul lagu>']
play.tags = ['downloader']
play.command = ['play', 'song']
play.limit = 3

export default play
