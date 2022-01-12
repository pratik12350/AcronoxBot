const Schema = require('../../models/automeme')
const {
  CommandInteraction,
  Client,
  MessageEmbed
} = require('discord.js');
// const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch')

module.exports = {
  name: 'automeme',
  description: "AutoMeme",
 // userPermission: ["MANAGE_GUILD"],
  options: [
    {
      name: "set",
      description: "Set Automeme channel",
      type: "SUB_COMMAND",
      options: [{
        name: 'channel',
        description: "The channel you want to set",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
        required: true
      }]
    }, {
      name: 'delete',
      description: "Delete automode channel",
      type: "SUB_COMMAND"   
 }
  ],

  /*
  * @param {CommandInteraction} interaction
  * @param {Client} client
  * @param {String[]} args
  */
  
run: async(client, interaction, args) => {

  
// if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})
  if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.followUp({content: "You are missing permissions to use this command! You need `MANAGE CHANNELS` Permission!"})

const [ cmd ] = args;

  if(cmd === "set") {
const channel = interaction.options.getChannel("channel");

Schema.findOne({guildID: interaction.guild.id}, async(err, data) => {
  if(err) throw err;
  if(data) {
    data.channelID = channel.id
    data.guildID = interaction.guild.id
  } else {
    new Schema({
      guildID: interaction.guild.id,
      channelID: channel.id
    }).save()
  }

  interaction.followUp({content: `Saved ${channel} as AutoMeme channel!\nI will send memes there and make sure i have permissions on that channel!`})
  
  setInterval(async() => {
//  let channel = client.channels.cache.get(channel.id)

  let json = await fetch('https://api.nuggetdev.com/api/meme').then((res) => res.json())

  let embed = new MessageEmbed()
  .setTitle(json.title)
  .setURL(json.url)
  .setImage(json.image)
  .setColor("RANDOM")

 channel.send({embeds: [embed]}).catch((err) => {})
}, 30000)
  
})

    
    
} else if(cmd === "delete") {
    const data = await Schema.findOne({ guildID: interaction.guild.id })
    if(data) {
data.delete()
      interaction.followUp({content: "Deleted AutoMeme Channel, Plugin disabled!\nNOTE: I will still send memes until bot is restarted! it can take time. to stop this, remove my permission from that channel!"})
} else {
      return interaction.followUp({content: "AutoMeme channel not found, Maybe its not enabled on this server?\nUse `/plugin show` to check which plugin is enabled on this server!"})
}
}

    },
};