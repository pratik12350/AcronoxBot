const fetch = require("node-fetch");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "wyr",
  description: "would you rather?",

run: async (client, interaction, args) => {

  try{
  
const res = await fetch('https://api.popcat.xyz/wyr');
const json = await res.json()
  const option1 = json.ops1
  const option2 = json.ops2

const wyr = new MessageEmbed()
  .setTitle("Would You Rather??!?")
  .setDescription(`1⃣ - ${option1}\n\n2⃣ - ${option2}`)
  .setColor("RANDOM")

interaction.followUp({
  embeds: [wyr]
}).then((i) => {
  i.react('1⃣')
  i.react('2⃣')
})
} catch (error) {

return interaction.followUp({content: "The API seems down so we cant provide Facts!"})
}
}
}