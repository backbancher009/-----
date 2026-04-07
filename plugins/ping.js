module.exports = {
  config: {
    name: 'ping',
    aliases: ['p'],
    permission: 0,
    prefix: 'both',
    categories: 'system',
    description: 'Check bot response time',
    usages: ['ping', 'p'],
    credit: 'XAHID PRIME 🍷'
  },

  start: async ({ event, api }) => {
    const { threadId } = event;

    const start = Date.now();

    const msg = await api.sendMessage(threadId, {
      text: "⚡ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠..."
    });

    const end = Date.now();
    const ping = end - start;

    const responses = [
      "🏓 𝐏𝐨𝐧𝐠!",
      "⚡ 𝐎𝐧𝐥𝐢𝐧𝐞!",
      "🚀 𝐑𝐮𝐧𝐧𝐢𝐧𝐠!",
      "✅ 𝐀𝐜𝐭𝐢𝐯𝐞!"
    ];

    const reply = responses[Math.floor(Math.random() * responses.length)];

    const finalText = `
${reply}

⏱ 𝐒𝐩𝐞𝐞𝐝: ${ping} 𝐦𝐬
🤖 𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐒𝐦𝐨𝐨𝐭𝐡
`;

    await api.sendMessage(threadId, {
      text: finalText,
      edit: msg.key
    });
  },
};
