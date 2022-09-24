const Database = require("st.db")
const Discord = require("discord.js")
const fs = require("fs")
const coins = JSON.parse(fs.readFileSync("./Database/coins.json"))
const { MessageAttachment, MessageEmbed } = require("discord.js")
const db = new Database("./Database/coins.json")
const captcha = require("../../Functions/Captcha.js")

module.exports = {
	name: "coins",
  disabled: true,
	description: "Transfer or show coins",
async	execute (message, client) {
	  const args = message.content.split(" ")

		if (!args[1]) {
			let key = `${message.author.id}_COINS`
			let balance = coins[`${message.author.id}_COINS`]
	   	if (!balance) balance = 0
			message.reply({content: `**:bank: ${message.author.username}, saldo akun Anda adalah \`$${balance}\`.**`})
		} else if (args[1] && !args[2]) {
			
			const user = client.users.cache.get(args[1]) || message.mentions.users.first()
			if (!user) return message.reply(`**❌ tidak bisa mencari User ini**`)
			if (user.bot) return message.reply({content: `**:thinking: ${message.author.username}, bot tidak memiliki koin!**`})
			let balance = coins[`${user.id}_COINS`]
		  if (!balance) balance = 0
			if (user.id === message.author.id) return message.reply({content: `**:bank: ${message.author.username}, saldo akun Anda adalah \`$${balance}\`.**`})
			message.reply({content: `**${user.username} 🪙 saldo adalah \`$${balance}\`.**`})
		} else if (args[1] && args[2]) {
			let amount = +args[2]
		  const user = client.users.cache.get(args[1]) || message.mentions.users.first()
			if (!user) return message.reply(`**❌ tidak bisa mencari User ini**`)
		  if (user.bot) return message.reply({content: `**:thinking: ${message.author.username}, bot tidak memiliki koin!**`})
			let balance = coins[`${message.author.id}_COINS`]
		  if (!balance) balance = 0
			let user_balance = coins[`${user.id}_COINS`]
		  if (!user_balance) user_balance = 0
			if (user.id === message.author.id) return message.reply({content: `**:bank: ${message.author.username}, saldo akun Anda adalah\`$${balance}\`.**`})
			if (amount <= 0) return message.reply({content: `**:interrobang: ${message.author.username}, ketik koin yang Anda butuhkan untuk mentransfer!**`})
			if (balance < amount) return message.reply({content: `**:thinking: ${message.author.username}, Saldo Anda tidak cukup untuk itu!**`})
			let reason = args[3] || "No Reason Provided"
						
						 coins[`${user.id}_COINS`] = Math.floor(amount + user_balance)
						 coins[`${message.author.id}_COINS`] = Math.floor(balance - amount)

             fs.writeFileSync("./Database/coins.json", JSON.stringify(coins, null, 2))
						
						message.reply(`**:moneybag: ${message.author.username}, telah di Transfer \`$${amount}\` ke ${user}**`)
						user.send(`🏧 Transfer Resi \`Anda telah menerima $${amount} dari user ${message.author.username} (ID: ${message.author.id})\nalasan: ${reason}\``).catch(() => {})
					
		}

	},
}