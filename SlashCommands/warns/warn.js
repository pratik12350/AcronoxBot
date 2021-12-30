const warnModel = require('../../models/warnModel')
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'warn',
  description: "Warn a user",
  options: [
    {
      name: 'target',
      description: 'The user who you want to warn!',
      type: 'USER',
      required: true,
    },
    {
      name: "reason",
      description: 'Reason For The warn!',
      type: 'STRING',
      required: true,
    },
  ],

run: async (client, interaction) => {

  // interaction.followUp({content: 'This command under development!'})
  
if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.followUp({content: "You dont have Permissions To Warn Someone!"})


        const user = interaction.options.getUser('target');
const reason = interaction.options.getString('reason')


new warnModel({
  userId: user.id,
  guildId: interaction.guild.id,
  moderatorId: interaction.user.id,
  reason,
  timestamp: Date.now()
}).save()


  const dmEmbed = new MessageEmbed()

        .setTitle(`You Have Been Warned!`)
        .setDescription(`You Have Been Warned In ${interaction.guild.name}!\nReason: ${reason}\nModerator: ${interaction.user.tag}`)
        .setColor("RED")

  user.send({embeds: [dmEmbed]})

const doneEmbed = new MessageEmbed()

        .setTitle(`Done!`)
        .setDescription(`${user} Has Been Warned for ${reason}!`)
        .setColor(client.config.color)
        
interaction.followUp({
  embeds: [doneEmbed]
})

}
}