let admin = async (m, { conn: Ditss, text, command }) => {
  if (!m.isGroup) return m.reply('❌ Perintah ini hanya bisa digunakan di grup!')
  if (!m.isAdmin && !m.isCreator) return m.reply('❌ Hanya admin yang bisa menggunakan perintah ini!')
  
  let target
  
  if (m.mentionedJid && m.mentionedJid[0]) {
    target = m.mentionedJid[0]
  } else if (m.quoted && m.quoted.sender) {
    target = m.quoted.sender
  } else if (text) {
    let number = text.replace(/[^0-9]/g, '')
    if (number.startsWith('0')) number = '62' + number.slice(1)
    if (number.startsWith('62')) number = number
    if (number.startsWith('+')) number = number.replace('+', '')
    
    if (number.length >= 10 && number.length <= 15) {
      target = number + '@s.whatsapp.net'
    } else {
      return m.reply('❌ Format nomor tidak valid! Contoh: .demote 6281234567890')
    }
  } else {
    return m.reply('❌ Tag/reply user atau ketik nomornya!\nContoh: .demote 6281234567890')
  }
  
  if (target === m.sender) return m.reply('❌ Tidak bisa memproses diri sendiri!')
  
  try {
    if (command === 'promote' || command === 'admin') {
      await Ditss.groupParticipantsUpdate(m.chat, [target], 'promote')
      return m.reply(`✅ Berhasil promote @${target.split('@')[0]} menjadi admin!`)
    } 
    
    if (command === 'demote' || command === 'unadmin') {
      await Ditss.groupParticipantsUpdate(m.chat, [target], 'demote')
      return m.reply(`✅ Berhasil demote @${target.split('@')[0]} dari admin!`)
    }
  } catch (error) {
    return m.reply(`❌ Gagal: ${error.message}`)
  }
}

admin.help = ['promote @user/nomor', 'demote @user/nomor']
admin.tags = ['group', 'admin']
admin.command = ['promote', 'admin', 'demote', 'unadmin']

export default admin
