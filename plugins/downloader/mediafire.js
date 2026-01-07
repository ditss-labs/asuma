import fetch from 'node-fetch'

let mediafire = async (m, { conn: Ditss, text, command }) => {
  try {
    if (!text) return m.reply(`Contoh: .${command} https://www.mediafire.com/file/xxxxx`)
    if (!text.includes('mediafire.com')) return m.reply('Harus berupa link MediaFire!')

    const cleanUrl = text.trim()

    try {
      const headCheck = await fetch(cleanUrl, { method: 'HEAD', timeout: 5000 })
      if (headCheck.status !== 200) {
        return m.reply('❌ Link MediaFire tidak valid atau sudah dihapus!')
      }
    } catch (headErr) {
      return m.reply('❌ Link MediaFire tidak bisa diakses — mungkin butuh verifikasi manual.')
    }

    const apiUrl = `https://ditss.vercel.app/api/download/mediafire?apikey=DitssGanteng&url=${encodeURIComponent(cleanUrl)}`

    let res
    try {
      res = await fetch(apiUrl).then(r => r.json())
    } catch (apiErr) {
      res = null
    }

    let fileName = 'unknown_file'
    let fileSize = 'Unknown'
    let downloadLink = cleanUrl
    let uploadDate = '-'
    let mimeType = 'application/octet-stream'

    if (res && res.status && res.result) {
      fileName = res.result.fileName
      fileSize = res.result.fileSize
      downloadLink = res.result.downloadLink
      uploadDate = res.result.uploadDate
      mimeType = res.result.mimeType
    } else {
      try {
        const urlObj = new URL(cleanUrl)
        const pathParts = urlObj.pathname.split('/')
        const rawFileName = pathParts[3]
        fileName = decodeURIComponent(rawFileName.replace(/\+/g, ' '))
      } catch (e) {
        fileName = 'downloaded_file'
      }
    }

    const info = `📂 *MEDIAFIRE DOWNLOADER*
───────────────────────
📄 *Nama File:* ${fileName}
📏 *Ukuran File:* ${fileSize}
📆 *Diunggah:* ${uploadDate}
🌐 *Link Asli:* ${cleanUrl}

${res ? '⏳ *Tunggu sebentar, mengirim file...*' : '⚠️ *API sedang lambat — kirim link manual saja*'}`
    
    await m.reply(info)
    await Ditss.sendMessage(m.chat, { react: { text: res ? "🚀" : "⚠️", key: m.key } })

    if (res && res.status) {
      const safeUrl = downloadLink
        .replace(/ /g, '%20')
        .replace(/\+/g, '%2B')
        .replace(/\?/g, '%3F')
        .replace(/&/g, '%26')

      if (fileSize.includes('GB') || (fileSize.includes('MB') && parseFloat(fileSize) > 500)) {
        return m.reply(`⚠️ File terlalu besar (${fileSize}) — WhatsApp tidak bisa kirim.\n\nSilakan download manual:\n${safeUrl}`)
      }

      let media
      try {
        media = await fetch(safeUrl).then(r => r.buffer())
      } catch (dlErr) {
        return m.reply(`❌ Gagal download. Coba manual:\n${safeUrl}`)
      }

      await Ditss.sendMessage(m.chat, {
        document: media,
        fileName: fileName,
        mimetype: mimeType,
        caption: `✅ Berhasil!\n\n📂 *${fileName}*\n📏 Ukuran: ${fileSize}`
      }, { quoted: m })

      await Ditss.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
    } else {
      await m.reply(`🔗 *Download Manual:*\n${cleanUrl}\n\n(Buka di browser, lewati iklan, lalu download)`)
    }

  } catch (err) {
    await Ditss.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
    m.reply('❌ Gagal proses link. Coba lagi nanti atau gunakan link lain.')
  }
}

mediafire.help = ['mediafire <url>']
mediafire.tags = ['downloader']
mediafire.command = ['mf', 'mediafire']

export default mediafire
