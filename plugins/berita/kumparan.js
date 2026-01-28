import fetch from 'node-fetch'
import { generateWAMessageFromContent, generateWAMessageContent } from '@whiskeysockets/baileys'
import { proto } from '@whiskeysockets/baileys'

let kumparan = async (m, { conn: Ditss, usedPrefix, command }) => {
  try {
    await m.reply('⏳ Mengambil berita Kumparan...')
    
    const apiUrl = `${global.api.domain}/v1/berita/kumparan-news?apikey=${global.api.key}`
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
          text: `${b.categories?.[0] || 'Umum'} • ${b.author || b.creator || 'Kumparan'}`
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: b.title,
          hasMediaAttachment: true,
          imageMessage: await createImage(b.image?.large || b.image?.medium || b.image?.small || 'https://via.placeholder.com/400')
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
              text: `📰 *Berita Terbaru - Kumparan*`
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

kumparan.help = ['kumparan']
kumparan.tags = ['news']
kumparan.command = ['kumparan', 'kumparannews']
kumparan.limit = 2

export default kumparan
