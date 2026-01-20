import fetch from 'node-fetch'
import { generateWAMessageFromContent, generateWAMessageContent } from '@whiskeysockets/baileys'
import { proto } from '@whiskeysockets/baileys'

let cnn = async (m, { conn: Ditss }) => {
  try {
    await m.reply('⏳ Mengambil berita...')
    
    const apiUrl = `https://asuma.my.id/v1/berita/antara-news?category=terkini`
    const res = await fetch(apiUrl)
    const json = await res.json()
    
    if (!json.status || !json.result?.data || !json.result.data.length) {
      return m.reply('❌ Tidak ditemukan berita')
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
          text: b.isoDate ? new Date(b.isoDate).toLocaleDateString('id-ID') : 'Berita Terkini'
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
              text: `📰 *Berita Terkini - Antara News*`
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

cnn.help = ['cnn']
cnn.tags = ['news', 'berita']
cnn.command = ['antara']
cnn.limit = 2

export default cnn
