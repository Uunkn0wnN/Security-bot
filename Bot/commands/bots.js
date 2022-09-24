require("discord-reply");
const { Permissions, Util } = require("discord.js")

module.exports = {
	name: "bots",
	description: "Mention all bots in server",
	execute(message, client) {
    let member = message.guild.members.cache.get(message.author.id)
	  if (!member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply({content: `**anda tidak memiliki permission : \`MANAGE_GUILD\`**`})
    let bots = message.guild.members.cache.filter(me => me.user.bot)
		let botsmap = bots.map(bo => bo.user).join("\n")
    try {
		message.reply({content: `**Menghitung Bot : ${bots.size}**`})
    const [first, ...rest] = Util.splitMessage(`${botsmap}`, { maxLength: 2000 })
		setTimeout(() => {
			if (!rest.length) return message.channel.send(`${first}`).catch(() => {})
		else {
			for (const text of rest) {
        message.channel.send(`${text}`).catch(() => {})
       }
		}
    
		},500) 
		} catch(err) {
			console.log(err)
		}
	},
			}