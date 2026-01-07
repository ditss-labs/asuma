import fs from "fs"
import { exec } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const handler = async (m, { conn: Ditss, reply, text }) => {

  const quoted = m.quoted ? m.quoted : m
  const mime = (quoted.msg || quoted).mimetype || ""
  if (!/audio|video/.test(mime))
    return reply("reply ke video atau audio yang ingin dijadikan VN")

  reply("Wait...")

  try {
    const mediaPath = await Ditss.downloadAndSaveMediaMessage(quoted)
    const outPath = path.join(__dirname, `temp_${Date.now()}.ogg`) 
    await new Promise((resolve, reject) => {
      exec(
        `ffmpeg -y -i "${mediaPath}" -vn -c:a libopus -b:a 64k -ac 1 -ar 48000 -map_metadata -1 "${outPath}"`,
        (err, stdout, stderr) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
    await Ditss.sendMessage(
      m.chat,
      {
        audio: { url: outPath },
        mimetype: "audio/ogg; codecs=opus",
        ptt: true
      },
      { quoted: m }
    )
    fs.unlinkSync(mediaPath)
    fs.unlinkSync(outPath)
  } catch (err) {
    console.error(err)
    reply("❌ Gagal mengonversi ke VN. Coba lagi nanti.")
  }
}

handler.command = ["toptt", "tovn", "tovoicenote"];
handler.tags = ['tools'];
handler.limit = 1;
export default handler
