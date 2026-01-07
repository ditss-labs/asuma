let hidetag = async (m, { conn: Ditss, text }) => {
  if (!m.isGroup) return m.reply('❌ Perintah ini hanya bisa digunakan di grup!')
  
  let groupMetadata = await Ditss.groupMetadata(m.chat)
  let participants = groupMetadata.participants || []
  let mentionList = participants.map(p => p.id)
  let isAdmin = participants.some(p => p.admin && p.id === m.sender)
  
  if (!m.isAdmin && !m.isCreator) return m.reply('❌ Hanya admin yang bisa menggunakan perintah ini!')
  
  if (m.quoted && m.quoted.mtype && m.quoted.fakeObj) {
    await Ditss.sendMessage(m.chat, {
      forward: m.quoted.fakeObj,
      mentions: mentionList
    }, { quoted: m })
  } else if (m.quoted && m.quoted.text) {
    await Ditss.sendMessage(m.chat, {
      text: m.quoted.text,
      mentions: mentionList
    }, { quoted: m })
  } else if (text) {
    await Ditss.sendMessage(m.chat, {
      text: text,
      mentions: mentionList
    }, { quoted: m })
  } else {
    await Ditss.sendMessage(m.chat, {
      text: `@${m.sender.split('@')[0]} telah melakukan hidetag grup.`,
      mentions: [m.sender, ...mentionList]
    }, { quoted: m })
  }
}

hidetag.help = ['hidetag [text/reply]']
hidetag.tags = ['group']
hidetag.command = ['h', 'ht', 'hidetag', 'tagal', 'tagall', 'totag']

export default hidetag
