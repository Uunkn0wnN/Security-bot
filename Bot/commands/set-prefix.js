let db = require("quick.db")
module.exports = {
	name: "set-prefix",
  execute (message, client) {
		let prefix = db.get(`${message.guild.id}_PREFIX`) || require("../config/config.json").prefix
		if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply("**❌ anda tidak mempunyai permission : `MANAGE_GUILD`**")  
    const args = message.content.split(" ")
		if (!args[1]) return message.reply("**❌ Tentukan prefix yang akan diubah**")
		let old_p = require("quick.db").fetch(`${message.guild.id}_PREFIX`) || prefix
		message.reply(`**✅ Sukses mengganti prefix \`${old_p}\` ke \`${args[1]}\`**`)
		db.set(`${message.guild.id}_PREFIX`, args[1])
  }
}