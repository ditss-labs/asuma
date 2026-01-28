import fetch from 'node-fetch'
import { generateWAMessageFromContent, generateWAMessageContent } from '@whiskeysockets/baileys'
import { proto } from '@whiskeysockets/baileys'

let cnbc = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  const types = [
    "news",
    "nusantara",
    "khazanah",
    "islam-digest",
    "internasional",
    "ekonomi",
    "sepakbola",
    "leisure"
  ]
  
  if (!text) {
    let buttons = [
      {
        buttonId: "cnbc",
        buttonText: { displayText: "📰 Pilih Kategori CNBC" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "📊 Pilih Kategori CNBC News",
            sections: [
              {
                title: "Kategori Berita",
                rows: types.map(type => ({
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
        text: `📰 *CNBC Indonesia News*\n\nGunakan perintah: ${usedPrefix + command} <kategori>\nContoh: ${usedPrefix + command} ekonomi\n\nAtau klik tombol di bawah untuk memilih kategori:`,
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
    
    const apiUrl = `${global.api.domain}/v1/berita/cnbc-news?apikey=${global.api.key}&category=${category}`
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
          text: b.contentSnippet || 'Tidak ada deskripsi'
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: b.isoDate ? new Date(b.isoDate).toLocaleDateString('id-ID') : 'Berita'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: b.title,
          hasMediaAttachment: true,
          imageMessage: await createImage(b.image?.large || b.image?.small || 'https://via.placeholder.com/400')
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
              text: `📰 *${category.toUpperCase()} - CNBC Indonesia*`
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

cnbc.help = ['cnbc <kategori>']
cnbc.tags = ['news']
cnbc.command = ['cnbc', 'cnbcnews']
cnbc.limit = 2

export default cnbc
