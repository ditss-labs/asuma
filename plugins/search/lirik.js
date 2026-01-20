import fetch from 'node-fetch'

let lyrics = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🎵 *Lyrics Search*\n\nContoh: ${usedPrefix + command} rumah ke rumah`)
  }
  
  try {
    const apiUrl = `https://api-faa.my.id/faa/lyrics?q=${encodeURIComponent(text)}`
    const response = await fetch(apiUrl)
    const api = await response.json()
    
    if (!api.result) {
      return m.reply('❌ Lirik tidak ditemukan')
    }
    
    const { cover, title, artist, album, lyrics } = api.result
    const foto = cover.large
    
    const teks = `🎵 *${title}*\n👤 ${artist}\n💿 ${album || 'N/A'}\n\n${lyrics}`
    
    await Ditss.sendMessage(
      m.chat,
      {
        image: { url: foto },
        caption: teks
      },
      { quoted: m }
    )
    
  } catch (error) {
    m.reply('❌ Error: Gagal mengambil lirik')
  }
}

lyrics.help = ['lyrics <judul lagu>']
lyrics.tags = ['search']
lyrics.command = ['lyrics', 'lirik']
lyrics.limit = 2

export default lyrics
