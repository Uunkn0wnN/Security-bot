module.exports = {
	name: "lock",
	description: "Lock channel", 
  execute (message, client) {
      let channel = message.channel
			let channelOption = message.mentions.channels.first() || client.channels.cache.get(message.content.split(" ")[1])
			if (channelOption) channel = channelOption
		  if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({content: `**❌ anda tidak memiliki permission : \`MANAGE_CHANNELS\`**`, ephemeral: true})
		  if (!channel.permissionsFor(message.guild.me).has("MANAGE_ROLES")) return message.reply({content: "**❌ saya tidak memiliki permission : `MANAGE_ROLES`**", ephemeral: true})
			message.reply(`**🔒 ${channel} telah dikunci**`)
			channel.permissionOverwrites.edit(message.guild.id, {
				SEND_MESSAGES: false
			})
    }
}