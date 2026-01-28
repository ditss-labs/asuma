import axios from 'axios'

let play = async (m, { conn:Ditss, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Contoh: ${usedPrefix + command} cupid`)
  
  try {
    await m.reply("🔍 Mencari...")
    
    const searchUrl = `${global.api.domain}/v1/search/youtube?q=${encodeURIComponent(text)}`
    const searchRes = await axios.get(searchUrl)
    
    if (!searchRes.data?.status || !searchRes.data?.results?.[0]) {
      return m.reply('❌ Tidak ditemukan')
    }
    
    const video = searchRes.data.results[0]
    
    const durationMatch = video.duration.match(/\d+/)
    const durationSeconds = durationMatch ? parseInt(durationMatch[0]) : 0
    if (durationSeconds > 600) return m.reply('❌ Lagu terlalu panjang')
    
    const downloadUrl = `${global.api.domain}/v1/download/youtube?url=${encodeURIComponent(video.url)}&quality=mp3`
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
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
        contextInfo: {
          forwardingScore: 100000,
          isForwarded: true,
          externalAdReply: {
            showAdAttribution: false,
            containsAutoReply: true,
            mediaType: 1,
            renderLargerThumbnail: true,
            title: title,
            body: `Duration: ${video.duration || video.duration || 'Unknown'}`,
            previewType: 'PHOTO',
            thumbnailUrl: downloadRes.data.result.cover || audioInfo.cover || video.thumbnail || 'https://telegra.ph/file/7d72a6f513123a113617a.jpg',
          },
        },
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
