let getBio = async (m, { conn:Ditss, args }) => {
  const delay = ms => new Promise(res => setTimeout(res, ms))

  let jids = []
  if (m.mentionedJid?.length) {
    jids.push(...m.mentionedJid)
  }
  for (let a of args) {
    let num = a.replace(/[^0-9]/g, '')
    if (num.length > 5) {
      jids.push(num + '@s.whatsapp.net')
    }
  }

  jids = [...new Set(jids)]

  if (!jids.length) {
    return m.reply(
`❌ Masukkan nomor atau tag

Contoh:
.getbio 628xxx 628yyy
.getbio @user`
    )
  }

  let teks = '📌 *BIO WHATSAPP*\n\n'

  for (let jid of jids) {
    try {
      let res = await Ditss.fetchStatus(jid)
      let bio = res?.status || 'Tidak ada bio'
      let waktu = res?.setAt
        ? new Date(res.setAt).toLocaleString('id-ID')
        : '-'

      teks +=
`👤 ${jid.replace('@s.whatsapp.net','')}
📝 ${bio}
⏰ ${waktu}

`
    } catch {
      teks +=
`👤 ${jid.replace('@s.whatsapp.net','')}
❌ Gagal ambil bio

`
    }
    await delay(1200)
  }

  m.reply(teks.trim())
}

getBio.help = ['getbio']
getBio.tags = ['tools']
getBio.command = ['getbio']

export default getBio
