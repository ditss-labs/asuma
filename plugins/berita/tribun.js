import fetch from 'node-fetch'
import { generateWAMessageFromContent, generateWAMessageContent } from '@whiskeysockets/baileys'
import { proto } from '@whiskeysockets/baileys'

let tribun = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  const zones = [
    "jakarta", "jabar", "mataram", "mataraman", "medan", "padang", "flores", "sulbar", "ambon", "wartakota",
    "bogor", "pantura", "madura", "palembang", "pekanbaru", "banjarmasin", "pontianak", "papua", "bekasi", "cirebon",
    "jogja", "bali", "bangka", "jambi", "kaltim", "palu", "papuabarat", "banten", "jateng", "jatim",
    "aceh", "batam", "sumsel", "kalteng", "makassar", "tangerang", "solo", "surabaya", "prohaba", "belitung",
    "lampung", "kaltara", "lombok", "depok", "banyumas", "suryamalang", "sultra", "babel", "kupang", "manado", "ternate"
  ]
  
  const types = [
    "bisnis", "superskor", "sport", "seleb", "lifestyle", "travel", "parapuan", "otomotif", "techno", "ramadan"
  ]
  
  if (!text) {
    await Ditss.sendMessage(
      m.chat,
      {
        text: `📰 *Tribun News*\n\nGunakan perintah: ${usedPrefix + command} <kota> <kategori>\nContoh: ${usedPrefix + command} jakarta bisnis\n\n*Kota tersedia:* ${zones.slice(0, 15).join(', ')}...\n*Kategori tersedia:* ${types.join(', ')}`
      },
      { quoted: m }
    )
    return
  }
  
  const [zone, category] = text.toLowerCase().trim().split(' ')
  
  if (!zone || !category) {
    return m.reply(`❌ Format salah!\n\nGunakan: ${usedPrefix + command} <kota> <kategori>\nContoh: ${usedPrefix + command} jakarta bisnis`)
  }
  
  if (!zones.includes(zone)) {
    return m.reply(`❌ Kota tidak valid!\n\nContoh kota: jakarta, surabaya, jogja, bali, dll.`)
  }
  
  if (!types.includes(category)) {
    return m.reply(`❌ Kategori tidak valid!\n\nKategori tersedia: ${types.join(', ')}`)
  }
  
  try {
    await m.reply(`⏳ Mengambil berita ${category} di ${zone}...`)
    
    const apiUrl = `https://api.asuma.my.id/v1/berita/tribun-news?city=${zone}&category=${category}`
    const res = await fetch(apiUrl)
    const json = await res.json()
    
    if (!json.status || !json.result?.data || !json.result.data.length) {
      return m.reply(`❌ Tidak ada berita untuk ${category} di ${zone}`)
    }
    
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({
        image: { url }
      }, {
        upload: Ditss.waUploadToServer
      })
      return imageMessage
    }
    
    let cards = []
    let beritaList = json.result.data.slice(0, 10)
    
    for (let b of beritaList) {
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: b.contentSnippet || 'Tidak ada deskripsi'
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: b.isoDate ? new Date(b.isoDate).toLocaleDateString('id-ID') : 'Tribun News'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: b.title,
          hasMediaAttachment: true,
          imageMessage: await createImage(b.image || 'https://via.placeholder.com/400')
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Baca Selengkapnya",
              url: b.link,
              merchant_url: b.link
            })
          }]
        })
      })
    }
    
    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `📰 *Tribun ${zone.toUpperCase()} - ${category.toUpperCase()}*`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: `Total: ${json.result.total} berita • ${json.creator}`
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards
            })
          })
        }
      }
    }, {})
    
    await Ditss.relayMessage(m.chat, msg.message, {
      messageId: msg.key.id
    })
    
  } catch (error) {
    m.reply('❌ Error: Gagal mengambil berita')
  }
}

tribun.help = ['tribun <kota> <kategori>']
tribun.tags = ['news']
tribun.command = ['tribun', 'tribunnews']
tribun.limit = 2

export default tribun
