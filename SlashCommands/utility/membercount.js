const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'membercount',
  description: "member count of the server",

run: async (client, interaction) => {
  const embed = new MessageEmbed()

   .setTitle(`Member Count for ${interaction.guild.name}`)
   .setDescription(`${interaction.guild.memberCount}`)
.setColor(client.config.color)
  .setThumbnail(interaction.guild.iconURL)


const i = await interaction.followUp({content: `Fetching MemberCount...`})

  i.edit({
    embeds: [embed]
  })
  
}
}