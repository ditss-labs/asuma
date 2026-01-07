import { exec } from 'child_process'
import { unlinkSync, readFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

let converter = async (m, { conn: Ditss, quoted }) => {
  const user = global.db.users[m.sender]
  
  if (!quoted) return m.reply('⚠️ Balas stikernya terlebih dahulu.')
  if (!/webp/.test(quoted.mime)) return m.reply(`⚠️ Balas sticker dengan caption *${m.command}*`)
  
  await Ditss.sendMessage(m.chat, {
    react: {
      text: "⏱️",
      key: m.key,
    }
  })
  
  let media
  try {
    media = await Ditss.downloadAndSaveMediaMessage(quoted)
  } catch (e) {
    return m.reply('❌ Gagal download media.')
  }
  
  const getFileType = (buffer) => {
    const hex = buffer.toString('hex', 0, 4)
    
    if (hex.startsWith('47494638')) return 'gif'
    if (hex.startsWith('89504e47')) return 'png'
    if (hex.startsWith('ffd8ffe0') || hex.startsWith('ffd8ffe1') || hex.startsWith('ffd8ffe2')) return 'jpg'
    if (hex.startsWith('52494646')) {
      const subType = buffer.toString('ascii', 8, 12)
      if (subType === 'WEBP') return 'webp'
      if (subType === 'AVI ') return 'avi'
    }
    if (hex.startsWith('66747970') || hex.startsWith('00000018')) return 'mp4'
    if (hex.startsWith('1a45dfa3')) return 'webm'
    if (hex.startsWith('3026b275')) return 'wmv'
    
    return 'unknown'
  }
  
  const buffer = readFileSync(media)
  const fileType = getFileType(buffer)
  
  const tempPath = join(tmpdir(), `${Date.now()}.${fileType === 'webp' ? 'mp4' : fileType}`)
  
  if (fileType === 'webp') {
    return new Promise((resolve, reject) => {
      exec(`ffmpeg -i ${media} -c:v libx264 -pix_fmt yuv420p ${tempPath}`, async (err) => {
        try {
          unlinkSync(media)
        } catch (e) {}
        
        if (err) {
          exec(`ffmpeg -i ${media} ${tempPath}`, async (err2) => {
            if (err2) {
              try {
                unlinkSync(tempPath)
              } catch (e) {}
              return m.reply('❌ Gagal mengkonversi sticker.')
            }
            
            const videoBuffer = readFileSync(tempPath)
            await Ditss.sendMessage(m.chat, {
              video: videoBuffer,
              caption: '✅ Berhasil dikonversi ke video'
            }, { quoted: m })
            
            try {
              unlinkSync(tempPath)
            } catch (e) {}
            resolve()
          })
        } else {
          const videoBuffer = readFileSync(tempPath)
          await Ditss.sendMessage(m.chat, {
            video: videoBuffer,
            caption: '✅ Berhasil dikonversi ke video'
          }, { quoted: m })
          
          try {
            unlinkSync(tempPath)
          } catch (e) {}
          resolve()
        }
      })
    })
  } else {
    try {
      await Ditss.sendMessage(m.chat, {
        image: buffer,
        caption: '✅ Berhasil dikonversi ke gambar'
      }, { quoted: m })
    } catch (error) {
      return m.reply(`❌ Gagal mengirim file: ${error.message}`)
    } finally {
      try {
        unlinkSync(media)
      } catch (e) {}
    }
  }
}

converter.help = ['tovideo [reply sticker]', 'toimage [reply sticker]']
converter.tags = ['converter']
converter.command = ['tovideo', 'tovid', 'tomp4', 'toimg', 'toimage', 'tovidio']

export default converter
