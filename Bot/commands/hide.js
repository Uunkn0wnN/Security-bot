module.exports = {
	name: "hide",
	description: "Hide channel",
	execute (message, client) {
      let channel = message.channel
			let channelOption = message.mentions.channels.first() || message.guild.channels.cache.get(message.content.split(" ")[1])
			if (channelOption) channel = channelOption
		  if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({content: `**❌ anda tidak memiliki permission : \`MANAGE_CHANNELS\`**`})
		  if (!channel.permissionsFor(message.guild.me).has("MANAGE_ROLES")) return message.reply({content: "**❌ saya tidak memiliki permission : `MANAGE_ROLES`**"})
			message.reply(`**✅ ${channel} telah di sembunyikan**`)
			channel.permissionOverwrites.edit(message.guild.id, {
				VIEW_CHANNEL: false
			})
    }
}