import fetch from 'node-fetch'

let handler = async (m, { conn: Ditss, text }) => {
  if (!text) return m.reply('Masukkan nama!\n\nContoh:\n.cekfemboy adit')

  const nama = text.trim()
  const api = `${global.api.domain}/v1/fun/cekfemboy?nama=${encodeURIComponent(nama)}`

  let json
  try {
    const res = await fetch(api)
    json = await res.json()
  } catch (e) {
    return m.reply('❌ Gagal menghubungi API.')
  }

  if (!json?.status || !json?.data)
    return m.reply('❌ Data tidak ditemukan.')

  const d = json.data

  let teks = `🎀 *CEK FEMBOY* 🎀\n\n`
  teks += `👤 Nama : ${d.nama}\n`
  teks += `📊 Persentase : ${d.persentase}%\n`
  teks += `🏷️ Status : ${d.deskripsi}\n\n`
  teks += `💬 *Hasil:*\n${d.hasil}`

  await Ditss.sendMessage(
    m.chat,
    {
      image: { url: d.gif },
      caption: teks
    },
    { quoted: m }
  )
}

handler.command = ['cekfemboy', 'femboy']
handler.tags = ['fun']
handler.help = ['cekfemboy <nama>']

export default handler
