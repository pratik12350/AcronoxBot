const Discord = require ("discord.js")
module.exports = {
name: "topservers",

 
   
  run: async (client, message, args, member) => {
    if(message.author.id !== '742228129107410976') return message.channel.send(':x: This only works for my owner!')
       const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(client.guilds.cache.size);

       const description = guilds.map((guild, index) => {
         return `${index + 1}) ${guild.name} -> ${guild.memberCount} members -> id ${guild.id}`
       }).join('\n')
 let embed = new Discord.MessageEmbed()
       
         .setTitle('Top Servers')
         .setDescription(description)
         .setColor("GREEN")
          message.channel.send({embeds: [embed]});
  }
  }
   
