const { MessageEmbed, MessageButton, MessageActionRow } = require(`discord.js`)

module.exports = {
  name: 'botinfo',
  description: 'information and status about Bot',

run: async (client, interaction, args) => {
const embed1 = new MessageEmbed()
  .setTitle(`INFORMATION!`)
  .setColor(client.config.color)
  .addField(`Basic Info:`, `My Name is ${client.user.username} Im a **Multipurpose** Bot For Almost Everything For your server from Fun to Powerful **Moderation**!`, true)
  .addField(`SPECS INFO:`, `Library: Discord.JS\nRunning On: NodeJS\nOS: Linux\nArch: x64`, true)
  .addField(`Credits:`, `**Pratik.exe#1746** For Creating Me :3\n\n**sish** For Giving Me Name And Avatar :3\n\n[1](https://discord.gg/Ztxzd4uqhT), [2](https://discord.gg/SYk8MeNrHc), [3](https://discord.gg/DAG8dhnx), [4](https://discord.gg/uxtkf5hYnp), [5](https://discord.gg/2KZjVgEKm5), [6](https://discord.gg/zCWUbThvUw) Thanks to these servers for giving me emojis`, true)



const btn = new MessageButton()
  .setStyle("LINK")
  .setLabel(`Invite Me`)
  .setURL(`https://top.gg/bot/900248756329512990`)

  const voteBtn = new MessageButton()

   .setStyle("LINK")
   .setLabel(`Vote`)
   .setURL("https://top.gg/bot/900248756329512990/vote")

const sptBtn = new MessageButton()
  .setLabel(`Support`)
  .setStyle("LINK")
  .setURL(`https://discord.gg/aN2W6GP2kd`)
  
const row = new MessageActionRow()
  .addComponents(btn)
  .addComponents(voteBtn)
  .addComponents(sptBtn)
  
  interaction.followUp({
    embeds: [embed1],
    components: [row]
  })
}
}