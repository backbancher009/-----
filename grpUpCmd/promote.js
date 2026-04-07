module.exports = {
  event: 'promote',
  handle: async ({ api, event }) => {
    const promotedMembers = event.participants;
    console.log(event);
    for (const member of promotedMembers) {
      await api.sendMessage(event.id, {
        text: `🎉 𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐭𝐢𝐨𝐧𝐬 @${member.split('@')[0]}! 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐰 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧!`,
        mentions: [member]
      });
    }
  }
};
