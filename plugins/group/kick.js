let kick = async (m, { conn: Ditss, args }) => {
  if (!m.isGroup) return m.reply('❌ Perintah ini hanya bisa digunakan di grup!')
  if (!m.isCreator && !m.isAdmin) return m.reply('❌ Hanya admin yang bisa menggunakan perintah ini!')
  if (!m.isBotAdmin) return m.reply('❌ Bot bukan admin!')
  let target
  if (m.mentionedJid?.[0]) {
    target = m.mentionedJid[0]
  } else if (m.quoted?.sender) {
    target = m.quoted.sender
  } else if (args[0]) {
    let input = args[0].replace(/[^0-9]/g, '')
    let members = (await Ditss.groupMetadata(m.chat)).participants

    let matches = members.filter(p =>
      p.id.replace(/[^0-9]/g, '').endsWith(input)
    )

    if (matches.length > 1)
      return m.reply('⚠️ Nomor mirip lebih dari satu, gunakan tag!')

    if (matches[0]) target = matches[0].id
  }

  if (!target)
    return m.reply('❌ Target tidak ditemukan!\nGunakan: tag / reply / ujung nomor.')

  if (global.info.owner?.includes(target))
    return m.reply('❌ Tidak bisa kick Owner.')

  if (target === m.sender)
    return m.reply('❌ Tidak bisa kick diri sendiri.')
  let members = (await Ditss.groupMetadata(m.chat)).participants
  let member = members.find(p => p.id === target)
  if (member?.admin)
    return m.reply('❌ Tidak bisa kick sesama admin!')

  const sticker = 'https://raw.githubusercontent.com/media-clouds/upload/id/447920601019/mce05oaq.webp'

  await Ditss.sendSticker(m.chat, sticker, m, {
    packname: 'yahahahahahahahah di kick😛',
    author: global.info.namabot
  })

  try {
    await Ditss.groupParticipantsUpdate(m.chat, [target], 'remove')
    await m.reply(`✅ Sukses mengeluarkan @${target.split('@')[0]}`, null, {
      mentions: [target]
    })
  } catch (e) {
    m.reply('❌ Gagal mengeluarkan user, mungkin bukan anggota grup atau sudah keluar.')
  }
}

kick.help = ['kick @user / reply / ujung nomor']
kick.tags = ['group', 'admin']
kick.command = ['kick', 'dor', 'buang', '😛', 'hedsot', 'duar']

export default kick
