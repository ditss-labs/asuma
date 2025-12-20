import fs from 'fs'
import os from 'os'
import path from 'path'
import axios from 'axios'
import { fetchJson } from '../../lib/utils/fetchJson.js' 
import { CatBox } from '../../lib/utils/uploader.js'

let enhancer = async (m, { conn: Ditss, usedPrefix, args, command }) => {
  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''
    if (!mime.startsWith('image/')) return m.reply('Mana gambarnya')
    m.reply('Wait...')
    const img = await q.download()
    const form = new FormData()
    form.append('scale', '2')
    form.append('image', new Blob([img], { type: mime }))
    const res = await fetch('https://api2.pixelcut.app/image/upscale/v1', {
      method: 'POST',
      headers: { 'x-client-version': 'web' },
      body: form
    })
    const buffer = Buffer.from(await res.arrayBuffer())
    await Ditss.sendMessage(m.chat, { image: buffer }, { quoted: m })
  } catch (e) {
    m.reply(e.message)
  }
}

enhancer.help = ['remini', 'hd', 'hdr']
enhancer.tags = ['ai', 'tools']
enhancer.command = ['remini', 'hd', 'hdr']
enhancer.limit = 2;

export default enhancer
