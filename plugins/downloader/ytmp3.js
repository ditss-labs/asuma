import axios from 'axios'

let ytmp3 = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🎵 *Contoh:* ${usedPrefix + command} https://youtube.com/watch?v=...`)
  
  try {
    const encodedUrl = encodeURIComponent(text.trim())
    const apiUrl = `${global.api.domain}/v1/download/youtube?url=${encodedUrl}&quality=mp3`
    const response = await axios.get(apiUrl, {
      timeout: 90000 // 
    })
    if (!response.data?.status || !response.data?.result?.download?.main) {
      return m.reply('❌ Gagal mendapatkan link download.')
    }
    
    const data = response.data
    const result = data.result
    await Ditss.sendMessage(
      m.chat,
      {
        audio: { 
          url: result.download.main 
        },
        mimetype: 'audio/mpeg',
        fileName: `${(result.title || 'audio').replace(/[^\w\s]/gi, '')}.mp3`,
        ptt: false 
      },
      { quoted: m }
    )
    
  } catch (error) {
    console.error('[YTMP3 ERROR]', error)
    
    if (error.code === 'ECONNABORTED') {
      m.reply('❌ Timeout: Server terlalu lama merespons.')
    } else if (error.response?.status === 404) {
      m.reply('❌ Video tidak ditemukan atau URL tidak valid.')
    } else {
      m.reply('❌ Error: ' + (error.message || 'Gagal memproses'))
    }
  }
}

ytmp3.help = ['ytmp3 <url>']
ytmp3.tags = ['downloader', 'youtube']
ytmp3.command = ['ytmp3', 'ytaudio']
ytmp3.limit = 2

export default ytmp3
