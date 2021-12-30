const { MessageEmbed } = require(`discord.js`)
const { version } = require('../../package.json')
const os = require('os')

module.exports = {
  name: 'stats',
  aliases: ["statistics"],
  description: 'Bot Statistics',

run: async (client, interaction, args) => {
  const lastRestart = (Date.now() / 1000 - client.uptime / 1000).toFixed(0)
  const osLastRestart = (Date.now() / 1000 - os.uptime / 1000).toFixed(0)

  const embed = new MessageEmbed()
    .setTitle(`Current Statistics`)
    .setColor(client.config.color)
    .addField("BOT STATS", `Server Count: ${client.guilds.cache.size}\nUser Count: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}\nChannel count: ${client.channels.cache.size}\nTotal Slash Commands: ${client.slashCommands.size}\nAPI Ping: ${client.ws.ping}ms\nResponse Time: ${Date.now() - interaction.createdTimestamp}ms\nVersion: ${version}\nLast Restart: <t:${lastRestart}:F>`, true)
  .addField("OS STATS", `OS: LINUX\nArch: x64\n`)
  .addField("CODE STATS:", `Language: [JavaScript](https://javascript.com)\nEnvironment: [Node.JS](https://nodejs.org)\nLibrary: [Discord.Js](https://discord.js.org)`)

  interaction.followUp({
    embeds: [embed]
  })
}
}