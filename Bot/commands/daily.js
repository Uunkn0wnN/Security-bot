const database = require("st.db")
const fs = require("fs")
const coins = JSON.parse(fs.readFileSync("./Database/coins.json"))
const db = new database("./Database/coins.json")
const db1 = new database("./Database/timeout.json")
const ms = require("parse-ms")
require("discord-reply")

module.exports = {
	name: "daily", 
	disabled: true,
	description: "dapatkan coins harian",
	execute (message, client) {
		let time = db1.get({key: `${message.author.id}_DAILY-TIMEOUT`})
	  if (time !== null && (1000 * 60 * 60 * 12) - (Date.now() - time) > 0) {
			let remaining_time = ms((1000 * 60 * 60 * 12) - (Date.now() - time))
			message.reply({content: `**:rolling_eyes: ${message.author.username}, coins harian kamu refreshes dalam ${remaining_time.hours} jam, ${remaining_time.minutes} menit, and ${remaining_time.seconds} detik.**`})
			return;
		} else {
			let balance = coins[`${message.author.id}_COINS`]
			if (!balance) balance = 0
			let amount = Math.floor(Math.random() * 2000) + 1000
			coins[`${message.author.id}_COINS`] = Math.floor(amount + balance)
      db1.set({key:`${message.author.id}_DAILY-TIMEOUT`, value: Date.now()})
			message.reply({content: `**:moneybag: ${message.author.username}, kau dapat :dollar: ${amount} coins harian!**`})
		  fs.writeFileSync("./Database/coins.json",JSON.stringify(coins, null, 2))
} 
		
	},
}