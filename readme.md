
<p align="center">
  <img src="https://api-ditss.vercel.app/page/IMG-20250312-WA0045.png" alt="Asuma Bot Logo" width="200" height="200"/><br/>
  <h1 align="center">🤖 Asuma Multi Device (ESM)</h1>
  <p align="center">
    <i>Modern WhatsApp Bot Framework - Built with ❤️ by Ditss</i>
  </p>
</p>

<p align="center">
  <a href="https://github.com/ditss-labs/asuma/stargazers">
    <img src="https://img.shields.io/github/stars/ditss-labs/asuma?style=for-the-badge&color=yellow&logo=starship" alt="Stars"/>
  </a>
  <a href="https://github.com/ditss-labs/asuma/network/members">
    <img src="https://img.shields.io/github/forks/ditss-labs/asuma?style=for-the-badge&color=green&logo=git" alt="Forks"/>
  </a>
  <a href="https://github.com/ditss-labs/asuma/issues">
    <img src="https://img.shields.io/github/issues/ditss-labs/asuma?style=for-the-badge&color=blue&logo=github" alt="Issues"/>
  </a>
  <a href="https://github.com/ditss-labs/asuma/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/ditss-labs/asuma?style=for-the-badge&color=orange&logo=open-source-initiative" alt="License"/>
  </a>
  <a href="https://nodejs.org">
    <img src="https://img.shields.io/badge/Node.js-20.x+-green?style=for-the-badge&logo=node.js" alt="Node.js"/>
  </a>
</p>

<div align="center">
  
  ![GitHub last commit](https://img.shields.io/github/last-commit/ditss-labs/asuma?style=flat-square&color=9cf)
  ![GitHub repo size](https://img.shields.io/github/repo-size/ditss-labs/asuma?style=flat-square&color=9cf)
  ![GitHub contributors](https://img.shields.io/github/contributors/ditss-labs/asuma?style=flat-square&color=9cf)
  ![GitHub Release](https://img.shields.io/github/v/release/ditss-labs/asuma?style=flat-square&color=9cf)

</div>

---

## 🎯 **Overview**

<div align="center">
  
  **Asuma Multi Device** adalah framework WhatsApp Bot modern yang dibangun menggunakan **ECMAScript Modules (ESM)** dengan struktur kode yang bersih, modular, dan mudah dikembangkan. Kembali setelah pensi 4 bulan dengan versi yang lebih stabil dan powerful!

</div>

<details>
<summary><b>📊 Status Project</b></summary>

| Aspect | Status | Details |
|--------|--------|---------|
| **Stability** | ✅ **STABLE** | Production-ready v1.1.5 |
| **Multi Device** | ✅ **SUPPORTED** | Full Baileys MD Support |
| **Performance** | ⚡ **OPTIMIZED** | 40% faster than previous versions |
| **Community** | 👥 **ACTIVE** | 24/7 Telegram Support |
| **Maintenance** | 🔄 **REGULAR** | Monthly updates & bug fixes |

</details>

---

## ✨ **Features**

<details>
<summary><b>🚀 Core Features</b></summary>

- ✅ **Multi Device Support** - One bot, multiple devices
- ✅ **Modern ESM Structure** - Clean, modular, and scalable
- ✅ **Plugins System** - Easy to add custom commands
- ✅ **Auto-Reconnect** - Stable connection with WhatsApp Web
- ✅ **Button Support** - Native WhatsApp buttons and templates
- ✅ **Database Options** - JSON, MongoDB, or cloud-based
- ✅ **Error Handling** - Comprehensive error reporting and recovery
- ✅ **Auto-Updater** - Automatic version checking and updates

</details>

<details>
<summary><b>🎨 Advanced Features</b></summary>

- 🎯 **AI Integration** - Support for various AI providers
- 🎮 **Game System** - Built-in mini-games and leaderboards
- 📊 **Analytics** - Usage statistics and performance metrics
- 🔒 **Security** - Session protection and anti-spam measures
- 🌐 **Web Dashboard** - Control panel for bot management
- 🧩 **Plugin Marketplace** - Community-driven plugins system

</details>

---

## 🎥 **Demo & Screenshots**

<details>
<summary><b>📱 Live Demo</b></summary>

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/ditss-cloud/asuma.esm/main/assets/demo-menu.png" width="300" alt="Main Menu"/>
        <br/><b>Main Menu</b>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/ditss-cloud/asuma.esm/main/assets/demo-button.gif" width="300" alt="Button Demo"/>
        <br/><b>Interactive Buttons</b>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://api-ditss.vercel.app/page/demo-sticker.gif" width="300" alt="Sticker Maker"/>
        <br/><b>Sticker Creator</b>
      </td>
      <td align="center">
        <img src="https://api-ditss.vercel.app/page/demo-downloader.gif" width="300" alt="Downloader"/>
        <br/><b>Media Downloader</b>
      </td>
    </tr>
  </table>
  
  <p><i>🎬 More demos available in <a href="https://github.com/ditss-cloud/asuma.esm/wiki/Demo">Wiki Demo Section</a></i></p>
</div>

</details>

---

## 🚀 **Quick Start**

<details>
<summary><b>⚡ Installation (One-Line)</b></summary>

```bash
# Quick Install (All-in-one)
git clone https://github.com/ditss-labs/asuma && cd asuma && npm install && node index.js
```

</details>

<details>
<summary><b>📦 Manual Installation</b></summary>

```bash
# 1. Clone Repository
git clone https://github.com/ditss-labs/asuma.git
cd asuma

# 2. Install Dependencies
npm install

# 3. Configure (Optional)
# Edit config.js according to your needs

# 4. Start Bot
node index.js

# 5. Scan QR Code
# Open WhatsApp → Linked Devices → Scan QR Code
```

</details>

<details>
<summary><b>🐳 Docker Installation</b></summary>

```bash
# Using Docker Compose (Recommended)
docker-compose up -d

# Or using Docker directly
docker run -d \
  --name asuma-bot \
  -v $(pwd)/data:/app/data \
  ditss/asuma:latest
```

</details>

---

📁 Project Structure

```bash
asuma-esm/
├── 📁 lib/                 # Core libraries & utilities
│   ├── sticker.js          # Sticker creation handler
│   ├── fetchBuffer.js      # Media fetching utilities
│   ├── myfunction.js       # Common functions
│   ├── 📁 ai/              # AI integration modules
│   ├── 📁 func/            # Functional utilities
│   └── 📁 utils/           # Helper utilities
├── 📁 plugins/             # Command plugins
│   ├── admin.js            # Admin commands
│   ├── downloader.js       # Media downloaders
│   ├── game.js             # Game commands
│   └── tools.js            # Utility tools
├── 📁 database/            # Data storage
│   ├── baileys_store.json  # Session storage
│   ├── database.json       # Main database
│   └── 📁 sampah/          # Temporary files
├── 📁 source/              # Backend services
│   ├── dashboard.js        # Web dashboard
│   ├── database.js         # Database handler
│   └── server.js           # HTTP server
├── 📁 assets/              # Media assets
├── index.js               # Main entry point
├── WhatsApp.js            # Core handler
├── config.js             # Configuration file
└── package.json
```

---

⚙️ Configuration

<details>
<summary><b>🔧 Basic Configuration</b></summary>

Edit config.js to customize your bot:

```javascript
// config.js - Basic Configuration
export default {
  // Bot Information
  name: 'Asuma Bot',
  version: '1.1.5',
  author: 'Ditss',
  
  // Owner Settings
  owner: ['6281513607731'], // WhatsApp numbers
  ownerName: 'Ditss',
  
  // Database Settings
  database: {
    type: 'json', // 'json', 'mongodb', or 'mysql'
    path: './database'
  },
  
  // Bot Settings
  prefix: '.', // Command prefix
  session: 'session', // Session folder
  maxUpload: 100, // MB
  
  // API Keys
  api: {
    ditss: 'https://api-ditss.vercel.app',
    openai: 'your-openai-key',
    gemini: 'your-gemini-key'
  }
};
```

</details>

<details>
<summary><b>🎯 Advanced Configuration</b></summary>

```javascript
// Advanced Features Configuration
export default {
  // Performance Settings
  performance: {
    maxConcurrent: 5,
    timeout: 30000,
    retryAttempts: 3
  },
  
  // Security Settings
  security: {
    antiSpam: true,
    maxCommandsPerMinute: 10,
    blacklist: [],
    whitelist: []
  },
  
  // Plugin System
  plugins: {
    autoLoad: true,
    watchMode: false,
    pluginDir: './plugins'
  },
  
  // Web Dashboard
  dashboard: {
    enabled: true,
    port: 3000,
    auth: {
      username: 'admin',
      password: 'password'
    }
  }
};
```

</details>

---

💻 Usage Examples

<details>
<summary><b>🔄 Creating Commands</b></summary>

Method 1: Case Handler (WhatsApp.js)

```javascript
// Case-based command handling
export default async function handler(m, { conn, args }) {
  switch (m.command) {
    case 'ping':
      await m.reply('🏓 Pong!');
      break;
      
    case 'sticker':
      if (m.quoted) {
        const buffer = await m.downloadMedia();
        await conn.sendSticker(m.chat, buffer, {}, m);
      }
      break;
      
    case 'menu':
      const menu = `
🤖 *ASUMA BOT MENU*

🛠️ *TOOLS*
• .sticker - Create sticker
• .ttp <text> - Text to sticker
• .toimg - Sticker to image

🎮 *GAMES*
• .tebakgambar - Guess picture
• .asahotak - Brain teaser
• .suit <choice> - Rock paper scissors

📥 *DOWNLOADER*
• .ytmp4 <url> - Download YouTube video
• .ytmp3 <url> - Download YouTube audio
• .tiktok <url> - Download TikTok
      `;
      await m.reply(menu);
      break;
  }
}
```

Method 2: Plugin System

```javascript
// plugins/mycommand.js
export default {
  name: 'mycommand',
  command: ['hello', 'hi'],
  description: 'Say hello to the bot',
  usage: '.hello',
  category: 'general',
  
  async execute(m, { conn }) {
    const name = m.pushName || 'User';
    await m.reply(`👋 Hello ${name}! I'm Asuma Bot v1.1.5`);
  }
};
```

</details>

<details>
<summary><b>🔗 WebSocket Events</b></summary>

```javascript
// Handling WebSocket events
conn.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0];
  
  // Auto-read messages
  await conn.sendReadReceipt(m.key.remoteJid, m.key.participant, [m.key.id]);
  
  // Auto-reply to specific messages
  if (m.message?.conversation?.toLowerCase().includes('hello')) {
    await conn.sendMessage(m.key.remoteJid, {
      text: 'Hello there! 👋'
    });
  }
});

// Connection status
conn.ev.on('connection.update', (update) => {
  const { connection, lastDisconnect } = update;
  
  if (connection === 'close') {
    console.log('Connection closed, reconnecting...');
    // Auto-reconnect logic
  }
  
  if (connection === 'open') {
    console.log('✅ Connected to WhatsApp');
  }
});
```

</details>

---

🚀 Deployment

<details>
<summary><b>☁️ VPS Deployment</b></summary>

Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start bot with PM2
pm2 start index.js --name "asuma-bot"

# Save PM2 process list
pm2 save

# Setup auto-start on boot
pm2 startup

# Monitor bot
pm2 monit

# View logs
pm2 logs asuma-bot
```

Using Systemd

```bash
# Create service file
sudo nano /etc/systemd/system/asuma.service

# Content:
[Unit]
Description=Asuma WhatsApp Bot
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/home/user/asuma
ExecStart=/usr/bin/node /home/user/asuma/index.js
Restart=always

[Install]
WantedBy=multi-user.target

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable asuma
sudo systemctl start asuma
```

</details>

<details>
<summary><b>🌐 Hosting Platforms</b></summary>

Platform Guide Notes
Railway Deploy Guide Free tier available
Heroku Deploy Guide Requires credit card
Replit Deploy Guide Easy, but limited
VPS VPS Setup Full control

</details>

---

📚 Documentation

<details>
<summary><b>🔍 API Reference</b></summary>

Core Methods

```javascript
// Message sending
conn.sendMessage(jid, content, options);

// Group management
conn.groupParticipantsUpdate(jid, participants, 'add');
conn.groupUpdateSubject(jid, 'New Group Name');

// Profile management
conn.updateProfileStatus('Online and ready!');
conn.updateProfilePicture(jid, buffer);

// Media handling
conn.sendImage(jid, buffer, caption, quoted);
conn.sendVideo(jid, buffer, caption, quoted);
conn.sendAudio(jid, buffer, quoted, ptt);
```

Available Libraries

· Baileys MD: @whiskeysockets/baileys
· MongoDB: mongoose or mongodb
· Web Server: express + socket.io
· Utilities: axios, form-data, cheerio

</details>

<details>
<summary><b>📖 Full Documentation</b></summary>

📚 Complete Documentation Wiki

🎓 Tutorial Series

🔧 API Reference

🐛 Troubleshooting Guide

</details>

---

❓ FAQ

<details>
<summary><b>🤔 Common Questions</b></summary>

❓ Q: Bot not starting?

A: Check:

1. Node.js version (must be 20+): node --version
2. Dependencies: npm install
3. Port availability: Ensure port 3000 is free
4. Session folder: Delete session folder and rescan QR

❓ Q: How to update bot?

A:

```bash
git pull origin main
npm install
pm2 restart asuma-bot
```

❓ Q: Bot keeps disconnecting?

A:

1. Check internet stability
2. Use pm2 or forever for auto-restart
3. Update to latest version
4. Check WhatsApp connection limits

❓ Q: How to backup sessions?

A:

```bash
# Backup session folder
tar -czf session-backup.tar.gz session/

# Restore
tar -xzf session-backup.tar.gz
```

</details>

<details>
<summary><b>⚠️ Troubleshooting</b></summary>

Error Solution
QR Code not showing Clear session folder and restart
Connection timeout Check firewall/port settings
Message not sending Verify WhatsApp connection
Media download failed Check internet and API keys
Database error Verify database connection

</details>

---

🤝 Contributing

<details>
<summary><b>👥 How to Contribute</b></summary>

We love contributions! Here's how:

1. Fork the repository
2. Create a feature branch: git checkout -b feature/AmazingFeature
3. Commit changes: git commit -m 'Add AmazingFeature'
4. Push to branch: git push origin feature/AmazingFeature
5. Open a Pull Request

Contribution Guidelines:

· ✅ Follow existing code style
· ✅ Add comments for complex logic
· ✅ Update documentation
· ✅ Test before submitting

Need Help?

· Join Telegram Group
· Check Contributing Guide

</details>

---

⚠️ Rules & Security

<details>
<summary><b>📜 Usage Rules</b></summary>

✅ Allowed:

· Personal and commercial use
· Modifying source code
· Creating derivative works
· Redistribution with credit

❌ Prohibited:

· Spamming or harassment
· Illegal activities
· Spreading malware
· Commercial resale without permission

🔒 Security Notice:

⚠️ WARNING: Avoid using untrusted panels like Pterodactyl clones! Many contain backdoors that can compromise your bot and get your WhatsApp number permanently banned. Always use trusted hosting services.

</details>

<details>
<summary><b>🔐 Security Features</b></summary>

Built-in Security:

· ✅ Session Encryption - Securely stored sessions
· ✅ Anti-Spam - Rate limiting and flood control
· ✅ Input Validation - Sanitized user input
· ✅ Secure APIs - Encrypted API communications

Security Best Practices:

1. Never share your session files
2. Always use environment variables for API keys
3. Regularly update to latest version
4. Monitor bot activity and logs
5. Backup important data regularly

</details>

---

💖 Support & Donation

<details>
<summary><b>❤️ Support the Project</b></summary>

Direct Support:

· 💰 Saweria
· ☕ Trakteer
· 📦 GitHub Sponsors

Community Support:

· 💬 Telegram Group
· 🐛 Issue Tracker
· 📚 Discussions

Contact Developer:

· 📱 WhatsApp: +62 815-1360-7731
· ✈️ Telegram: @ditss
· 🐦 Twitter: @ditss_dev

</details>

---

🙏 Special Thanks

<details>
<summary><b>🌟 Credits & Acknowledgments</b></summary>

Core Technologies:

Technology Creator Purpose
Baileys MD adiwajshing WhatsApp Web API
Node.js Ryan Dahl Runtime Environment
WhatsApp Meta Platforms Communication Platform

Contributors:

<a href="https://github.com/ditss-labs/asuma/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ditss-labs/asuma" />
</a>

Special Mentions:

· All beta testers and early adopters
· Open source community
· Everyone who reported bugs and suggested features

</details>



📄 License

<details>
<summary><b>📝 MIT License</b></summary>

```text
MIT License

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

</details>



<div align="center">

🌟 Star History

https://api.star-history.com/svg?repos=ditss-labs/asuma&type=Date



🚀 Ready to Build?

https://img.shields.io/badge/Deploy_Now-25D366?style=for-the-badge&logo=whatsapp&logoColor=white
https://img.shields.io/badge/Join_Community-0088cc?style=for-the-badge&logo=telegram&logoColor=white



Made with ❤️ by Ditss • Version 1.1.5 • Stable Release

</div>
