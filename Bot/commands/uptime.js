module.exports = {
	name: "uptime", 
	description: "Show bot uptime",
	execute (message, client) {
		let ms = require("parse-ms")
    let { MessageEmbed } = require("discord.js")
		let days = ms(client.uptime).days
    let hours = ms(client.uptime).hours
    let minutes = ms(client.uptime).minutes
		let seconds = ms(client.uptime).seconds

		let embed = new MessageEmbed()
		.setTitle("BOT UPTIME")
    .setThumbnail(client.user.avatarURL())
    .setAuthor(`${client.user.tag}`, client.user.avatarURL())
    .setFooter(`Requested By: ${message.author.username}`, message.author.avatarURL())
		.setColor("BLUE")
    .setDescription(`**\`${days}\` hari**\n**\`${hours}\` jam**\n**\`${minutes}\` menit**\n**\`${seconds}\` detik**`)
	
	  message.reply({embeds: [embed], ephemeral: false})
	},
}