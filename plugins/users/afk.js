let afk = async (m, { conn: Ditss, text }) => {
  let userdb = global.db.users[m.sender]
  
  userdb.afkTime = Date.now()
  userdb.afkReason = text || 'Tanpa alasan'
  
  return m.reply(`😴 AFK aktif\n📌 Alasan: ${userdb.afkReason}`)
}

afk.help = ['afk [alasan]']
afk.tags = ['main']
afk.command = ['afk']

export default afk 
