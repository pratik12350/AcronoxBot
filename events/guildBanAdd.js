const client = require('../index');
const { MessageEmbed } = require("discord.js");
const Schema = require('../models/logs');

client.on('guildBanAdd', async(user) => {
const data = await Schema.findOne({guildId: user.guild.id });
  if(!data) return;
if(user.bot) return;
const embed = new MessageEmbed()
  .setTitle(`<:banAdd:923847198821720076> Member Banned!`)
  .setDescription(`Mod Logs have detected a member ban!`)
  .setColor("RANDOM")
  .addField("Banned Member:", `${user.user.tag}`, true)
  .addField("Banned Member Id:", `${user.user.id}`, true)

client.channels.cache.get(data.channelId).send({
  embeds: [embed]
})
  
})