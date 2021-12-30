const client = require('../index');
const { MessageEmbed } = require("discord.js");
const Schema = require('../models/logs');

client.on('channelDelete', async(channel) => {


  const data = await Schema.findOne({guildId: channel.guild.id });
  if(!data) return;

const channelEmbed = new MessageEmbed()
  .setTitle(`<:chDelete:923846481553797140> Channel Deleted!`)
  .setDescription(`Mod Logs have detected a channel Delete!`)
  .addField(`Channel Name:`, `${channel.name}`, true)
 // .addField(`Channel Id:`, `${channel.id}`, true)
  .setColor(`RANDOM`)

client.channels.cache.get(data.channelId).send({
  embeds: [channelEmbed]
})
  
})