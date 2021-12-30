const Schema = require('../../models/welcomeModel')
const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
  name: "welcome",
  description: "welcome system custom message and banner",
  userPermission: ["MANAGE_GUILD"],
  options: [
    {
      name: "channel_set",
      description: "set channel for welcome",
      type: "SUB_COMMAND",
      options: [{
        name: "channel",
        description: "the channel",
        type: "CHANNEL",
        required: true,
        channelTypes: ["GUILD_TEXT"]
      }]
    },
    {
      name: "message_set",
      description: "set custom message for welcome! use /welcome variables for variables",
      type: "SUB_COMMAND",
      options: [{
        name: "message",
        description: "the message",
        type: "STRING",
        required: true
       // channelTypes: ["GUILD_TEXT"]
      }]
    },
    {
      name: "variables",
      description: "all variables for message",
      type: "SUB_COMMAND",
    },
    {
      name: "channel_delete",
      description: "turn off welcome system!",
      type: "SUB_COMMAND"
    },
    {
      name: "test",
      description: "test welcome system!",
      type: "SUB_COMMAND"
    }
  ],

/*
* @param {CommandInteraction} interaction
* @param {Client} client
* @param {String[]} args
*/

run: async (client, interaction, args) => {

/*
if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})
*/
  
  const [ cmd ] = args;

if(cmd === "variables") {
  const variablesEmbed = new MessageEmbed()
  .setTitle("Variables")
  .setDescription("> `${member.mention}`\nMention The Member\n\n> `${member.tag}`\nMember Name with Discriminator\n\n> `${guild.name}`\nShows The server name\n\n> `${memberCount}` \nshows the membercount of server")
  .setColor(client.config.color)

interaction.followUp({
  embeds: [variablesEmbed]
})

}
  if(cmd === "channel_set") {
    const channel = interaction.options.getChannel("channel");
    Schema.findOne({guild: interaction.guild.id}, async(err, data) => {
      if(err) throw err;
      if(data) {
        data.channel = channel.id;
        data.save()
      } else {
        new Schema({
          guild: interaction.guild.id,
          channel: channel.id,
        }).save()
      }

let channelSetDoneEmbed = new MessageEmbed()
      .setTitle("DONE!")
      .setDescription(`${channel} is now welcome Channel!`)
      .setColor(client.config.color)
interaction.followUp({embeds: [channelSetDoneEmbed]})
    })
  }

if(cmd === "channel_delete") {
  Schema.findOne({guild: interaction.guild.id}, async (err, data) => {
    if(data) {
     data.delete()

      interaction.followUp({content: `Removed welcome Channel(<#${data.channel}>) From this server!\nWelcome System Disabled!`})
    } else {
      return interaction.followUp({content: `This Server dont have any welcome channel!`})
    }
})
}

if(cmd === "message_set") {
  const msg = interaction.options.getString("message");
  
  Schema.findOne({guild: interaction.guild.id}, async(err, data) => {
   
    if(err) throw err;
    if(data) {
      data.message = msg;
      data.save()
    } else {
      new Schema({
        guild: interaction.guild.id,
        message: msg
      }).save()
    }
 interaction.followUp({
  content: `Successfully Saved custom message as\n${msg}`
 })
})
}

  if(cmd === "test") {
   Schema.findOne({guild: interaction.guild.id}, async(err, data) => {

    if(err) throw err;
    if(!data) return interaction.followUp({content: "This server dont have any Welcome channel\nUse /welcome commands to setup welcome!!"})
     if(data) {
       client.emit("guildMemberAdd", interaction.member)
       interaction.followUp({content: "done! check welcome channel now!"})
     }
})
  }
  
}
}