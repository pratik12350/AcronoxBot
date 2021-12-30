const client = require('../index');
const { MessageEmbed } = require("discord.js");
const Schema = require('../models/logs');

client.on('guildMemberRemove', async(member) => {

  const data = await Schema.findOne({guildId: member.guild.id });
  if(!data) return;
// const date = Date.now()
 // const createdAt = Math.floor(member.createdAt / 1000);
  
const leaveLogEmbed = new MessageEmbed()
  .setTitle(`Member Left`)
  .setDescription(`Mod Logs Have Detected a member left!`)
  .addField(`Left Member`, `${member.user.tag}`, true)
 // .addField(`Age`, `<@${createdAt}>`, true)
  .addField(`Current Member Count`, `${member.guild.memberCount}`, true)
  .setColor(`RANDOM`)
  .setThumbnail(member.displayAvatarURL({dynamic: true}))

//const x =  await client.channels.cache.get(data.channelId)
 // x.send({ embeds: [joinLogEmbed] })
client.channels.cache.get(data.channelId).send({embeds: [leaveLogEmbed]                                           })
  
})