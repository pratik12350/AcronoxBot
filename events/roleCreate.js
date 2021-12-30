const client = require('../index');
const { MessageEmbed } = require("discord.js");
const Schema = require('../models/logs');

client.on("roleCreate", async(role) => {

const data = await Schema.findOne({guildId: role.guild.id });
  if(!data) return;

const embed = new MessageEmbed()
  .setTitle(`<:createRole:923849658705514506> New Role Created!`)
  .setDescription(`Mod Logs have detected a role creation!`)
  .setColor("RANDOM")
  .addField(`Role:`, `${role}`, true)
  .addField(`Role Id:`, `${role.id}`, true)

client.channels.cache.get(data.channelId).send({embeds: [embed]})


})