const fetch = require("node-fetch");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "facts",
  description: "Random Facts",

run: async (client, interaction, args) => {

  try{
  
const res = await fetch('https://api.popcat.xyz/fact');
const json = await res.json()
  // const option1 = json.ops1
  // const option2 = json.ops2

const wyr = new MessageEmbed()
//  .setTitle("Would You Rather??!?")
  .setDescription(`${json.fact}`)
  .setColor("RANDOM")
  
interaction.followUp({
  embeds: [wyr]
})
  } catch (error) {
return interaction.followUp({content: "The API seems down so we cant provide Facts!"})
  }
}
}