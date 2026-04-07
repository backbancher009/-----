const axios = require("axios");

module.exports = {
  config: {
    name: 'help',
    aliases: ['menu'],
    permission: 0,
    prefix: true,
    description: 'Ultra futuristic menu system',
    category: 'Utility',
    credit: 'XAHID PRIME 🍷',
  },

  start: async ({ event, api, args, loadcmd }) => {
    const { threadId, getPrefix } = event;

    const commands = loadcmd.map(cmd => cmd.config);
    const prefix = await getPrefix(threadId);
    const timezone = global.config.timeZone || "Asia/Dhaka";

    const time = new Date().toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    const date = new Date().toLocaleDateString("en-US", {
      timeZone: timezone,
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    // 📌 CATEGORY BUILD
    const categories = {};
    commands.forEach(cmd => {
      const cat = cmd.category || cmd.categorie || "📦 Other";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.name);
    });

    // 🔍 SINGLE COMMAND
    if (args[0]) {
      const cmd = commands.find(c => c.name === args[0]);
      if (!cmd) return api.sendMessage(threadId, { text: "❌ Command not found!" });

      return api.sendMessage(threadId, {
        text:
`╭━━━〔 ⚡ COMMAND DETAILS ⚡ 〕━━━╮
┃ 🧩 Name      : ${cmd.name}
┃ 🔁 Aliases   : ${cmd.aliases?.join(", ") || "None"}
┃ 📝 Details   : ${cmd.description || "No description"}
┃ ⚙️ Usage     : ${cmd.usages?.join(" , ") || "N/A"}
┃ 🔐 Permission: ${cmd.permission}
┃ 👑 Credit    : ${cmd.credit}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`
      });
    }

    // 🚀 MAIN MENU UI
    let text = `
╔══════════════════════╗
   🚀 𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓 𝐒𝐘𝐒𝐓𝐄𝐌 🚀
╚══════════════════════╝

👑 Owner   : ${global.config.botOwner}
🤖 Bot     : ${global.config.botName}
🌐 Prefix  : ${prefix}
⚡ Version : ${global.pkg.version}
⏰ Time    : ${time}
📅 Date    : ${date}

━━━━━━━━━━━━━━━━━━━━━━━
📦 TOTAL COMMANDS ➜ ${commands.length}
━━━━━━━━━━━━━━━━━━━━━━━
`;

    for (const cat in categories) {
      text += `\n╭─〔 ${cat} 〕\n`;
      categories[cat].forEach(cmd => {
        text += `│ ✧ ${prefix}${cmd}\n`;
      });
      text += `╰───────────────╯\n`;
    }

    text += `
━━━━━━━━━━━━━━━━━━━━━━━━
⚡ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐒𝐓𝐀𝐓𝐔𝐒: 𝐎𝐍𝐋𝐈𝐍𝐄 ⚡
💀 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓 🍷
━━━━━━━━━━━━━━━━━━━━━━━━`;

    try {
      const res = await axios.get(global.config.helpPic, { responseType: 'stream' });
      await api.sendMessage(threadId, {
        image: { stream: res.data },
        caption: text
      });
    } catch {
      await api.sendMessage(threadId, { text });
    }
  }
};
