import axios from 'axios'
import { UguuSe } from '../../lib/utils/uploader.js'
let fakektp = async (m, { conn: Ditss, text, command, reply, usedPrefix }) => {
  if (!text) {
    return m.reply(`❌ Format salah!

.fakektp DATA|...|TERBUAT
📸 Reply foto ATAU tambahkan URL foto di akhir`)
  }

  let pas_photo = null
  if (m.quoted) {
    let targetMsg = m.quoted
    let mime = (targetMsg.msg || targetMsg).mimetype || ''

    if (/image\/(png|jpe?g|webp)/.test(mime)) {
      let media = await targetMsg.download()
      let uploaded = await UguuSe(media)
      pas_photo = uploaded.url
    }
  }
  let args = text.split('|').map(v => v.trim())

  if (!pas_photo) {
    let last = args[args.length - 1]
    if (/^https?:\/\//i.test(last)) {
      pas_photo = last
      args.pop() // hapus URL dari data
    }
  }

  if (!pas_photo) {
    return m.reply('❌ Pas foto tidak ditemukan\nReply gambar atau sertakan URL foto di akhir')
  }

  if (args.length < 17) {
    return m.reply('❌ Data kurang (minimal 17 field)')
  }

  const [
    nama,
    provinsi,
    kota,
    nik,
    ttl,
    jenis_kelamin,
    golongan_darah,
    alamat,
    rtRw,
    kel_desa,
    kecamatan,
    agama,
    status,
    pekerjaan,
    kewarganegaraan,
    masa_berlaku,
    terbuat
  ] = args

  try {
    const res = await axios.get(
      'https://api.asuma.my.id/v1/maker/fake-ktp',
      {
        responseType: 'arraybuffer',
        params: {
          apikey: `demo`,
          nama,
          provinsi,
          kota,
          nik,
          ttl,
          jenis_kelamin,
          golongan_darah,
          alamat,
          rtRw,
          kel_desa,
          kecamatan,
          agama,
          status,
          pekerjaan,
          kewarganegaraan,
          masa_berlaku,
          terbuat,
          pas_photo
        }
      }
    )
const buffer = Buffer.from(res.data)
    await Ditss.sendMessage(
      m.chat,
      {
        image: buffer,
        caption: '🪪 *FAKE KTP GENERATED*\nPowered by Asuma API'
      },
      { quoted: m }
    )

  } catch (e) {
    console.error(e)
    m.reply('❌ Gagal generate Fake KTP')
  }
}

fakektp.command = ['fakektp']
fakektp.tags = ['maker']
fakektp.help = ['fakektp <data> (reply foto / url)']
fakektp.limit = 2;

export default fakektp
