let publicMode = async (m, { args, set, command }) => {
  if (!m.isCreator)
    return m.reply('❌ Khusus owner')

  const cmd = command
  const opt = (args[0] || '').toLowerCase()

  if (!opt) {
    return m.reply(
`⚙️ *MODE BOT*

Status saat ini:
• Public : ${set.public ? 'AKTIF' : 'NONAKTIF'}
• Self   : ${set.self ? 'AKTIF' : 'NONAKTIF'}

Gunakan:
.public on | off
.self on | off`
    )
  }
  
  if (!['on', 'off'].includes(opt))
    return m.reply('❌ Gunakan hanya: on / off')
  
  if (cmd === 'public') {
    set.public = (opt === 'on')
    if (opt === 'on') set.self = false  
  } else if (cmd === 'self') {
    set.self = (opt === 'on')
    if (opt === 'on') set.public = false  
  }
  
  return m.reply(
    set.public
      ? '✅ Bot sekarang *PUBLIC* (semua bisa pakai)'
      : '🔒 Bot sekarang *SELF (owner only)*'
  )
}

publicMode.help = ['public on', 'public off', 'self on', 'self off']
publicMode.tags = ['owner', 'settings']
publicMode.command = ['public', 'self']

export default publicMode
