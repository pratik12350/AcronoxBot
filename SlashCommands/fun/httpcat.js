const { MessageEmbed } = require(`discord.js`);
const url = "https://http.cat"

module.exports = {
  name: "httpcat",
  description: "some funny http cats!",
  type: "CHAT_INPUT",
  options: [
    {
      name: 'code',
      description: "the http status code like 404!",
      type: "INTEGER",
      required: true,
    },
  ],

run: async (client, interaction) => {
  const code = interaction.options.getInteger('code')

  const e = new MessageEmbed()

  .setTitle(`Meowwww 😸`)
  .setImage(`${url}/${code}`)
  .setColor(client.config.color)
  .setFooter(`Note: if u got 404 even not entering 404 means your given code is incorrect!`)
  
interaction.followUp({embeds: [e]})
}
}