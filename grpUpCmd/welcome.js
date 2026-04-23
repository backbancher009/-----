module.exports = {
  event: "add",

  handle: async ({ api, event }) => {
    const newMembers = event.participants;

    const groupInfo = await api.groupMetadata(event.id);
    const groupName = groupInfo.subject;

    for (const member of newMembers) {
      let name = `@${member.split("@")[0]}`;

      const welcomeText = `
╔══════════════════════╗
   💖 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 💖
╚══════════════════════╝
হেই লেডি চুন্দরী রমনী 🌸  
রূপবতী • গুণবতী • ভাগ্যবতী ✨  
🥹 ওয়েলকাম টু *${groupName}* জিসি!!
🌚 আপনি জিসিতে আসার পর  
চাঁদকে সূর্য মনে হচ্ছে 😌  
━━━━━━━━━━━━━━━━━━━
👑 ${name} আপনাকে স্বাগতম 💖  
━━━━━━━━━━━━━━━━━━━
                        
`;

      try {
        let profile;
        try {
          profile = await api.profilePictureUrl(member, "image");
        } catch {
          profile = null;
        }

        if (profile) {
          await api.sendMessage(event.id, {
            image: { url: profile },
            caption: welcomeText,
            mentions: [member]
          });
        } else {
          await api.sendMessage(event.id, {
            text: welcomeText,
            mentions: [member]
          });
        }

      } catch (err) {
        console.error("WELCOME ERROR:", err);
      }
    }
  }
};
