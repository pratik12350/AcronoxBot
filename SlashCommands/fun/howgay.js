const { MessageEmbed } = require(`discord.js`)

module.exports = {
  name: 'howgay',
  description: "Check How gay A User is!",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      type: 'USER',
      description: 'Select a Member',
      required: false,
    },
  ],

run: async (client, interaction) => {

const user = interaction.options.getMember('user') || interaction.user;

  let percent = Math.floor(Math.random() * 101);

  const embed = new MessageEmbed()
  .setTitle(`Calculated!`)
  .setDescription(`${user} Is ${percent}% Gay 🏳️‍🌈`)
  .setThumbnail(`https://upload.wikimedia.org/wikipedia/commons/4/48/Gay_Pride_Flag.svg`)
.setColor(client.config.color)
.setFooter(`Gay Machine`)

const x = await interaction.followUp({embeds:[embed]})



  
     },
};