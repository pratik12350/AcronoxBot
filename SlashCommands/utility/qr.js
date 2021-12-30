const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "qr",
  description: "Create QR codes",
  options: [{
    name: "link",
    description: "the link of qr",
    type: "STRING",
    required: true,
  }],

run: async (client, interaction, args) => {


// if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})
  
const link = interaction.options.getString('link');

const url = `http://api.qrserver.com/v1/create-qr-code/?data=${link}&size=200x200 `

const embed = new MessageEmbed()

  .setDescription(`Here is your requested QR code for **${link}**`)
  .setImage(`${url}`)
  .setColor("RANDOM")

interaction.followUp({
  embeds: [embed]
})
 
 
// console.log(url) 
}
}