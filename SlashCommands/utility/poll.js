const Discord = require('discord.js');

module.exports = {
  name: "poll",
  description: "2 Types of polls",
  options: [
    {
      name: 'yesno',
      description: "yes or no poll",
      type: "SUB_COMMAND",
      options: [{name: 'question', type: "STRING", description: "the question you wanr to ask", required: true}]
    },
    {
      name: "choice",
      type: "SUB_COMMAND",
      description: "Multiple Choice Poll",
      options: [{name: "first", type: "STRING", description: "first choice", required: true},
                {name: 'second', type: "STRING", description: "second choice", required: true},
         //       {name: 'third', type: "STRING", description: "third choice", required: false}
      ]
    },
  ],

run: async(client, interaction, args) => {
  const [ cmd ] = args;

// if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development and coming on next Update!`})
  
if(cmd === "yesno") {

const q = interaction.options.getString("question");

  const yesnoEmbed = new Discord.MessageEmbed()
   .setAuthor(`${interaction.user.tag}`)
   .setDescription(`**${q}**`)
   .setColor(client.config.color)
   .setFooter(`Poll By ${interaction.user.tag}`)

  interaction.followUp({embeds: [yesnoEmbed]}).then(i => {
    i.react("✅")
    i.react("❌")
  })
}

if(cmd === "choice") {
  const first = interaction.options.getString('first')
  const second = interaction.options.getString('second')
  // const third = interaction.options.getString('third')

const choiceEmbed = new Discord.MessageEmbed()
   .setAuthor(`${interaction.user.tag}`)
   .setDescription(`1⃣: **${first}**\n\n2⃣: **${second}**`)
   .setColor(client.config.color)
   .setFooter(`Poll By ${interaction.user.tag}`)

interaction.followUp({embeds: [choiceEmbed]}).then(i => {
  i.react("1⃣")
  i.react("2⃣")
})
  
}
}
}
