import fetch from 'node-fetch'

let handler = async (m, { conn: Ditss, text }) => {
  if (!text)
    return m.reply(
      'Masukkan nama hero MLBB!\n\nContoh:\n.mlhero aamon'
    )

  const hero = text.toLowerCase().trim()
  const url = `${global.api.domain}/v1/mobile-legends/hero?hero=${encodeURIComponent(hero)}`

  let json
  try {
    const res = await fetch(url)
    json = await res.json()
  } catch (e) {
    return m.reply('❌ Gagal menghubungi API.')
  }

  if (!json?.status || !json?.data)
    return m.reply('❌ Hero tidak ditemukan.')

  const d = json.data
  const info = d.information
  const stat = d.base_statistics
  const esport = d.esports_statistics
  const passive = d.skills?.passive
  const ult = d.skills?.ultimate

  let teks = `🎮 *MOBILE LEGENDS HERO*\n\n`
  teks += `🦸 *${d.hero.toUpperCase()}*\n`
  teks += `📍 ${info.region} • ${info.city}\n`
  teks += `🎭 Role : ${info.role}\n`
  teks += `🛣 Lane : ${info.lane}\n`
  teks += `💰 Price : ${info.price}\n`
  teks += `🗓 Release : ${info.release_date}\n`
  teks += `🎯 Specialty : ${info.specialty}\n`
  teks += `🎙 VA : ${info.voice_actors}\n\n`

  teks += `📊 *BASE STATS*\n`
  teks += `❤️ HP : ${stat.hp}\n`
  teks += `🔷 Mana : ${stat.mana}\n`
  teks += `⚔️ Physical ATK : ${stat.physical_attack}\n`
  teks += `🛡 Physical DEF : ${stat.physical_defense}\n`
  teks += `✨ Magic DEF : ${stat.magic_defense}\n`
  teks += `👟 Move Speed : ${stat.movement_speed}\n\n`

  teks += `🏆 *ESPORT*\n`
  teks += `📈 Win Rate : ${esport.win_rate}\n\n`

  if (d.notable_players?.length) {
    teks += `🔥 *Notable Players*\n`
    teks += d.notable_players.map(v => `• ${v}`).join('\n')
    teks += `\n\n`
  }

  if (passive?.description) {
    teks += `🌀 *PASSIVE*\n`
    teks += passive.description.slice(0, 400) + '...\n\n'
  }

  if (ult?.description) {
    teks += `💥 *ULTIMATE*\n`
    teks += ult.description.slice(0, 400) + '...\n'
  }

  await Ditss.sendMessage(
    m.chat,
    {
      image: { url: d.image },
      caption: teks
    },
    { quoted: m }
  )
}

handler.command = ['mlhero', 'ml', 'mlbb']
handler.tags = ['game']
handler.help = ['mlhero <nama hero>']

export default handler
