 const db = require("quick.db");
const Database = require("st.db")
const db1 = new Database("./Database/database.json")
const Discord = require("discord.js");

module.exports = {
	name: "feedback-channel-set",
	description: "Setup Feedback channel",
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
		if (!args[1]) return message.reply("**❌ Tentukan channel yang ingin Anda atur Saluran feedback**")
    const channel = message.mentions.channels.first() || client.channels.cache.get(args[1])
		if (!channel) return message.reply("**❌ tidak bisa menemukan channel ini**")
    if (db.get(`${message.guild.id}_FEEDBACKCH`) == channel.id) return message.followUp({content: `This Channel Is Already Feedback Channel`, ephemeral: true})
    db.set(`${message.guild.id}_FEEDBACKCH`, channel.id)
    message.reply({content: `**✅ Sukses Mengatur Channel FeedBack ke ${channel}**`})
  }
}
