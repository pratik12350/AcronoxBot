const translate = require('@iamtraction/google-translate');
const { MessageEmbed, Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: 'translate',
  description: "translate text to any language!",
  options: [
    {
      name: 'text',
      description: "the text you wanr to translate",
      type: "STRING",
      required: true
    },
    {
      name: 'from',
      description: "current language",
      type: "STRING",
      required: true
     },
     {
      name: 'to',
      description: "the translated language",
      type: "STRING",
      required: true
         },
  ],

/*
  * @param {Client} client
  * @param {CommandInteraction} interaction
  * @param {String[]} args
*/
  
run: async(client, interaction) => {

    //   if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: "Coming on next update!"});

const text = interaction.options.getString('text');
  const to = interaction.options.getString('to');
  const from = interaction.options.getString('from');

if(text.length > 1024) return interaction.followUp({content: "Thats too long!"})
try {
translate(text, { to: to, from: from}).then(async(res) => {
  
const embed = new MessageEmbed()
.setAuthor('Google Translator', "https://media.discordapp.net/attachments/890260823572889613/916151271038279720/281776.png")
.addField('Your Text:', `${text}`, true)
.addField('Translated Text:', `${res.text}`, true)
.setColor(client.config.color)

  interaction.followUp({embeds: [embed]})
})
} catch (err) {
interaction.followUp({content: "hmm, got a error can you report this in my support server?"})
}
}
  }