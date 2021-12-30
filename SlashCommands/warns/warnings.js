const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const warnModel = require("../../models/warnModel")

module.exports = {
  name: 'warnings',
  description: 'Check warnings of a user',
  options: [
    {
      name: 'user',
      description: 'the user',
      type: 'USER',
      required: true,
    }
  ],

run: async (client, interaction) => {
  const user = interaction.options.getUser('user')

const userWarnings = await warnModel.find({userId: user.id, guildId: interaction.guild.id})


if(!userWarnings?.length) return interaction.followUp({content: `${user} Don't have any warnings!`})

  const embedDescription = userWarnings.map((warn) => {
const moderator = interaction.guild.members.cache.get(warn.moderatorId)

    return [
      `Warn ID: **${warn._id}**`,
      `Moderator: ${moderator || 'has Left'}`,
      `Reason: **${warn.reason}**`,
      `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
    ].join("\n")
    
  }).join(`\n\n`)

  const embed = new MessageEmbed()
      .setTitle(`${user.tag}'s Warnings`)
      .setDescription(embedDescription)
      .setColor(client.config.color)
      
  interaction.followUp({embeds: [embed]})
}
}