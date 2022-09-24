 const db = require("quick.db");
const Database = require("st.db")
const db1 = new Database("./Database/database.json")
const Discord = require("discord.js");

module.exports = {
	name: "log-protection",
	description: "Setup protection log",
	type: "CHAT_INPUT", 
	execute(message, client) {
		if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	  if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(message.author.id) && message.author.id !== message.guild.ownerId) return message.reply({content: '**❌ hanya satrio yang dapat menggunakan nya**', ephemeral: true})

    const args = message.content.split(" ")
		if (!args[1]) return message.reply("**❌ Tentukan saluran yang ingin Anda atur protection log**")
    const channel = message.mentions.channels.first() || client.channels.cache.get(args[1])
		if (!channel) return message.reply("**❌ tidak dapat menemukan channel ini**")
    if (db.get(`${message.guild.id}_PROTECTIONLOG`) == channel.id) return message.followUp({content: `This Channel Is Already Protection Log`, ephemeral: true})
    db.set(`${message.guild.id}_PROTECTIONLOG`, channel.id)
    message.reply({content: `**✅ sukses set protection log to ${channel}**`})
  }
}
	