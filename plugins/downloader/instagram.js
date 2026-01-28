const delay = ms => new Promise(res => setTimeout(res, ms))

let handler = async (m, { conn: Ditss, text }) => {
  if (!text)
    return m.reply(
      'Masukkan link Instagram!\n\nContoh:\n.ig https://www.instagram.com/p/xxxx/'
    )

  if (!/instagram\.com/.test(text))
    return m.reply('❌ Itu bukan link Instagram.')

  const apiBase = `${global.api.domain}/v1/downloader/igpost?apikey=${global.api.key}url=`
  const apiUrl = apiBase + encodeURIComponent(text)

  let json = null
  let success = false
  for (let i = 1; i <= 3; i++) {
    try {
      let res = await fetch(apiUrl)
      let data = await res.json()

      if (data?.status && data?.data) {
        json = data
        success = true
        break 
      }
    } catch (e) {
      console.log(`[IGDL] percobaan ke-${i} gagal`)
    }

    if (i === 3) {
      return m.reply('❌ Gagal mengambil data Instagram (3x percobaan).')
    }
  }

  if (!success) return

  const data = json.data
  const type = data.contentType
  let info = `📸 *Instagram ${type.toUpperCase()}*\n`
  info += `👤 ${data.username}\n`
  if (data.caption) info += `📝 ${data.caption}\n`
  info += `❤️ ${data.likes}  💬 ${data.comments}\n`
  info += `⏱ ${data.postedAgo}`

  await m.reply(info)
  if (type === 'image' || type === 'slide') {
    let urls = data.mediaUrls || []

    if (!urls.length)
      return m.reply('❌ Media tidak ditemukan.')

    for (let url of urls) {
      await Ditss.sendMessage(
        m.chat,
        { image: { url } },
        { quoted: m }
      )
      await delay(2000) 
    }
    return
  }
  if (type === 'video') {
    if (!data.videoUrl)
      return m.reply('❌ Video tidak ditemukan.')

    await Ditss.sendMessage(
      m.chat,
      { video: { url: data.videoUrl } },
      { quoted: m }
    )
    return
  }

  m.reply('❌ Tipe konten tidak dikenali.')
}

handler.command = ['ig', 'igdl']
handler.tags = ['downloader']
handler.help = ['ig <link instagram>']

export default handler
