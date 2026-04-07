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
      text: "⚡ Checking..."
    });

    const end = Date.now();
    const ping = end - start;

    const responses = [
      "🏓 Pong!",
      "⚡ Online!",
      "🚀 Running!",
      "✅ Active!"
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
