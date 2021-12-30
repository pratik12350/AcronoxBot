const client = require('../index');
const { MessageEmbed } = require("discord.js");
const Schema = require('../models/logs');

client.on('guildBanRemove', async(user) => {
const data = await Schema.findOne({guildId: user.guild.id });
  if(!data) return;
if(user.bot) return;
const embed = new MessageEmbed()
  .setTitle(`<:banRemove:923847153162522625> Member Unbanned!`)
  .setDescription(`Mod Logs have detected a member unban!`)
  .setColor("RANDOM")
  .addField("Unbanned Member:", `${user.user.tag}`, true)
  .addField("Unbanned Member Id:", `${user.user.id}`, true)

client.channels.cache.get(data.channelId).send({
  embeds: [embed]
})
  
})