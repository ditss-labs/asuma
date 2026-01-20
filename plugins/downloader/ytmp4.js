import axios from 'axios'

let ytmp4 = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🎬 *YouTube Video Downloader*\n\nContoh: ${usedPrefix + command} https://youtube.com/watch?v=... 720\nKualitas: 144, 240, 360, 480, 720, 1080`)
  }
  
  try {
    const [url, quality = '360'] = text.trim().split(' ')
    
    const validQualities = ['144', '240', '360', '480', '720', '1080']
    if (!validQualities.includes(quality)) {
      return m.reply(`❌ Kualitas tidak valid!\n\nKualitas tersedia: ${validQualities.join(', ')}p`)
    }
    
    const encodedUrl = encodeURIComponent(url)
    const apiUrl = `https://api.asuma.my.id/v1/download/youtube?url=${encodedUrl}&quality=${quality}`
    
    const response = await axios.get(apiUrl, { timeout: 45000 })
    const { status, creator, result } = response.data
    
    if (!status || !result?.download?.main) {
      return m.reply('❌ Gagal mendapatkan link download')
    }
    
    const processingMsg = await m.reply(`⏳ Mengunduh video ${quality}p...`)
    
    await Ditss.sendMessage(
      m.chat,
      {
        video: { url: result.download.main },
        mimetype: 'video/mp4',
        fileName: `${result.title.replace(/[^a-z0-9]/gi, '_')}_${quality}p.mp4`,
        caption: `🎬 *${result.title}*\n📺 ${quality}p • ${creator || 'Asuma API'}`
      },
      { quoted: m }
    )
    
    if (processingMsg) {
      await Ditss.sendMessage(m.chat, { delete: processingMsg.key })
    }
    
  } catch (error) {
    let errorMessage = '❌ Error: '
    
    if (error.code === 'ECONNABORTED') {
      errorMessage += 'Timeout'
    } else if (error.response?.status === 404) {
      errorMessage += 'Video tidak ditemukan'
    } else if (error.response?.status === 429) {
      errorMessage += 'Terlalu banyak request'
    } else if (error.message.includes('ENOTFOUND')) {
      errorMessage += 'API tidak dapat diakses'
    } else {
      errorMessage += error.message || 'Gagal memproses'
    }
    
    await m.reply(errorMessage)
  }
}

ytmp4.help = ['ytmp4 <url> [quality]']
ytmp4.tags = ['downloader', 'youtube']
ytmp4.command = ['ytmp4', 'ytvideo']
ytmp4.limit = 1

export default ytmp4
