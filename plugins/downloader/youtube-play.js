import axios from 'axios'

let play = async (m, { conn: Ditss, usedPrefix, text, command, reply }) => {
  if (!text) {
    return m.reply('What song do you want to play? *Example*: .play cupid')
  }
  
  try {
    await m.reply("bentar bang")
    
    // Search YouTube - Response: {status, results: []}
    const searchUrl = `https://api.asuma.my.id/v1/search/youtube?q=${encodeURIComponent(text)}&apikey=demo`
    const resSearch = await axios.get(searchUrl)
    
    // Perhatikan: results bukan result
    if (!resSearch.data?.status || !resSearch.data?.results?.[0]) {
      console.log('Response Asuma:', resSearch.data)
      return m.reply('Tidak ditemukan hasil pencarian.')
    }
    
    const video = resSearch.data.results[0]  // <-- PAKAI 'results' bukan 'result'
    console.log('Video found:', video.title)
    
    // Pastikan video memiliki 'id' (bukan playlist)
    if (!video.id || video.url.includes('playlist')) {
      return m.reply('Video tidak valid atau playlist. Cari lagu lain.')
    }
    
    // Filter durasi maksimal 10 menit (600 detik)
    const durationMatch = video.duration.match(/\d+/)
    const durationSeconds = durationMatch ? parseInt(durationMatch[0]) : 0
    
    if (durationSeconds > 600) {
      return m.reply(`Lagu terlalu panjang (${Math.round(durationSeconds/60)} menit). Maksimal 10 menit.`)
    }
    
    // Download MP3 from nekolabs
    const downloadUrl = `https://api.nekolabs.web.id/downloader/youtube/v1?url=${encodeURIComponent(video.url)}&format=mp3`
    const resDownload = await axios.get(downloadUrl)
    const result = resDownload.data
    
    // Sesuaikan dengan struktur response nekolabs
    if (!result.success || !result.result) {
      return m.reply(result.message || 'Gagal mengambil data MP3.')
    }
    
    const audioInfo = result.result
    
    if (!audioInfo.downloadUrl) {
      return m.reply('Link download tidak tersedia.')
    }
    
    // Kirim audio
    await Ditss.sendMessage(
      m.chat,
      {
        audio: { url: audioInfo.downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${audioInfo.title || video.title}.mp3`,
        contextInfo: {
          forwardingScore: 100000,
          isForwarded: true,
          externalAdReply: {
            showAdAttribution: false,
            containsAutoReply: true,
            mediaType: 1,
            renderLargerThumbnail: true,
            title: audioInfo.title || video.title,
            body: `Duration: ${audioInfo.duration || video.duration || 'Unknown'}`,
            previewType: 'PHOTO',
            thumbnailUrl: audioInfo.cover || video.thumbnail || 'https://telegra.ph/file/7d72a6f513123a113617a.jpg',
          },
        },
      },
      { quoted: m }
    )
    
    // React
    await Ditss.sendMessage(m.chat, {
      react: { text: '✅', key: m.key },
    })

  } catch (error) {
    console.error('[PLAY ERROR]', error)
    m.reply('Terjadi kesalahan: ' + error.message)
  }
}

// 🏷️ Metadata plugin
play.help = ['play <judul lagu>']
play.tags = ['downloader']
play.command = ['play']
play.limit = 3

export default play
