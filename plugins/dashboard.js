const os = require("os");

module.exports = {
  config: {
    name: "dashboard",
    aliases: ["panel", "status"],
    permission: 0,
    prefix: true,
    category: "system"
  },

  start: async ({ api, event }) => {
    try {
      const { threadId } = event;

      const uptime = new Date(process.uptime() * 1000)
        .toISOString()
        .substr(11, 8);

      const now = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka"
      });

      const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
      const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

      const dashboard = `
╔══════════════════════════════╗
        🚀 𝗭𝗔𝗛𝗜𝗗 𝗗𝗔𝗦𝗛𝗕𝗢𝗔𝗥𝗗
╚══════════════════════════════╝

👑 Owner   : ${global.config.botOwner}
🤖 Bot     : ${global.config.botName}
🌐 Prefix  : ${global.config.PREFIX}
⚡ Version : ${global.config.version}

━━━━━━━━━━━━━━━━━━━━━━━
⏰ Time    : ${now}
⏳ Uptime  : ${uptime}
━━━━━━━━━━━━━━━━━━━━━━━

💻 SYSTEM INFO
• Platform : ${os.platform()}
• CPU      : ${os.cpus()[0].model}
• NodeJS   : ${process.version}

━━━━━━━━━━━━━━━━━━━━━━━
🧠 MEMORY
• Total    : ${totalMem} GB
• Free     : ${freeMem} GB
━━━━━━━━━━━━━━━━━━━━━━━

📦 COMMANDS : ${global.commands?.size || "Unknown"}

━━━━━━━━━━━━━━━━━━━━━━━
⚡ STATUS : ONLINE 🟢
━━━━━━━━━━━━━━━━━━━━━━━
`;

      await api.sendMessage(threadId, {
        text: dashboard
      });

    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  }
};
