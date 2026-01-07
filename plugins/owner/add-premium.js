let handler = async (m, { conn: Ditss, text }) => {
  try {
    if (!text) return m.reply('Contoh: .addprem 628xxx 30d atau .addprem @tag 30d')
    
    let target
    let durasiText = ''
    
    if (m.mentionedJid && m.mentionedJid[0]) {
      target = m.mentionedJid[0]
      durasiText = text.replace(/@[0-9\+\-\(\) ]+/g, '').trim()
    } else {
      let parts = text.split(' ')
      let num = parts[0].replace(/\D/g, '')
      if (!num) return m.reply('Nomor tidak valid')
      target = num + '@s.whatsapp.net'
      durasiText = parts.slice(1).join(' ')
    }
    
    if (!target.includes('@s.whatsapp.net')) return m.reply('Format nomor tidak valid: coba gunakan nomor (628xxxx)')
    
    let durasiMatch = durasiText.match(/\d+\s*(d|w|m|y)/i)
    if (!durasiMatch) return m.reply('Format durasi salah! Contoh: 7d, 2w, 1m, 1y')
    
    let num = parseInt(durasiMatch[0])
    let unit = durasiMatch[1].toLowerCase()
    let time = num * 24 * 60 * 60 * 1000
    
    if (unit === 'w') time = num * 7 * 24 * 60 * 60 * 1000
    else if (unit === 'm') time = num * 30 * 24 * 60 * 60 * 1000
    else if (unit === 'y') time = num * 365 * 24 * 60 * 60 * 1000
    
    if (!global.db.premium) global.db.premium = []
    
    let now = Date.now()
    let existing = global.db.premium.find(p => p.jid === target)
    let base = existing && existing.expired > now ? existing.expired : now
    let expired = base + time
    
    if (existing) {
      existing.expired = expired
      existing.addedBy = m.sender
      existing.date = Date.now()
    } else {
      global.db.premium.push({
        jid: target,
        expired: expired,
        addedBy: m.sender,
        date: Date.now()
      })
    }
    
    if (!global.db.users[target]) {
      global.db.users[target] = {
        name: target.split('@')[0],
        joinDate: new Date().toISOString(),
        id: target,
        vip: false,
        premium: true,
        ban: false,
        register: false,
        limit: 20,
        money: 5000,
        exp: 100,
        level: 1,
        jid: target
      }
    } else {
      global.db.users[target].premium = true
    }
    
    let expiredDate = new Date(expired).toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
    
    let action = existing ? 'diperpanjang' : 'ditambahkan'
    m.reply(`Premium berhasil ${action} untuk @${target.split('@')[0]}\nDurasi: ${num}${unit}\nExpired: ${expiredDate}`)
  } catch (e) {
    m.reply(e.message)
  }
}

handler.help = ['addprem']
handler.command = ['addprem', 'addpremium']
handler.tags = ['owner']
handler.owner = true

export default handler
