let nametag = async (m, { conn: Ditss, text, command, usedPrefix, reply }) => {
  if (!text) return reply(`Example:\n${usedPrefix + command} Orang Sikma`);

  const anjay = await Ditss.sendMessage(
    m.chat,
    { text: "*Loading...*" },
    { quoted: m }
  );

  try {
    await Ditss.relayMessage(
      m.chat,
      {
        protocolMessage: {
          type: 30,
          memberLabel: {
            label: text,
            labelTimestamp: Date.now()
          }
        }
      },
      {}
    );

    await Ditss.sendMessage(
      m.chat,
      {
        edit: anjay.key,
        text: "*Label successfully applied!*"
      }
    );
  } catch (e) {
    await Ditss.sendMessage(
      m.chat,
      {
        edit: anjay.key,
        text: `❌ Error:\n${e}`
      }
    );
  }
};

nametag.help = ["label"];
nametag.tags = ["owner"];
nametag.command = ["label", "setlabel"];
nametag.owner = true;

export default nametag;
