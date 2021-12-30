const client = require('../index');
const { MessageEmbed, Collection } = require("discord.js");
const Schema = require('../models/logs');

client.on('messageDelete', async (message) => {
if(message.author.bot) return;

  
  const data = await Schema.findOne({guildId: message.guild.id });
  if(!data) return;
  
// client.snipes = new Collection()
   
  let snipes = client.snipes.get(message.channel.id) || [];
  if (snipes.length > 5) snipes = snipes.slice(0, 4);

  snipes.unshift({
    msg: message,
    image: message.attachments.first()?.proxyURL || null,
    time: Date.now(),
  });
  client.snipes.set(message.channel.id, snipes);

  const logEmbed = new MessageEmbed()
  .setTitle(`<:msgDelete:923848957065588776> Message Deleted!`)
  .setDescription(`**Deleted Message:**\n${message.content}`)
  .addField(`Author:`, `${message.author.tag}`, true)
  .addField(`In Channel:`, `${message.channel}`, true)
  .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
  .setColor("RANDOM")

client.channels.cache.get(data.channelId).send({
  embeds: [logEmbed]
})
  
})