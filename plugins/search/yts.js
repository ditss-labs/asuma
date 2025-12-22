import axios from 'axios'

let ytsearch = async (m, { conn: Ditss, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🔍 *Contoh penggunaan:*\n${usedPrefix + command} lathi\n${usedPrefix + command} hindia rumah ke rumah`)
  
  try {
    const searchUrl = `https://api.asuma.my.id/v1/search/youtube?q=${encodeURIComponent(text)}&apikey=demo`
    const response = await axios.get(searchUrl)
    
    if (!response.data?.status || !response.data?.results?.[0]) {
      return m.reply('❌ Tidak ditemukan hasil pencarian.')
    }
    
    const results = response.data.results.slice(0, 30) // Ambil 5 hasil pertama
    
    // Buat button untuk setiap hasil
    const buttons = results.map((video, index) => ({
      name: "single_select",
      buttonParamsJson: JSON.stringify({
        title: `🎵 ${video.title.substring(0, 30)}${video.title.length > 30 ? '...' : ''}`,
        sections: [
          {
            title: "📥 Pilih Jenis Download",
            highlight_label: video.title.substring(0, 20),
            rows: [
              { 
                title: "🎵 Download Audio (MP3)", 
                description: "Kualitas terbaik", 
                id: `.ytmp3 ${video.url}`
              },
              { 
                title: "🎬 Download Video (480p)", 
                description: "Kualitas standar", 
                id: `.ytmp4 ${video.url} 480`
              },
              { 
                title: "🎬 Download Video (720p)", 
                description: "Kualitas standar", 
                id: `.ytmp4 ${video.url} 720`
              },
              { 
                title: "🎬 Download Video (1080p)", 
                description: "Kualitas HD", 
                id: `.ytmp4 ${video.url} 1080`
              }
            ]
          }
        ],
        has_multiple_buttons: true
      })
    }))
    
    // Tambah button quick reply
    buttons.push({
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "🔍 Cari Lagi",
        id: `.${command} `
      })
    })
    
    // Kirim interactive message
    await Ditss.relayMessage(
      m.chat,
      {
        interactiveMessage: {
          header: {
            title: "🎵 YOUTUBE SEARCH RESULTS",
            subtitle: `Hasil pencarian: "${text}"`,
            hasMediaAttachment: false
          },
          body: {
            text: `📊 Ditemukan ${response.data.count} hasil\n✅ Pilih video lalu pilih jenis download`
          },
          footer: {
            text: "Klik video untuk pilih download option"
          },
          nativeFlowMessage: {
            buttons: buttons,
            messageParamsJson: JSON.stringify({
              bottom_sheet: {
                in_thread_buttons_limit: 1,
                divider_indices: Array.from({length: results.length + 1}, (_, i) => i + 1),
                list_title: "🎬 PILIH VIDEO",
                button_title: "DOWNLOAD"
              }
            })
          }
        }
      },
      {
        additionalNodes: [
          {
            tag: "biz",
            attrs: {},
            content: [
              {
                tag: "interactive",
                attrs: {
                  type: "native_flow",
                  v: "1",
                },
                content: [
                  {
                    tag: "native_flow",
                    attrs: {
                      v: "9",
                      name: "mixed",
                    },
                  },
                ],
              },
            ],
          },
        ],
      }
    )
    
  } catch (error) {
    console.error('[YTSEARCH ERROR]', error)
    m.reply('❌ Error: ' + error.message)
  }
}

ytsearch.help = ['ytsearch <query>']
ytsearch.tags = ['downloader', 'youtube']
ytsearch.command = ['ytsearch', 'yts']
ytsearch.limit = 1

export default ytsearch
