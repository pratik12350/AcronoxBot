const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
  name: 'roast',
  description: "roast your friends 👀",
  options: [
    {
      name: 'user',
      description: 'your randon friend',
      type: "USER",
      required: true,
    },
  ],

run: async (client, interaction, args) => {

const user = interaction.options.getMember('user')

  
  try {
    fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
      .then((res) => res.json())
      .then((json) => {
     const embed = new MessageEmbed()
        .setTitle(`${interaction.user.tag} Roasted 👀`)
        .setDescription(json.insult)
        .setColor("RANDOM")
       
   interaction.followUp({content: `${user}`, embeds: [embed]})

                     })
  } catch (error) {
     interaction.followUp({content: `uh, the api is down try again later!`})
    console.log(error)
  }

}
}