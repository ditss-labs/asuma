import { exec as _exec } from 'child_process'
import { promisify } from 'util'

const exec = promisify(_exec)

let speedtest = async (m) => {
  m.reply('⏳ Testing speed...')

  try {
    let { stdout, stderr } = await exec('python3 speed.py --share')

    if (stdout?.trim()) m.reply(stdout)
    if (stderr?.trim()) m.reply(stderr)
  } catch (e) {
    let stdout = e?.stdout || ''
    let stderr = e?.stderr || e?.message || ''

    if (stdout.trim()) m.reply(stdout)
    if (stderr.trim()) m.reply(stderr)
  }
}

speedtest.help = ['speedtest', 'speed']
speedtest.tags = ['tools']
speedtest.command = ['speedtest', 'speed']

export default speedtest
