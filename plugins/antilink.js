const setAntilinkSetting = global.setAntilinkSetting;
const getAntilinkSetting = global.getAntilinkSetting;

// ⚡ pre-compiled regex (faster)
const patterns = {
  whatsappGroup: /chat\.whatsapp\.com\/\S+/i,
  whatsappChannel: /wa\.me\/channel\/\S+/i,
  telegram: /t\.me\/\S+/i,
  allLinks: /(https?:\/\/|www\.)\S+/i
};

module.exports = {
  config: {
    name: 'antilink',
    aliases: ['al'],
    permission: 2,
    prefix: true,
    categorie: 'Moderation',
    description: 'Ultra fast antilink kick system'
  },

  // ⚙️ COMMAND (unchanged logic)
  start: async ({ event, api, args }) => {
    const { threadId, isSenderAdmin } = event;

    if (!isSenderAdmin) {
      return api.sendMessage(threadId, { text: '🚫 Admin only!' });
    }

    const cmd = args[0]?.toLowerCase();

    const map = {
      off: 'off',
      whatsapp: 'whatsappGroup',
      whatsappchannel: 'whatsappChannel',
      telegram: 'telegram',
      all: 'allLinks'
    };

    if (!cmd || !map[cmd]) {
      return api.sendMessage(threadId, {
        text: `📌 Use:
antilink off
antilink whatsapp
antilink whatsappchannel
antilink telegram
antilink all`
      });
    }

    setAntilinkSetting(threadId, map[cmd]);

    return api.sendMessage(threadId, {
      text: `⚡ Antilink → ${cmd}`
    });
  },

  // ⚡ ULTRA FAST EVENT
  event: async ({ event, api }) => {
    try {
      const { threadId, senderId, message } = event;

      // 👉 only group
      if (!threadId.endsWith("@g.us")) return;

      const setting = getAntilinkSetting(threadId);
      if (!setting || setting === 'off') return;

      // ⚡ FAST TEXT PARSE
      const msg = message?.message;
      const body =
        msg?.conversation ||
        msg?.extendedTextMessage?.text ||
        msg?.imageMessage?.caption ||
        msg?.videoMessage?.caption;

      if (!body) return;

      // ⚡ DIRECT PATTERN MATCH
      const pattern = patterns[setting];
      if (!pattern || !pattern.test(body)) return;

      // ⚡ DELETE + KICK PARALLEL (SUPER FAST)
      const deletePromise = api.sendMessage(threadId, {
        delete: {
          remoteJid: threadId,
          fromMe: false,
          id: message.key.id,
          participant: message.key.participant || senderId
        }
      });

      const kickPromise = api.groupParticipantsUpdate(threadId, [senderId], "remove");

      await Promise.allSettled([deletePromise, kickPromise]);

    } catch (err) {
      console.log("Ultra Fast AntiLink Error:", err);
    }
  }
};
