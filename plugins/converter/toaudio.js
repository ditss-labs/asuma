import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

let handler = async (m, { conn: Ditss }) => {
  let quoted = m.quoted
  if (!quoted) {
    return m.reply('Reply *video* yang mau diubah jadi audio 🎧')
  }

  let mime = quoted.mimetype || ''
  if (!/video/.test(mime)) {
    return m.reply('❌ Itu bukan video!')
  }

  let videoPath
  try {
    videoPath = await Ditss.downloadAndSaveMediaMessage(quoted)
  } catch (e) {
    console.error('[TOAUDIO DOWNLOAD ERROR]', e)
    return m.reply('❌ Gagal download video.')
  }

  let audioPath = videoPath.replace(/\.(mp4|mkv|avi|mov|webm)$/i, '.mp3')

  try {
    // convert video -> audio (mp3)
    await execAsync(
      `ffmpeg -y -i "${videoPath}" -vn -ab 128k -ar 44100 -f mp3 "${audioPath}"`
    )
  } catch (e) {
    console.error('[TOAUDIO FFMPEG ERROR]', e)
    return m.reply('❌ Gagal convert video ke audio.')
  }

  await Ditss.sendMessage(m.chat, {
    audio: { url: audioPath },
    mimetype: 'audio/mpeg',
    ptt: false
  }, { quoted: m })

  // cleanup
  if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath)
  if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath)
}

handler.command = ['toaudio', 'tomp3']
handler.tags = ['converter']
handler.help = ['toaudio (reply video)']

export default handler
