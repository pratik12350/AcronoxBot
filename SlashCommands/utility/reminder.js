const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')

module.exports = {
    name: "reminder",
    description: "reminds you for something which is specified",
    options: [
      {
        name: 'time',
        description: 'specify the time',
        required: true,
        type: 'STRING',         
      },
      {
        name: 'message',
        description: 'any messages',
        required: true,
        type: 'STRING'
      },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const time = interaction.options.getString("time")
      const message = interaction.options.getString("message")
      const trashembed = new MessageEmbed().setTitle('Reminder').setDescription(`You asked me to remind you\n**For:** ${message}\n**Time:** ${ms(ms(time))}`).setColor(client.config.color).setTimestamp();    interaction.followUp({ content: `Ok, i\'ll Remind you after ${ms(ms(time))}!` })
      setTimeout(async () => {
        interaction.user.send({ embeds: [trashembed] })
      }, ms(time))
  }
} 