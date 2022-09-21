module.exports = client => {
	client.on("guildMemberAdd", member => { 
		if (!member.guild.name !== "PowerBot Support.") return;
const hh = require("quick.db").get(`${member.guild.id}_WELCOMECH`)
	const Mo7amd = client.channels.cache.get(`${hh}`)
		if (!Mo7amd) return;
	Mo7amd.send(`انا شغال يا باشا ${member}`) 

})
}