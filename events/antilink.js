/*
const client = require("../index");
const Schema = require("../models/automod")
const links = require('../links.json')
const {MessageEmbed} = require('discord.js')

client.on('messageCreate', async(message) => {
if(message.author.bot) return;
  if(!message.guild) return;

  if(links.includes(message.content.includes)) {
const data = await Schema.findOne({guildId: message.guild.id});
    if(!data) return;
if(data.antilink === true) {

// if(message.member.permissions.has("ADMINISTRATOR")) return;
  message.delete()
let embed = new MessageEmbed()
  .setTitle("No Links!")
  .setDescription("No Links Allowed!\nBreaking Rules Can Lead to permanent BAN!")
  .setColor("RED")
  .setFooter("Acronox AutoMod use /automod to disable it!")
  
  const msg = await message.channel.send({content: `${message.author}`, embeds: [embed]})

} else {
  return;
}
  }
  
  
})
*/