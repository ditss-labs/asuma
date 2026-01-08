let restart = async (m, { conn: Ditss }) => {
  if (!m.isCreator) return m.reply('❌ Hanya owner yang bisa restart bot!')
  
  const restartMessage = '*[ Notice ]* bot sedang dalam proses restart, harap untuk tidak mengirim perintah saat proses restart di lakukan, kym akan segera aktif kembali!'
  
  await m.reply('🔄 *Restarting bot...*\nMohon tunggu 3-5 detik...')
  
  setTimeout(() => {
    process.exit()
  }, 3000)
}

restart.help = ['restart']
restart.tags = ['owner']
restart.command = ['restart', 'reboot']

export default restart
