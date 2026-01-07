let upch = async (m, { conn: Ditss, text, quoted }) => {
  if (!global.my || !global.my.idch) {
    return m.reply('❌ Channel ID belum diatur!')
  }
  
  if (!text) {
    return m.reply('Reply audio dengan caption .upch <nama_wm>\nContoh: .upch musik terbaru')
  }
  
  if (!quoted) {
    return m.reply('❌ Reply audio yang ingin diupload ke channel!')
  }
  
  try {
    const audioBuffer = await Ditss.downloadMediaMessage(quoted)
    
    if (!audioBuffer) {
      return m.reply('❌ Gagal mengunduh audio!')
    }
    
    await Ditss.sendMessage(m.jid, {
      audio: audioBuffer,
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        isForwarded: true,
        mentionedJid: [m.sender],
        businessMessageForwardInfo: {
          businessOwnerJid: "120363314209665405@newsletter"
        },
        forwardedNewsletterMessageInfo: {
          newsletterName: text,
          newsletterJid: "120363314209665405@newsletter"
        }
      }
    })
    
    await Ditss.sendMessage(m.chat, {
      react: {
        text: '✅',
        key: m.key,
      }
    })
    
    m.reply(`✅ Berhasil mengirim audio ke channel dengan watermark: "${text}"`)
    
  } catch (error) {
    await Ditss.sendMessage(m.chat, {
      react: {
        text: '❌',
        key: m.key,
      }
    })
    m.reply(`❌ Gagal mengirim audio: ${error.message}`)
  }
}

upch.help = ['upch <nama_wm> [reply audio]']
upch.tags = ['channel']
upch.command = ['upch', 'upsaluran']

export default upch
