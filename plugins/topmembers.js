  const fs = require("fs");
const path = require("path");

// 📁 Data file
const dataFilePath = path.join(__dirname, "..", "Nayan", "data", "messageCount.json");

// 📥 Load data
function loadMessageCounts() {
  if (fs.existsSync(dataFilePath)) {
    return JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  }
  return {};
}

// 📤 Save data
function saveMessageCounts(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// ➕ Count messages
function incrementMessageCount(groupId, userId) {
  const data = loadMessageCounts();

  if (!data[groupId]) data[groupId] = {};
  if (!data[groupId][userId]) data[groupId][userId] = 0;

  data[groupId][userId]++;
  saveMessageCounts(data);
}

// 🏆 Leaderboard
async function topMembers({ sock, chatId, isGroup, limit }) {
  if (!isGroup) return;

  const metadata = await sock.groupMetadata(chatId);
  const messageCounts = loadMessageCounts();
  const groupCounts = messageCounts[chatId] || {};

  // 👑 Owner
  const owners = global.config.admin.map(id => id + "@s.whatsapp.net");

  // 🛡️ Admins
  const admins = metadata.participants
    .filter(p => p.admin)
    .map(p => p.id);  let members = Object.entries(groupCounts);

  // ❌ Only remove owner (admin থাকবে)
  members = members.filter(([id]) => !owners.includes(id));

  // 🔥 Sort
  members.sort((a, b) => b[1] - a[1]);

  const finalList = members.slice(0, limit);

  // 🎖️ Badge
  const badge = ["🥇", "🥈", "🥉"];

  let text = `👑 @${owners[0].split("@")[0]}\n\n🏆 𝐓𝐨𝐩 𝐌𝐞𝐦𝐛𝐞𝐫𝐬\n`;

  if (finalList.length === 0) {
    text += "No active members yet.";
  } else {
    finalList.forEach(([id, count], i) => {
      const isAdmin = admins.includes(id);

      text += `${badge[i] || "•"} ${isAdmin ? "🛡️" : ""}@${id.split("@")[0]} - ${count}\n`;
    });
  }

  await sock.sendMessage(chatId, {
    text,
    mentions: [owners[0], ...finalList.map(([id]) => id)]
  });
}

// 📦 Command export
module.exports = {
  config: {
    name: "topmembers",
    aliases: ["top", "leaderboard"],
    permission: 0,
    prefix: true,
    cooldowns: 5,
    description: "Compact leaderboard with admin highlight",
    category: "Utility",
    credit: "XAHID PRIME 🍷",
  },

  // 📊 Message count system
  event: async ({ event }) => {
    const { threadId, senderId, isGroup } = event;
    if (isGroup) {
      incrementMessageCount(threadId, senderId);
    }
  },

  // 🏆 Command run
  start: async ({ event, api, args }) => {
    const { threadId, isGroup } = event;
    if (!isGroup) return;

    const limit = parseInt(args[0]) || 5;

    await topMembers({
      sock: api,
      chatId: threadId,
      isGroup,
      limit
    });
  }
};
