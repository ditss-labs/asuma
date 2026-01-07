import fetch from 'node-fetch'

let handler = async (m, { conn: Ditss, text }) => {
  try {
    if (!text) return m.reply('Contoh: .igstory jkt48.freya')

    const username = text.replace('@', '').trim()
    const api = `https://api.asuma.my.id/v1/downloader/igstory?apikey=demo&username=${encodeURIComponent(username)}`

    const res = await fetch(api)
    const json = await res.json()

    if (!json.status || !json.data?.download_links?.length) {
      return m.reply('❌ Gagal mengambil story')
    }

    m.reply(`📸 Mengirim ${json.data.jumlah_story} story dari @${username}`)

    let no = 1
    for (const url of json.data.download_links) {

    
      const head = await fetch(url, { method: 'HEAD' })
      const type = head.headers.get('content-type') || ''

      const isVideo = type.includes('video')
      const isImage = type.includes('image')

      if (isVideo) {
        await Ditss.sendMessage(
          m.chat,
          {
            video: { url },
            caption: `🎬 Story ${no}/${json.data.jumlah_story}\n@${username}`
          },
          { quoted: m }
        )
      } else if (isImage) {
        await Ditss.sendMessage(
          m.chat,
          {
            image: { url },
            caption: `🖼️ Story ${no}/${json.data.jumlah_story}\n@${username}`
          },
          { quoted: m }
        )
      } else {
        await Ditss.sendMessage(
          m.chat,
          {
            document: { url },
            fileName: `story-${no}`,
            caption: `📁 Story ${no}/${json.data.jumlah_story}`
          },
          { quoted: m }
        )
      }

      no++
      await new Promise(r => setTimeout(r, 1200)) 
    }

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error saat mengambil story')
  }
}

handler.help = ['igstory']
handler.command = ['igstory']
handler.tags = ['downloader']

export default handler
