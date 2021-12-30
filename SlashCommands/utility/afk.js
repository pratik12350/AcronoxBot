const { MessageEmbed, Client, CommandInteraction } = require('discord.js');
const db = require('../../models/afk');

module.exports = {
  name: "afk",
  description: "Go Afk!",
  options: [{
    name: 'reason',
    description: "the reason",
    type: "STRING",
    required: false
  }],

/*
* @param {Client} client
* @param {CommandInteraction} interaction
* @param {String[]} args
*/
  
run: async (client, interaction, args) => {
  
const afkreason = interaction.options.getString('reason') || "**AFK**";

     db.findOne({ Guild: interaction.guild.id, Member: interaction.member.id }, async(err, data) => {
      if(data) {
        interaction.followUp({content: 'You are already Afk! Send a message to remove it!'})
      } else {
         new db({
          Guild: interaction.guild.id,
          Member: interaction.member.id,
          Content: afkreason,
          TimeAgo: Date.now()
        }).save()
         
        const afksave = new MessageEmbed()
        .setTitle(`${interaction.user.tag} is now afk`)
        .setDescription(`${afkreason}`)
    //    .setFooter(interaction.member.tag, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(client.config.color)
        
         interaction.followUp({embeds: [afksave]})
      }
    })
}
}