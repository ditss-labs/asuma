import fetch from 'node-fetch'
import { generateWAMessageFromContent, generateWAMessageContent } from '@whiskeysockets/baileys'
import { proto } from '@whiskeysockets/baileys'

let antara = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  const types = [
    "terkini",
    "top-news", 
    "politik",
    "hukum",
    "ekonomi",
    "metro",
    "sepakbola",
    "olahraga",
    "humaniora",
    "lifestyle",
    "hiburan",
    "dunia",
    "infografik",
    "tekno",
    "otomotif",
    "warta-bumi",
    "rilis-pers"
  ]
  
  if (!text) {
    let buttons = [
      {
        buttonId: "antara",
        buttonText: { displayText: "📰 Pilih Kategori Berita" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "📊 Pilih Kategori Berita Antara",
            sections: [
              {
                title: "Kategori Berita",
                rows: types.slice(0, 8).map(type => ({
                  title: `📰 ${type.charAt(0).toUpperCase() + type.slice(1)}`,
                  description: `Berita kategori ${type}`,
                  id: `.${command} ${type}`
                }))
              },
              {
                title: "Kategori Berita (Lanjutan)",
                rows: types.slice(8).map(type => ({
                  title: `📰 ${type.charAt(0).toUpperCase() + type.slice(1)}`,
                  description: `Berita kategori ${type}`,
                  id: `.${command} ${type}`
                }))
              }
            ]
          })
        }
      }
    ]
    
    await Ditss.sendMessage(
      m.chat,
      {
        text: `📰 *Berita Antara News*\n\nGunakan perintah: ${usedPrefix + command} <kategori>\nContoh: ${usedPrefix + command} politik\n\nAtau klik tombol di bawah untuk memilih kategori:`,
        footer: '© Powered by Asuma API',
        buttons,
        headerType: 1,
        viewOnce: true
      },
      { quoted: m }
    )
    return
  }
  
  const category = text.toLowerCase().trim()
  
  if (!types.includes(category)) {
    return m.reply(`❌ Kategori tidak valid!\n\nKategori tersedia: ${types.join(', ')}`)
  }
  
  try {
    await m.reply(`⏳ Mengambil berita ${category}...`)
    
    const apiUrl = `https://api.asuma.my.id/v1/berita/antara-news?category=${category}`
    const res = await fetch(apiUrl)
    const json = await res.json()
    
    if (!json.status || !json.result?.data || !json.result.data.length) {
      return m.reply(`❌ Tidak ada berita untuk kategori "${category}"`)
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
          text: b.description || 'Tidak ada deskripsi'
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: b.isoDate ? new Date(b.isoDate).toLocaleDateString('id-ID') : 'Berita'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: b.title,
          hasMediaAttachment: true,
          imageMessage: await createImage(b.image)
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
              text: `📰 *${category.toUpperCase()} - Antara News*`
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

antara.help = ['antara <kategori>']
antara.tags = ['news']
antara.command = ['antara', 'antaranews']
antara.limit = 2

export default antara
