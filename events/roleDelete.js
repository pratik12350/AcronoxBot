const client = require('../index');
const { MessageEmbed } = require("discord.js");
const Schema = require('../models/logs');

client.on("roleDelete", async(role) => {

const data = await Schema.findOne({guildId: role.guild.id });
  if(!data) return;

const embed = new MessageEmbed()
  .setTitle(`<:deleteRole:923849616418553857> New Role Deleted!`)
  .setDescription(`Mod Logs have detected a role Delete!`)
  .setColor("RANDOM")
  .addField(`Role:`, `${role.name}`, true)
  .addField(`Role Id:`, `${role.id}`, true)

client.channels.cache.get(data.channelId).send({embeds: [embed]})


})