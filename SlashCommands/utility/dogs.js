const { MessageEmbed } = require('discord.js')  
const fetch = require('node-fetch');

module.exports = {
  name: 'dog',
  description: "random cute dog images!",

run: async (client, interaction) => {

// if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: "Coming on next update!"});

  const res = await fetch('https://dog.ceo/api/breeds/image/random') 
  const json = await res.json()
  
const embed = new MessageEmbed()
  .setAuthor('Dogs!', "https://media.discordapp.net/attachments/890260823572889613/916722244707827722/HeGEEbu_d.webp")
  .setColor("#00ff00")
  .setImage(json.message)

interaction.followUp({embeds: [embed]})
}
}
