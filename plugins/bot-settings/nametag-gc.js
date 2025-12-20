let setlabel = async (m, { conn: Ditss, text, command, usedPrefix, reply }) => {
  if (!m.isGroup) return reply("❌ Khusus grup");
  if (!text) return reply(`Contoh:\n${usedPrefix + command} @user Admin Ganteng`);

  let who = m.mentionedJid?.[0];
  if (!who) return reply("❌ Tag user yang mau dikasih label");

  let label = text.replace(/@\d+/g, "").trim();
  if (!label) return reply("❌ Teks label tidak boleh kosong");

  // pesan loading
  let msg = await Ditss.sendMessage(
    m.chat,
    { text: "*Applying label...*" },
    { quoted: m }
  );

  try {
    await Ditss.relayMessage(
      m.chat,
      {
        protocolMessage: {
          type: 30,
          memberLabel: {
            jid: who,
            label,
            labelTimestamp: Date.now()
          }
        }
      },
      {}
    );

    await Ditss.sendMessage(m.chat, {
      edit: msg.key,
      text: `✅ *Label berhasil diterapkan!*\n@${who.split("@")[0]} → *${label}*`,
      mentions: [who]
    });
  } catch (e) {
    await Ditss.sendMessage(m.chat, {
      edit: msg.key,
      text: `❌ *Gagal set label*\n${e}`
    });
  }
};

setlabel.help = ["setlabel", "editlabel"];
setlabel.tags = ["group", "admin"];
setlabel.command = ["setlabel", "editlabel"];
setlabel.admin = true;
setlabel.botAdmin = true;

export default setlabel;
