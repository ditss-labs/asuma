<p align="center">
  <img src="https://api-ditss.vercel.app/page/IMG-20250312-WA0045.png" alt="AsumaBot Logo" width="180"/><br/>
  <b>ASUMA TOKI - WhatsApp Multi Device Bot</b><br/>
  <i>Stable | Powerful | Konsisten</i>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/ditss-labs/asuma?style=for-the-badge&color=25D366" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/ditss-labs/asuma?style=for-the-badge&color=128C7E" alt="Forks"/>
  <img src="https://img.shields.io/github/last-commit/ditss-labs/asuma?style=for-the-badge&color=075E54" alt="Last Commit"/>
  <img src="https://img.shields.io/github/license/ditss-labs/asuma?style=for-the-badge&color=34B7F1" alt="License"/>
  <img src="https://img.shields.io/badge/version-1.1.5-stable?style=for-the-badge&color=25D366" alt="Version"/>
</p>

---

## 🎉 SELAMAT DATANG KEMBALI!

Setelah **pensi hampir 4 bulan**, Asuma Toki kini hadir kembali dengan versi yang lebih **stabil, lebih cepat, dan lebih powerful**! Dibangun ulang dari nol dengan fokus pada **stabilitas dan keamanan**.

---

## 📱 Halaman Web Resmi

Kunjungi halaman web resmi untuk informasi lengkap:  
**[asuma.ditss.cloud](https://asuma.ditss.cloud)** atau **[ditss-labs.github.io/asuma](https://ditss-labs.github.io/asuma)**

---

## 🚀 Fitur Utama

### 🔥 **Fitur Unggulan**
- ✅ **Multi Device Support** - Tanpa perlu scan QR berulang
- ⚡ **Super Cepat** - Optimasi performa 40% lebih baik
- 🛡️ **Stabil & Aman** - Versi konsisten setelah pensi 4 bulan
- 🎮 **Fitur Lengkap** - 100+ command dalam satu bot
- 🔄 **Auto Update** - Sistem pembaruan otomatis
- 🎯 **24/7 Support** - Komunitas aktif siap membantu

### 🏗️ **Spesifikasi Teknis**
- **Base Library**: Baileys Multi Device
- **Runtime**: Node.js v16+
- **Database**: JSON / MongoDB (opsional)
- **Platform**: Termux, Linux, Windows, VPS, Panel
- **Bahasa**: JavaScript (Node.js)
- **Protokol**: WebSocket Multi Device

---

## 📦 Instalasi Cepat

### **Termux / Linux / VPS**
```bash
git clone https://github.com/ditss-labs/asuma
cd asuma
npm install
node index.js
```

Windows

1. Install Node.js (v16 atau lebih tinggi)
2. Download repository
3. Buka CMD/PowerShell di folder bot
4. Jalankan:

```bash
npm install
node index.js
```

---

⚙️ Konfigurasi

Edit file config.js sesuai kebutuhan:

```javascript
global.owner = "628xxxxxxxxxx" // Nomor WhatsApp owner
global.namabot = "Asuma Bot"
global.namaowner = "Ditss"

global.ress = {
    wait: '⏳ Mohon tunggu...',
    error: '❌ Terjadi kesalahan!',
    done: '✅ Berhasil!',
    limit: '⏸️ Limit Anda telah habis!',
    premium: '⭐ Fitur khusus user premium!',
    owner: '👑 Fitur khusus owner!',
    admin: '⚡ Fitur khusus admin grup!'
}
```

---

📋 RULES PENGGUNAAN SCRIPT

🚫 Yang Tidak Diperbolehkan:

1. Jangan menyebarluaskan source code tanpa izin resmi dari developer
2. Tidak boleh digunakan untuk spam, penipuan, atau aktivitas ilegal lainnya
3. Kami tidak bertanggung jawab atas penggunaan script yang melanggar ketentuan WhatsApp
4. JANGAN menggunakan panel Pterodactyl abal-abal yang berisiko tinggi terhadap keamanan!

✅ Yang Diperbolehkan:

1. Diperbolehkan memodifikasi source code untuk keperluan pribadi maupun komersial
2. Dapat dikembangkan sesuai kebutuhan dengan tetap menyertakan kredit
3. Bergabung dengan komunitas untuk dukungan dan diskusi

---

🔒 KEAMANAN & PRIVACY

✅ Keamanan Terjamin:

· Source code Asuma tidak menyimpan atau mengirimkan data pribadi ke server eksternal
· Bot hanya berjalan di perangkat Anda dan sepenuhnya dikendalikan oleh Anda
· Tidak ada backdoor atau kode berbahaya dalam script

⚠️ Perhatian Penting:

· Jangan simpan informasi sensitif seperti token API atau kredensial akun dalam file konfigurasi
· Backup session data secara berkala untuk menghindari kehilangan data
· Gunakan versi terbaru untuk mendapatkan perbaikan keamanan terupdate

---

🆘 SUPPORT & KOMUNITAS

📞 Kontak Developer:

· Nama: Ditss (Aditia Nugraha Putra)
· GitHub: ditss
· Telegram: @ditss

💬 Komunitas Support:

· GitHub Discussions: Diskusi & Bantuan
· Telegram Group: @AsumaBotSupport
· Issue Tracker: Laporkan Bug

📚 Dokumentasi:

· Dokumentasi Lengkap: Baca di GitHub
· Changelog: Lihat Perubahan

---

🌟 CHANGELOG v1.1.5

✨ Fitur Baru:

· Dukungan penuh multi device
· Sistem auto-reconnect yang lebih stabil
· 100+ command baru
· Plugin system modular
· Auto updater otomatis

🐛 Perbaikan Bug:

· Perbaikan memory leak
· Optimasi performa 40% lebih cepat
· Perbaikan error handler
· Stabilisasi koneksi WebSocket

🔧 Perubahan Teknis:

· Migrasi ke Baileys Multi Device
· Restrukturisasi kode modular
· Improve error reporting
· Better session management

---

👥 SPECIAL THANKS

🙏 Credits & Attribution:

· WhatsApp - Platform yang membuat semua ini mungkin
· Baileys - Library WhatsApp Web API oleh adiwajshing
· Node.js - Runtime JavaScript yang powerful
· Komunitas Open Source - Semua kontributor dan library pendukung

🤝 Kontributor:

Terima kasih kepada semua kontributor yang telah membantu pengembangan Asuma Bot.
Lihat daftar lengkap kontributor di halaman contributors.

---

📄 LISENSI

MIT License

```
Copyright (c) 2023-2024 Ditss (Aditia Nugraha Putra)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

📝 Syarat Lisensi:

1. Anda bebas menggunakan, memodifikasi, dan mendistribusikan
2. Wajib menyertakan kredit kepada developer asli
3. Tidak ada garansi atau tanggung jawab dari developer
4. Gunakan dengan bijak dan bertanggung jawab

---

💖 SUPPORT DEVELOPER

Bantu project ini agar terus berkembang dan mendapatkan update terbaru:

· Saweria: saweria.co/ditss
· Trakteer: trakteer.id/ditss
· Contact: WhatsApp Owner

---

📊 STATISTIK PROJECT

· Stars: https://img.shields.io/github/stars/ditss-labs/asuma
· Forks: https://img.shields.io/github/forks/ditss-labs/asuma
· Issues: https://img.shields.io/github/issues/ditss-labs/asuma
· Pull Requests: https://img.shields.io/github/issues-pr/ditss-labs/asuma
· License: MIT

---

🎯 KESIMPULAN

Asuma Multi Device Bot adalah solusi lengkap untuk kebutuhan WhatsApp automation dengan:

· Stabilitas terjamin setelah pengembangan ulang total
· Keamanan prima tanpa data leakage
· Fitur lengkap dengan 100+ command
· Support 24/7 dari komunitas aktif
· Gratis & Open Source dengan lisensi MIT

Dibangun kembali dengan ❤️, kini dengan versi konsisten yang lebih baik!

---

<p align="center">
  <sub>Copyright © 2023-2024 Ditss (Aditia Nugraha Putra) | All Rights Reserved</sub><br/>
  <sub>Repository: <a href="https://github.com/ditss-labs/asuma">ditss-labs/asuma</a> | Website: <a href="https://asuma.ditss.cloud">asuma.ditss.cloud</a></sub>
</p>
