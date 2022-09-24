 const db = require("quick.db");
const Database = require("st.db")
const db1 = new Database("./Database/database.json")
const Discord = require("discord.js");

module.exports = {
	name: "welcome-channel-set",
	description: "Setup Welcome channel",
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
		if (!args[1]) return message.reply("**❌ Tentukan Channel yang ingin Anda atur Channel Selamat Datang**")
    const channel = message.mentions.channels.first() || client.channels.cache.get(args[1])
		if (!channel) return message.reply("**❌ Tidak dapat menemukan channel ini**")
    if (db.get(`${message.guild.id}_WELCOMECH`) == channel.id) return message.followUp({content: `This Channel Is Already Welcome Channel`, ephemeral: true})
    db.set(`${message.guild.id}_WELCOMECH`, channel.id)
    message.reply({content: `**✅ Berhasil menyetel Channel Welcome ke ${channel}**`})
  }
}
