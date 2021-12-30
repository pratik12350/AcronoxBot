const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: 'help',
  aliases: ["h"],
  botperms: ["EMBED_LINKS"],

run: async (client, message, args) => {
  const e = new MessageEmbed()
  .setColor(client.config.color)
  .setTitle(`No More Text Commands`)
.setDescription(`Sorry But this bot dont have any " Text " Command Because of The Discord API update coming on April 2022!\nUse Slash Commands Instead!`)
  .setFooter('(｡･ω･｡)')

  message.channel.send({
    embeds: [e]
  })
}
}