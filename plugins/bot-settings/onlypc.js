let onlypc = async (m, { args, set }) => {
  if (!m.isAdmin && !m.isCreator)
    return m.reply('❌ Khusus admin / owner')

  if (!args[0]) {
    return m.reply(
`⚙️ *ONLY PRIVATE*

Status: *${set.privateonly ? 'AKTIF' : 'NONAKTIF'}*

Gunakan:
.onlypc on
.onlypc off`
    )
  }

  if (args[0] === 'on') {
    set.privateonly = true
    set.grouponly = false 
    return m.reply('✅ Mode *ONLY PRIVATE* diaktifkan')
  }

  if (args[0] === 'off') {
    set.privateonly = false
    return m.reply('❌ Mode ONLY PRIVATE dimatikan')
  }

  m.reply('❌ Gunakan: on / off')
}

onlypc.help = ['onlypc on', 'onlypc off']
onlypc.tags = ['owner', 'settings']
onlypc.command = ['onlypc']

export default onlypc
