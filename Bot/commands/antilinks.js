const db = require("quick.db");
const Discord = require("discord.js");
const Database = require("st.db")
const db1 = new Database("./Database/database.json")


module.exports = {
	name: "antilinks",
	description: "Enable/Disable antilinks protection",
	execute(message, client) {
		if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	 if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(message.author.id) && message.author.id !== message.guild.ownerId) return interaction.reply({content: '**❌ hanya satrio yang dapat menggunakan nya**'})

		if (message.content.split(" ")[1] === "on") {
      let embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL())
      .setThumbnail(message.guild.iconURL())
      .setDescription(`> **Action : **nyalakan Antilink
> **By :** ${message.author}
> **Date :** ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}`)
			.setColor("RED")
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()

			db.set(`ANTILINKS_${message.guild.id}`, "true")

			message.reply({content: `**✅ Antilink telah di nyalakan**`})

			const hh1 = db.get(`${message.guild.id}_PROTECTIONLOG`)
	    const channel = client.channels.cache.get(`${hh1}`)
			if (!channel) return;
	    channel.send({embeds: [embed]}).catch(() => {})

     } else if (message.content.split(" ")[1] === "off") {
       let embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL())
      .setThumbnail(message.guild.iconURL())
      .setDescription(`> **Action : **matikan Antilink
> **By :** ${message.author}
> **Date :** ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}`)
			.setColor("RED")
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp()

			db.set(`ANTILINKS_${message.guild.id}`, "false")

			message.reply({content: `**✅ Antilink telah dimatikan**`}) 

			const hh = db.get(`${message.guild.id}_PROTECTIONLOG`)
	    const channel = client.channels.cache.get(`${hh}`)
			if (!channel) return;
    	channel.send({embeds: [embed]})  .catch(() => {})

		}
	}
}