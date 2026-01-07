let onlygc = async (m, { args, set }) => {
  if (!m.isAdmin && !m.isCreator)
    return m.reply('❌ Khusus admin / owner')

  if (!args[0]) {
    return m.reply(
`⚙️ *ONLY GROUP*

Status: *${set.grouponly ? 'AKTIF' : 'NONAKTIF'}*

Gunakan:
.onlygc on
.onlygc off`
    )
  }

  if (args[0] === 'on') {
    set.grouponly = true
    set.privateonly = false 
    return m.reply('✅ Mode *ONLY GROUP* diaktifkan')
  }

  if (args[0] === 'off') {
    set.grouponly = false
    return m.reply('❌ Mode ONLY GROUP dimatikan')
  }

  m.reply('❌ Gunakan: on / off')
}

onlygc.help = ['onlygc on', 'onlygc off']
onlygc.tags = ['owner', 'settings']
onlygc.command = ['onlygc']

export default onlygc
