let publicMode = async (m, { args, set }) => {
  if (!m.isCreator)
    return m.reply('❌ Khusus owner')

  if (!args[0]) {
    return m.reply(
`⚙️ *MODE BOT*

Status:
• Public : ${set.public ? 'AKTIF' : 'NONAKTIF'}
• Self   : ${!set.public ? 'AKTIF' : 'NONAKTIF'}

Gunakan:
.public on
.public off
.self on
.self off`
    )
  }

  let cmd = m.command
  if (cmd === 'public') {
    if (args[0] === 'on') {
      set.public = true
      return m.reply('✅ Bot sekarang *PUBLIC*')
    }

    if (args[0] === 'off') {
      set.public = false
      return m.reply('❌ Bot sekarang *SELF (owner only)*')
    }
  }
  if (cmd === 'self') {
    if (args[0] === 'on') {
      set.public = false
      return m.reply('❌ Bot sekarang *SELF (owner only)*')
    }

    if (args[0] === 'off') {
      set.public = true
      return m.reply('✅ Bot sekarang *PUBLIC*')
    }
  }

  m.reply('❌ Gunakan: on / off')
}

publicMode.help = ['public on', 'public off', 'self on', 'self off']
publicMode.tags = ['owner', 'settings']
publicMode.command = ['public', 'self']

export default publicMode
