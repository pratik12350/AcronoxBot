const client = require('../index');
const { MessageEmbed } = require("discord.js");
const Schema = require('../models/logs');

client.on('channelCreate', async(channel) => {


  const data = await Schema.findOne({guildId: channel.guild.id });
  if(!data) return;

const channelEmbed = new MessageEmbed()
  .setTitle(`<:chCreate:923846528131551262> Channel Created!`)
  .setDescription(`Mod Logs have detected a channel creation!`)
  .addField(`Channel:`, `${channel}`, true)
  .addField(`Channel Id:`, `${channel.id}`, true)
  .setColor(`RANDOM`)

client.channels.cache.get(data.channelId).send({
  embeds: [channelEmbed]
})
  
})