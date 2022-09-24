const db = require("quick.db");
const Discord = require("discord.js");
const Database = require("st.db")
const db1 = new Database("./Database/database.json")


module.exports = {
	name: "antibots",
	description: "Enable/Disable antibots protection",
	execute(message, client) {
		if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	 if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(message.author.id) && message.author.id !== message.guild.ownerId) return message.reply({content: '**❌ hanya satrio yang dapat menggunakan nya**'})

		if (message.content.split(" ")[1] === "on") {
      let embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL())
      .setThumbnail(message.guild.iconURL())
      .setDescription(`> **Action : **nyalakan Antibots System
> **By :** ${message.author}
> **Date :** ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}`)
			.setColor("RED")
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()

			db.set(`ANTIBOTS_${message.guild.id}`, "true")

			message.reply({content: `**✅ Antibots telah di nyalakan**`})

			const hh1 = db.get(`${message.guild.id}_PROTECTIONLOG`)
	    const channel = client.channels.cache.get(`${hh1}`)
			if (!channel) return;
	    channel.send({embeds: [embed]}).catch(() => {})

     } else if (message.content.split(" ")[1] === "off") {
       let embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL())
      .setThumbnail(message.guild.iconURL())
      .setDescription(`> **Action : **matikan Antibots System
> **By :** ${message.author}
> **Date :** ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}`)
			.setColor("RED")
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()

			db.set(`ANTIBOTS_${message.guild.id}`, "false")

			message.reply({content: `**✅ Antibots telah di matikan**`}) 

			const hh = db.get(`${message.guild.id}_PROTECTIONLOG`)
	    const channel = client.channels.cache.get(`${hh}`)
			if (!channel) return;
      channel.send({embeds: [embed]}) .catch(() => {})

		}
	}
}