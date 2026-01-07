import axios from 'axios'

let spotify = async (m, { conn: Ditss, text, command }) => {
  if (!text) return m.reply(`Contoh:\n• ${command} https://open.spotify.com/track/...\n• ${command} disarankan di bandung`)

  await Ditss.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

  const isUrl = text.includes('open.spotify.com')
  const apiUrl = isUrl
    ? `https://api.asuma.my.id/v1/tools/spotify?url=${encodeURIComponent(text)}&download=false`
    : `https://api.asuma.my.id/v1/tools/spotify?query=${encodeURIComponent(text)}&download=false`

  try {
    const { data } = await axios.post(apiUrl, null, {
      timeout: 60000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })

    if (!data.status) return m.reply('❌ Gagal mengambil data Spotify')

    const { metadata, audio_base64 } = data.result
    if (!audio_base64) return m.reply('❌ Audio tidak tersedia')

    const audioBuffer = Buffer.from(audio_base64, 'base64')

    await Ditss.sendMessage(
      global.my.idch,
      {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        fileName: `${metadata.title.replace(/[^\w\s]/gi, '')}.mp3`,
        contextInfo: {
          externalAdReply: {
            title: metadata.title,
            body: metadata.artist,
            thumbnailUrl: metadata.cover,
            sourceUrl: metadata.url,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }
    )

    await Ditss.sendMessage(m.chat, { react: { text: "✅", key: m.key } })

  } catch (e) {
    await Ditss.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
    if (e.code === 'ECONNABORTED') {
      m.reply('❌ Timeout server')
    } else if (e.response) {
      m.reply(`❌ Error ${e.response.status}`)
    } else {
      m.reply(`❌ ${e.message}`)
    }
  }
}

spotify.help = ['spotify <url/query>']
spotify.tags = ['owner']
spotify.command = ['playch']
spotify.owner = true;
export default spotify
