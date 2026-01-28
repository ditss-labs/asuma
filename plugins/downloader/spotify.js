import axios from 'axios'

let spotify = async (m, { conn: Ditss, text, command }) => {
  if (!text) return m.reply(`Contoh:\n• ${command} https://open.spotify.com/track/...\n• ${command} disarankan di bandung`)
  
  await Ditss.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })
  
  const isUrl = text.includes('open.spotify.com')
  const apiUrl = isUrl 
    ? `${global.api.domain}/v1/tools/spotify?url=${encodeURIComponent(text)}&download=false`
    : `${global.api.domain}/v1/tools/spotify?query=${encodeURIComponent(text)}&download=false`
  
  try {
    const response = await axios.post(apiUrl, {
      timeout: 60000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    
    const data = response.data
    
    if (!data.status) {
      return m.reply('❌ Gagal mengambil data dari Spotify')
    }
    
    const { metadata, audio_base64 } = data.result
    
    const info = `🎵 *SPOTIFY DOWNLOADER*
───────────────────────
🎶 *Judul:* ${metadata.title}
👤 *Artis:* ${metadata.artist}
⏱️ *Durasi:* ${metadata.duration}
🔗 *URL:* ${metadata.url}`
    
    await Ditss.sendMessage(
  m.chat,
  {
    text: `🎵 *SPOTIFY DOWNLOADER*
───────────────────────
🎶 *Judul:* ${metadata.title}
👤 *Artis:* ${metadata.artist}
⏱️ *Durasi:* ${metadata.duration}
🔗 *URL:* ${metadata.url}`,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterName: `ASUMA MUSIC`,
        newsletterJid: global.my.idch
      },
      externalAdReply: {
        title: metadata.title,
        body: metadata.artist,
        thumbnailUrl: metadata.cover,
        sourceUrl: metadata.url,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  },
  { quoted: m }
)
    if (audio_base64) {
      const audioBuffer = Buffer.from(audio_base64, 'base64')
      
      await Ditss.sendMessage(m.chat, {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        fileName: `${metadata.title.replace(/[^\w\s]/gi, '')}.mp3`
      }, { quoted: m })
      
      await Ditss.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
    } else {
      await m.reply('❌ Audio tidak tersedia')
    }
    
  } catch (error) {
    await Ditss.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
    
    if (error.code === 'ECONNABORTED') {
      m.reply('❌ Timeout: Server terlalu lama merespon')
    } else if (error.response) {
      m.reply(`❌ Error ${error.response.status}: ${error.response.data?.message || 'Gagal fetch data'}`)
    } else {
      m.reply(`❌ Error: ${error.message}`)
    }
  }
}

spotify.help = ['spotify <url/query>']
spotify.tags = ['downloader', 'music']
spotify.command = ['spotify', 'Spotify', 'Spotifyplay']

export default spotify
