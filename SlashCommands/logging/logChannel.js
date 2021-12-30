const { MessageEmbed } = require('discord.js');
const Schema = require('../../models/logs')

module.exports = {
  name: "logchannel",
  description: "log channel set or delete option",
  options: [
    {
      name: 'set',
      description: 'set a channel for mod logs',
      type: "SUB_COMMAND",
      options: [{name: 'channel', description: "the channel for logs", type: "CHANNEL", channelTypes: ["GUILD_TEXT"], required: true}]   
    },
    {
      name: 'delete',
      description: 'delete the logs channel',
      type: "SUB_COMMAND",
    },
  ],

run: async (client, interaction, args) => {
  const [ subcommand ] = args;

// const subCmd = interaction.options.getSubcommand('set');

  
if(subcommand === "set") {
  
// if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})
  const channel = interaction.options.getChannel('channel')
    if(!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.followUp({content: `You Don't Have Manage Server Permission!`})

  Schema.findOne({ guildId: interaction.guild.id }, async(err, data) => {
      if(data) {
        data.channelId = channel.id;
        data.save()
      } else {
        new Schema({
          channelId: channel.id,
          guildId: interaction.guild.id,
        }).save()   
      }
    interaction.followUp({
      content: `Done! ${channel} has been saved as logs channel!`
    })
  })
}

  if(subcommand === "delete") {
 // if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})
    if(!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.followUp({content: `You Don't Have Manage Server Permission!`})


Schema.findOne({guildId: interaction.guild.id}, async (err, data) => {
    if(data) {
     data.delete()

      interaction.followUp({content: `Remove Logs Channel(<#${data.channelId}>) From this server!`})
    } else {
      return interaction.followUp({content: `This Server dont have any mod logs channel!`})
    }
})

    
  }
  
}
}