import axios from 'axios'

let get = async (m, { conn: Ditss, args }) => {
  if (!args[0]) return m.reply('❌ Masukkan URL')
  
  let url = args[0]
  if (!/^https?:\/\//.test(url)) {
    url = 'https://' + url
  }

  await Ditss.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

  let res
  try {
    res = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 30000,
      maxContentLength: 100 * 1024 * 1024
    })
  } catch (e) {
    return m.reply(`❌ Gagal mengambil URL: ${e.message}`)
  }

  if (!res.data || res.data.length === 0) {
    return m.reply('❌ Tidak ada data yang diterima')
  }

  let type = res.headers['content-type']?.split(';')[0] || ''
  let data = Buffer.from(res.data)
  
  const maxSize = 70 * 1024 * 1024
  if (data.length > maxSize) {
    return m.reply(`❌ File terlalu besar (${(data.length / (1024 * 1024)).toFixed(2)} MB). Maksimal 70MB`)
  }

  let fileName = url.split('/').pop() || 'file'
  if (fileName.includes('?')) fileName = fileName.split('?')[0]

  try {
    if (type.startsWith('text/')) {
      const text = data.toString('utf-8', 0, 5000)
      if (text.length >= 5000) {
        const fs = await import('fs')
        const path = await import('path')
        const os = await import('os')
        const tempFile = path.join(os.tmpdir(), `${Date.now()}_${fileName}.txt`)
        fs.writeFileSync(tempFile, data)
        return Ditss.sendMessage(m.chat, {
          document: fs.readFileSync(tempFile),
          fileName: `${fileName}.txt`,
          mimetype: 'text/plain'
        }, { quoted: m })
      }
      return m.reply(text)
    }

    else if (type.startsWith('image/')) {
      return Ditss.sendMessage(m.chat, {
        image: data,
        caption: `📸 ${fileName}`
      }, { quoted: m })
    }

    else if (type.startsWith('video/')) {
      if (data.length > 50 * 1024 * 1024) {
        return m.reply(`❌ Video terlalu besar (${(data.length / (1024 * 1024)).toFixed(2)} MB). Maksimal 50MB untuk video`)
      }
      return Ditss.sendMessage(m.chat, {
        video: data,
        caption: `🎥 ${fileName}`
      }, { quoted: m })
    }

    else if (type.startsWith('audio/')) {
      return Ditss.sendMessage(m.chat, {
        audio: data,
        mimetype: type,
        fileName: `${fileName}.${type.split('/')[1]}`
      }, { quoted: m })
    }

    else {
      return Ditss.sendMessage(m.chat, {
        document: data,
        mimetype: type || 'application/octet-stream',
        fileName: fileName
      }, { quoted: m })
    }
  } catch (sendError) {
    return m.reply(`❌ Gagal mengirim file: ${sendError.message}`)
  }
}

get.help = ['get <url>']
get.tags = ['tools']
get.command = ['get']

export default get
