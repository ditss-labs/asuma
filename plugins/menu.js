import fs from 'fs'
import path from 'path'

let handler = async (m, { conn: Ditss }) => {
  let pluginFiles = fs.readdirSync('./plugins').filter(v => v.endsWith('.js'))
  let plugins = []

  for (let file of pluginFiles) {
    let pluginPath = path.resolve('./plugins', file)
    let plugin = await import('file://' + pluginPath)
    if (plugin && plugin.default) plugin = plugin.default

    if (plugin?.tags && plugin?.command) {
      plugins.push({
        command: plugin.command,
        tags: plugin.tags
      })
    }
  }

  let menu = {}
  for (let p of plugins) {
    for (let tag of p.tags) {
      if (!menu[tag]) menu[tag] = []
      menu[tag].push(p.command)
    }
  }
  let manual = {
    'owner': ['addprem','delprem','ban','unban','>', '$','=>'],
    'group': ['kick','add','promote','demote','hidetag'],
    'fun': ['jadian','tolak','terima'],
    'sticker': ['sticker','toimg','take'],
    'backup': ['backup','restore'],
    'downloader': ['mediafire','facebook','play','ytmp4','ytmp3'],
    'ai': ['ai','openai','chatgpt'],
    'converter': ['image2mini','toimg','tomp3','audioconvert'],
    'enhance': ['hd','remini','hdr','hdvid'],
    'editor': ['blur','invert','crop'],
    'tools': ['ssweb','qrcode','shortlink'],
    'about': ['info','sosmed'],
    'info': ['ping','runtime','speed'],
    'nsfw': ['nsfw waifu', 'nsfw neko', 'nsfw loli', 'nsfw trap', 'nsfw blowjob', 'nsfw' ],
    'main': ['menu','help']
  }
  for (let tag in manual) {
    if (!menu[tag]) menu[tag] = []
    menu[tag].push(...manual[tag])
  }
  let icons = {
    owner: '🛠️',
    group: '👥',
    fun: '😂',
    sticker: '🎨',
    backup: '💾',
    downloader: '📥',
    ai: '🧠',
    converter: '🔄',
    enhance: '✨',
    editor: '🖌️',
    tools: '🔧',
    about: 'ℹ️',
    info: '📊',
    main: '📑',
    nsfw: '🔞'
  }
  let teks = `👋 Hi *${m.pushName || 'User'}*!\n\n`
  teks += `I’m *Asuma Toki*, your friendly WhatsApp assistant bot 🤖\n`
  teks += `Dengan bot ini, kamu bisa mencari informasi, mengakses fitur hiburan, tools, hingga layanan otomatis — langsung lewat WhatsApp aja!\n\n`
  teks += `╭─❏ 𝐈𝐍𝐅𝐎 𝐁𝐎𝐓\n`
  teks += `│▸ Creator : DitssGanteng\n`
  teks += `│▸ Library : ws-baileys\n`
  teks += `│▸ Mode    : 🌐 Public\n`
  teks += `╰─────────────\n\n`
  Object.keys(menu).sort().forEach(tag => {
    let title = `${icons[tag] || '❓'} ${tag.charAt(0).toUpperCase() + tag.slice(1)}`
    let commands = menu[tag].map(cmd => Array.isArray(cmd) ? cmd[0] : cmd) 
    teks += `╭───⭓ *${title}*\n`
    teks += commands.map(cmd => `│▢ ${cmd}`).join('\n')
    teks += `\n╰────────────\n\n`
  })

//  m.reply(teks)
    const buttons = [
  { buttonId: '.owner', buttonText: { displayText: 'my owner' }, type: 1 },
  { buttonId: '.info', buttonText: { displayText: 'info bot' }, type: 1 }
]

const buttonMessage = {
    image: { url: "https://peyimpanan.vercel.app/1758556822155.jpg" }, 
    caption: teks,
    footer: global.info.namabot,
    buttons,
    headerType: 1
}

await Ditss.sendMessage(m.chat, buttonMessage, { quoted: null })
}

handler.command = ['menu', 'help']
handler.tags = ['main']
handler.help = ['menu']

export default handler