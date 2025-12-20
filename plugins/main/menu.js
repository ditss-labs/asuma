import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

/**
 * Recursive plugin reader
 */
function getPlugins(dir) {
  let results = []
  for (let file of fs.readdirSync(dir)) {
    let fullPath = path.join(dir, file)
    let stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      results.push(...getPlugins(fullPath))
    } else if (file.endsWith('.js')) {
      results.push(fullPath)
    }
  }
  return results
}

let handler = async (m, { conn: Ditss }) => {
  const pluginDir = path.resolve('plugins')
  const pluginFiles = getPlugins(pluginDir)
  const plugins = []

  for (let file of pluginFiles) {
    try {
      let plugin = await import(pathToFileURL(file))
      plugin = plugin?.default || plugin

      if (!plugin) continue
      if (!plugin.tags || !plugin.command) continue

      plugins.push({
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        command: plugin.command
      })
    } catch (e) {
      console.error('[PLUGIN ERROR]', file, e.message)
    }
  }

  /**
   * Build menu by tag
   */
  const menu = {}

  for (let p of plugins) {
    for (let tag of p.tags) {
      if (!menu[tag]) menu[tag] = []
      menu[tag].push(p.command)
    }
  }

  /**
   * Manual fallback (optional)
   */
  const manual = {
    owner: ['addprem','delprem','ban','unban','>','$','=>'],
    group: ['kick','add','promote','demote','hidetag'],
    fun: ['jadian','tolak','terima'],
    sticker: ['sticker','toimg','take'],
    backup: ['backup','restore'],
    downloader: ['mediafire','facebook','play','ytmp4','ytmp3'],
    ai: ['ai','openai','chatgpt'],
    converter: ['image2mini','toimg','tomp3','audioconvert'],
    enhance: ['hd','remini','hdr','hdvid'],
    editor: ['blur','invert','crop'],
    tools: ['ssweb','qrcode','shortlink'],
    about: ['info','sosmed'],
    info: ['ping','runtime','speed'],
    nsfw: ['nsfw waifu','nsfw neko','nsfw loli','nsfw trap','nsfw blowjob'],
    main: ['menu','help']
  }

  for (let tag in manual) {
    if (!menu[tag]) menu[tag] = []
    menu[tag].push(...manual[tag])
  }

  /**
   * Icons
   */
  const icons = {
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

  /**
   * Build text
   */
  let teks = `👋 Hi *${m.pushName || 'User'}*!\n\n`
  teks += `🤖 *Asuma Toki* — WhatsApp Assistant Bot\n`
  teks += `⚡ Cepat • Pintar • Multifungsi\n\n`
  teks += `╭─❏ 𝐈𝐍𝐅𝐎 𝐁𝐎𝐓\n`
  teks += `│▸ Creator : Ditss\n`
  teks += `│▸ Library : ws-baileys\n`
  teks += `│▸ Mode    : 🌐 Public\n`
  teks += `╰─────────────\n\n`

  Object.keys(menu).sort().forEach(tag => {
    const title = `${icons[tag] || '❓'} ${tag.toUpperCase()}`
    const commands = [...new Set(
      menu[tag].map(cmd => Array.isArray(cmd) ? cmd[0] : cmd)
    )]

    teks += `╭───⭓ *${title}*\n`
    teks += commands.map(v => `│▢ ${v}`).join('\n')
    teks += `\n╰────────────\n\n`
  })

  /**
   * Buttons
   */
  const buttons = [
    { buttonId: '.owner', buttonText: { displayText: '👤 Owner' }, type: 1 },
    { buttonId: '.info', buttonText: { displayText: 'ℹ️ Info Bot' }, type: 1 }
  ]

  const message = {
    image: { url: 'https://peyimpanan.vercel.app/1758556822155.jpg' },
    caption: teks,
    footer: global.info?.namabot || 'Asuma Bot',
    buttons,
    headerType: 1
  }

  await Ditss.sendMessage(m.chat, message, { quoted: m })
}

handler.command = ['menu', 'help']
handler.tags = ['main']
handler.help = ['menu']

export default handler
