import axios from 'axios'

let ai = async (m, { conn: Ditss, text }) => {
  if (!text) return m.reply('Masukkan pertanyaan!\nContoh: .ai siapa presiden Indonesia?')
  
  await Ditss.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })
  
  const apiUrl = `https://api.asuma.my.id/v1/tools/webpilot?q=${encodeURIComponent(text)}`
  
  try {
    /*const response = await axios.get(apiUrl, {
      timeout: 60000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })*/
        const response = await axios.get(apiUrl, {
      timeout: 90000
    })
    const data = response.data
    
    if (!data.status || !data.result) {
      await Ditss.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
      return m.reply('❌ Gagal mendapatkan respons dari AI')
    }
    
    const { result } = data
    
    let replyText = `🤖 *AI Assistant*\n\n📝 *Pertanyaan:* ${result.question}\n\n💬 *Jawaban:*\n${result.text}\n\n`
    
    if (result.source && result.source.length > 0) {
      replyText += `📚 *Sumber:*\n`
      result.source.forEach((src, index) => {
        replyText += `${index + 1}. ${src.title}\n   ${src.link}\n`
      })
    }
    
    replyText += `\n⏱️ *Waktu respons:* ${data.responseTime}`
    
    await m.reply(replyText)
    await Ditss.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
    
  } catch (error) {
    await Ditss.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
    
    if (error.code === 'ECONNABORTED') {
      m.reply('❌ Timeout: AI terlalu lama merespon (lebih dari 60 detik)')
    } else if (error.response) {
      m.reply(`❌ Error ${error.response.status}: ${error.response.data?.message || 'Terjadi kesalahan'}`)
    } else {
      m.reply(`❌ Error: ${error.message}`)
    }
  }
}

ai.help = ['ai <pertanyaan>']
ai.tags = ['ai', 'search']
ai.command = ['webpilot']

export default ai
