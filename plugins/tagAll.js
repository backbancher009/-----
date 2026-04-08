module.exports = {
    config: {
        name: 'tagall',
        aliases: ['all', 'mentionall'],
        permission: 3,
        prefix: true,
        description: 'Mentions all members of a group with stylish greetings.',
        categories: 'group',
        usages: [`${global.config.PREFIX}tagall [optional message]`],
        credit: '𝐗𝐀𝐇𝐈𝐃-𝐁𝐎𝐓'
    },

    start: async ({ event, api, args }) => {
        const { threadId, message } = event;

        const groupMetadata = await api.groupMetadata(threadId);
        const participants = groupMetadata.participants || [];

        if (participants.length === 0) {
            return await api.sendMessage(threadId, { text: '⚠️ 𝐍𝐨 𝐩𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚𝐧𝐭𝐬 𝐟𝐨𝐮𝐧𝐝 𝐢𝐧 𝐭𝐡𝐢𝐬 𝐠𝐫𝐨𝐮𝐩. ' });
        }

        const greetings = [
            "👑 𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧 𝐥𝐞𝐠𝐞𝐧𝐝𝐬! 𝐓𝐢𝐦𝐞 𝐭𝐨 𝐬𝐡𝐢𝐧𝐞!",
            "🌸 𝐇𝐞𝐥𝐥𝐨 𝐚𝐦𝐚𝐳𝐢𝐧𝐠 𝐬𝐨𝐮𝐥𝐬! 𝐒𝐭𝐚𝐲 𝐦𝐚𝐠𝐢𝐜𝐚𝐥!",
            "🔥 𝐒𝐪𝐮𝐚𝐝 𝐜𝐡𝐞𝐜𝐤! 𝐖𝐡𝐨’𝐬 𝐚𝐥𝐢𝐯𝐞? 😏",
            "💫 𝐇𝐞𝐥𝐥𝐨 𝐛𝐞𝐚𝐮𝐭𝐢𝐟𝐮𝐥 𝐩𝐞𝐨𝐩𝐥𝐞! 𝐊𝐞𝐞𝐩 𝐠𝐥𝐨𝐰𝐢𝐧𝐠!",
            "🎧 𝐘𝐨 𝐟𝐚𝐦! 𝐥𝐞𝐭’𝐬 𝐯𝐢𝐛𝐞 𝐭𝐨𝐠𝐞𝐭𝐡𝐞𝐫!",
            "🌟 𝐑𝐢𝐬𝐞 𝐚𝐧𝐝 𝐬𝐡𝐢𝐧𝐞 𝐞𝐯𝐞𝐫𝐲𝐨𝐧𝐞!",
            "🥀 𝐇𝐞𝐥𝐥𝐨 𝐤𝐢𝐧𝐠𝐬 & 𝐪𝐮𝐞𝐞𝐧𝐬!",
            "⚡ 𝐄𝐧𝐞𝐫𝐠𝐲 𝐜𝐡𝐞𝐜𝐤! 𝐋𝐞𝐭’𝐬 𝐠𝐨𝐨𝐨!",
            "🌈 𝐒𝐩𝐫𝐞𝐚𝐝 𝐬𝐦𝐢𝐥𝐞𝐬, 𝐧𝐨𝐭 𝐬𝐭𝐫𝐞𝐬𝐬!",
            "💎 𝐇𝐞𝐲 𝐜𝐡𝐚𝐦𝐩𝐬! 𝐑𝐮𝐥𝐞 𝐭𝐡𝐞 𝐝𝐚𝐲!"
        ];

        let customMsg = args.join(' ');
        if (!customMsg) {
            customMsg = greetings[Math.floor(Math.random() * greetings.length)];
        }

        let mentionText = `🌟 ${customMsg} 🌟\n`;
        mentionText += `━━━━━━━━━━━━━━━━━━\n\n`;

        let mentions = [];

        participants.forEach((participant, index) => {
            mentionText += `➤ ${index + 1}. @${participant.id.split('@')[0]}\n`;
            mentions.push(participant.id);
        });

        mentionText += `\n━━━━━━━━━━━━━━━━━━\n`;
        mentionText += `💖 𝐒𝐭𝐚𝐲 𝐡𝐚𝐩𝐩𝐲 • 𝐒𝐭𝐚𝐲 𝐚𝐜𝐭𝐢𝐯𝐞 • 𝐒𝐭𝐚𝐲 𝐚𝐰𝐞𝐬𝐨𝐦𝐞`;

        await api.sendMessage(threadId, {
            text: mentionText,
            mentions: mentions
        }, { quoted: message });
    }
};
