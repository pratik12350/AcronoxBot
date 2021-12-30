//const fetch = require('node-fetch');
const SomeRandomCat = require('some-random-cat').Random;
const cats = require("cat-facts.js")
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'cat',
  description: 'random cat images',
  
run: async (client, interaction) => {

  //Images
const catRaw = await SomeRandomCat.getCat().then((res) => {
  const catImages = res.url;


  //Facts

// const catFacts = await cats();
  
const embed = new MessageEmbed()
  .setTitle(`Meow 😻`)
  //.setDescription(catFacts)
  .setImage(catImages)
  .setColor("RANDOM")

// interaction.followUp({content: `in development!`})



  interaction.followUp({
  embeds: [embed]
})
})
  
}
}