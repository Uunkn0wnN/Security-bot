 const db = require("quick.db");
const Database = require("st.db");
const db1 = new Database("./Database/database.json")
const Discord = require("discord.js");

module.exports = {
	name: "limit-ro-create",
	description: "Set roles create limit", 
	execute(message, client) {
   
   let limit = +message.content.split(" ")[1]
   if (!limit) return message.reply("**❌ ketik nomor untuk mengatur limit**")

   if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	 if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(message.author.id) && message.author.id !== message.guild.ownerId) return message.reply({content: '**❌ hanya satrio yang dapat menggunakan nya**', ephemeral: true})

 
   db.set(`ROLES-CREATE-LIMIT_${message.guild.id}`, limit) 
  
let embed = new Discord.MessageEmbed()
.setTitle(`Limit telqh di Update`)
.setThumbnail(message.guild.iconURL({dynamic: true }))
.setAuthor(`${message.author.tag}`,`${message.author.displayAvatarURL({ dynamic: true })}`)  
.setColor("BLUE")
.setDescription(`**By : ${message.author}\nAction : Updated Limit Roles Create\nNew Limit : ${limit}\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
  
  message.reply({content: `**✅ suksee update membuat roles limit ke \`${limit}\`**`})
		
	const hh = db.get(`${message.guild.id}_PROTECTIONLOG`)
	const channel = client.channels.cache.get(`${hh}`)
	if (!channel) return;
	channel.send({embeds: [embed]}) .catch(() => {})        
 }
}