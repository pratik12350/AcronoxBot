const moment = require("moment");
const { pagination } = require('reconlx')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'snipe',
  description: "snipe deleted messages 👀",
  options: [{
    name: 'channel',
    description: 'channel which you want snipe messages in',
    required: false,
    type: "CHANNEL"
  }],
run: async(client, interaction) => {

 // if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: "Coming on next update!"})

  const channel = interaction.options.getChannel('channel') || interaction.channel;
  const snipes = client.snipes.get(channel.id)
        if(!snipes) return interaction.followUp(`:x: | There's nothing to snipe!`)
    
        let embeds = [];
    
        snipes.forEach(snipe => {
          const {msg, time, image} = snipe;
          embeds.push(
            new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({dynamic:true}))
            .setImage(image)
            .setDescription(msg.content)
            .setFooter(`${moment(time).fromNow()}`)
            .setColor("#00FF00")
          )
        })
    
        pagination({
          author: interaction.author,
          channel: interaction.channel,
          embeds: embeds,
          fastSkip: true,
          time: 60000,
        })
}
}