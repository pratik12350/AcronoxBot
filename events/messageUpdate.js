const client = require("../index");
const {MessageEmbed} = require("discord.js");
const Schema = require('../models/logs')

client.on('messageUpdate', async (oldMessage, newMessage) => {
if(oldMessage.author.bot) return;
if(oldMessage.content === newMessage.content) return;
  
const data = await Schema.findOne({ guildId: oldMessage.guild.id });
  if(!data) return;

const editEmbed = new MessageEmbed()
  .setTitle(`Message Edited!`)
  .addField(`Author:`, `${oldMessage.author.tag}`, true)
  .addField(`Channel:`, `${oldMessage.channel}`, true)
  .addField(`Old Message:`, `${oldMessage.content}`, true)
  .addField(`New Message:`, `${newMessage.content}`, true)
  .setThumbnail(`${oldMessage.author.displayAvatarURL({dynamic: true})}`)
  .setColor("RANDOM")

client.channels.cache.get(data.channelId).send({embeds: [editEmbed]})


})