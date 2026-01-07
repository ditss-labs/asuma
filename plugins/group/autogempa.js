let autogempa = async (m, { conn: Ditss, args }) => {
  if (!m.isGroup)
    return Ditss.sendMessage(m.chat, {
      text: '❌ Fitur ini hanya bisa digunakan di grup',
    }, { quoted: m })

  if (!m.isAdmin)
    return Ditss.sendMessage(m.chat, {
      text: '❌ Khusus admin grup',
    }, { quoted: m })

  if (!m.isBotAdmin)
    return Ditss.sendMessage(m.chat, {
      text: '❌ Bot harus jadi admin dulu',
    }, { quoted: m })

  if (!global.db.groups) global.db.groups = {}
  if (!global.db.groups[m.chat]) global.db.groups[m.chat] = {}
  if (!global.db.groups[m.chat].auto) global.db.groups[m.chat].auto = {}
  if (!global.db.groups[m.chat].auto.gempa)
    global.db.groups[m.chat].auto.gempa = {
      enable: false,
      data: ''
    }

  let gempaDb = global.db.groups[m.chat].auto.gempa
  if (!args[0]) {
    return Ditss.sendMessage(m.chat, {
      text:
`⚙️ *AUTO GEMPA*

Status: *${gempaDb.enable ? 'AKTIF' : 'NONAKTIF'}*

Gunakan:
.autogempa on
.autogempa off`
    }, { quoted: m })
  }
  if (args[0] === 'on') {
    if (gempaDb.enable)
      return Ditss.sendMessage(m.chat, {
        text: '⚠️ Auto gempa sudah aktif',
      }, { quoted: m })

    gempaDb.enable = true
    gempaDb.data = '' 
    return Ditss.sendMessage(m.chat, {
      text:
`✅ *AUTO GEMPA AKTIF*

Bot akan otomatis mengirim info gempa terbaru ke grup ini.`,
    }, { quoted: m })
  }
  if (args[0] === 'off') {
    if (!gempaDb.enable)
      return Ditss.sendMessage(m.chat, {
        text: '⚠️ Auto gempa sudah nonaktif',
      }, { quoted: m })

    gempaDb.enable = false

    return Ditss.sendMessage(m.chat, {
      text: '❌ Auto gempa dimatikan',
    }, { quoted: m })
  }
  return Ditss.sendMessage(m.chat, {
    text: '❌ Opsi tidak valid\nGunakan: on / off',
  }, { quoted: m })
}

autogempa.help = ['autogempa on', 'autogempa off']
autogempa.tags = ['group', 'auto']
autogempa.command = ['autogempa', 'gempaauto']

export default autogempa
