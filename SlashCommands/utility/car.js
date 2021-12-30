const { MessageEmbed } = require('discord.js');
const pop = require('popcat-wrapper');

module.exports = {
  name: 'car',
  description: 'Some Random Super Cars Image',

run: async (client, interaction) => {

 const car = await pop.car()

  const doneEmbed = new MessageEmbed()
     .setTitle(`${car.title.slice(0, 50) + '...'}`)
     .setImage(car.image)
     .setColor("RANDOM")

interaction.followUp({embeds: [doneEmbed]})

  
}
}