import fetch from 'node-fetch'

let handler = async (m, { conn: Ditss, text }) => {
  if (!text)
    return m.reply(
      'Masukkan link Alight Motion!\n\nContoh:\n.am https://alightcreative.com/am/share/...'
    )

  const url = text.trim()
  const api = `${global.api.domain}/v1/tools/alightmotion?url=${encodeURIComponent(url)}`

  let json
  try {
    const res = await fetch(api)
    json = await res.json()
  } catch (e) {
    return m.reply('❌ Gagal menghubungi API.')
  }

  if (!json?.status || !json?.result?.info)
    return m.reply('❌ Gagal mengambil data Alight Motion.')

  const info = json.result.info

  let teks = `🎬 *ALIGHT MOTION PROJECT*\n\n`
  teks += `📌 *Judul* : ${info.title}\n`
  teks += `📱 Platform : ${info.amPlatform}\n`
  teks += `🧩 Versi AM : ${info.amVersionString}\n`
  teks += `📦 Package : ${info.amPackageId}\n`
  teks += `📥 Downloads : ${info.downloads}\n`
  teks += `❤️ Likes : ${info.likes}\n`
  teks += `📏 Size : ${(info.size / 1024 / 1024).toFixed(2)} MB\n`
  teks += `🗂 Project : ${info.projects?.length || 0}\n\n`

  if (info.projects?.length) {
    teks += `🧱 *Daftar Project*\n`
    teks += info.projects
      .map((p, i) => `${i + 1}. ${p.title} (${p.type})`)
      .join('\n')
    teks += `\n\n`
  }

  if (info.requiredEffects?.length) {
    teks += `✨ *Required Effects* (${info.requiredEffects.length})\n`
    teks += info.requiredEffects.slice(0, 10).map(v => `• ${v}`).join('\n')
    if (info.requiredEffects.length > 10)
      teks += `\n...dan ${info.requiredEffects.length - 10} lainnya`
  }

  await Ditss.sendMessage(
    m.chat,
    {
      image: { url: info.largeThumbUrl || info.medThumbUrl },
      caption: teks
    },
    { quoted: m }
  )
}

handler.command = ['am', 'alight', 'alightmotion']
handler.tags = ['tools']
handler.help = ['am <link alight motion>']

export default handler
