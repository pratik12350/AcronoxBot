const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'clear',
  description: "Clear/purge messages! ignores messages older than 14 days",
  userPermission: ["MANAGE_MESSAGES"],
  ephemeral: true,
  options: [
    {
      name: 'amount',
      description: 'amount to purge',
      type: "INTEGER",
      required: true
    },
    {
      name: 'channel',
      description: 'the channel you want to purge messages in.',
      required: false,
      type: "CHANNEL"
    }

  ],

run: async(client, interaction) => {

  // if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: "Coming on next update!"})
  if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.followUp({content: "Im missing permissions to purge!"})

  
const channel = interaction.options.getChannel("channel") || interaction.channel;
const amount = interaction.options.getInteger('amount');
  if(amount < 2 || amount > 100) return interaction.followUp({content: "Please Provide a valid number between 2 and 100"})

  try {
    channel.bulkDelete(amount, true)
  } catch (err) {
       interaction.followUp({content: "Hmm, maybe i dont permission to delete messages on that channel!"})
}

  interaction.followUp({content: `Successfully cleared ${amount} messages in ${channel} !`})
 }
}