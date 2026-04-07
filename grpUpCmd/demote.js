module.exports = {
  event: 'demote',
  handle: async ({ api, event }) => {
    const demotedMembers = event.participants;
    console.log(event);
    for (const member of demotedMembers) {
      await api.sendMessage(event.id, {
        text: `🙂 @${member.split('@')[0]} 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐝𝐞𝐦𝐨𝐭𝐞𝐝. 𝐁𝐞𝐭𝐭𝐞𝐫 𝐥𝐮𝐜𝐤 𝐧𝐞𝐱𝐭 𝐭𝐢𝐦𝐞!`,
        mentions: [member]
      });
    }
  }
};
