module.exports = {
  event: 'add',
  handle: async ({ api, event }) => {
    const newMembers = event.participants;
    const groupInfo = await api.groupMetadata(event.id);
    const groupName = groupInfo.subject;
    const totalMembers = groupInfo.participants.length;

    for (const member of newMembers) {
      let profilePicUrl;
      try {
        profilePicUrl = await api.profilePictureUrl(member, 'image');
      } catch (error) {
        profilePicUrl = null;
      }

      const username = `@${member.split('@')[0]}`;
      const welcomeMessage = `🎉✨ *𝐇𝐞𝐲 ${username}, 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 ${groupName}!* ✨🎉\n\n` +
        `🚀 𝐘𝐨𝐮 𝐣𝐮𝐬𝐭 𝐋𝐚𝐧𝐝𝐞𝐧 𝐢𝐧 𝐚𝐧 𝐚𝐰𝐞𝐬𝐨𝐦𝐞 𝐠𝐫𝐨𝐮𝐩!\n` +
        `👥 *𝐓𝐨𝐭𝐚𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬:* ${totalMembers}\n` +
        `📢 *𝐑𝐮𝐥𝐞𝐬:* 𝐁𝐞 𝐫𝐞𝐬𝐩𝐞𝐜𝐭𝐟𝐮𝐥, 𝐬𝐭𝐚𝐲 𝐚𝐜𝐭𝐢𝐯𝐞 & 𝐞𝐧𝐣𝐨𝐲!`;

      if (profilePicUrl) {
        await api.sendMessage(event.id, {
          image: { url: profilePicUrl },
          caption: welcomeMessage,
          mentions: [member]
        });
      } else {
        await api.sendMessage(event.id, {
          text: welcomeMessage,
          mentions: [member]
        });
      }
    }
  }
};
