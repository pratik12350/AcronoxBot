const client = require("../index");
const Schema = require("../models/automod")
const badwords = require('../badwords.json')
const {MessageEmbed} = require('discord.js')


client.on('messageCreate', async (message) => {
  if(message.author.bot) return;
  if(!message.guild) return;

  // if(badwords.includes(message.content.toLowerCase())) {
    const splitted = message.content.toLowerCase().split(" ");

splitted.forEach(async (value, index) => {
  if (badwords.includes(value)) {
    
  


 

const data = await Schema.findOne({guildId: message.guild.id});
    if(!data) return;
if(data.antiswear === true) {

if(message.member.permissions.has("ADMINISTRATOR")) return;
  message.delete()
let embed = new MessageEmbed()
  .setTitle("Watch Your Language!")
  .setDescription("Swearing Is Not Allowed in this server!\nBreaking Rules Can Lead to permanent BAN!")
  .setColor("RED")
  .setFooter("Acronox AutoMod. use /automod to disable it!")
  
 message.channel.send({content: `${message.author}`, embeds: [embed]}).then((msg) => {
setTimeout(() => {
  msg.delete()
}, 4000)
})

} else {
  return;
}
  }


})
})