const {MessageEmbed} = require('discord.js');

module.exports = {
  name: 'kick',
  description: "kick someone",
  userPermission: ["KICK_MEMBERS"],
  options: [
    {
      name: "target",
      description: "the target",
      type: "USER",
      required: true
    },
    {
      name: "reason",
      description: "the reason",
      type: "STRING",
      required: false     
    }
  ],

run: async (client, interaction) => {

// if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})
  
    if (!interaction.guild.me.permissions.has("KICK_MEMBERS")) {
      let embed = new MessageEmbed()
        .setDescription(`:x: **I do not have kick members permissions**`)
        .setColor(red)
     return interaction.followUp({ embeds: [embed] })
    }

  const target = interaction.options.getMember('target')


    if (target.id === interaction.user.id) {
      let embed = new MessageEmbed()
        .setDescription(`:x: **You can not kick yourself**`)
        .setColor("RED")
     return interaction.followUp({ embeds: [embed] })
    }


    if (target.id === client.user.id) {
      let embed = new MessageEmbed()
        .setDescription(`:x: You must kick the interaction manually**`)
        .setColor(red)
     return interaction.followUp({ embeds: [embed] })
    } 

if(interaction.member.roles.highest.comparePositionTo(target.roles.highest) < 1) {
      let embed = new MessageEmbed()
        .setDescription(`:x: **Your role Position is low to kick the user**`)
        .setColor("RED")
     return interaction.followUp({ embeds: [embed] })
    }

const reason = interaction.options.getString('reason')

   // if (!reason) reason = "No reason provided by moderator"

    let embed = new MessageEmbed()
      .setDescription(`**✅ Kicked ${target.user.tag}**`)
      .setColor(client.config.color)
 interaction.followUp({ embeds: [embed] })




    try {

    let embed = new MessageEmbed()
          .setDescription(`**⚠ You have been kicked in ${interaction.guild.name}\nReason:  ${reason || "No Reason Provided!"}**`)
          .setColor("RED")
   target.send({ embeds: [embed] }).catch((e) => {})


    } catch (err) {
     console.log(err)

    }

   let kick = interaction.guild.members.cache.get(target.id)
    kick.kick(reason).catch((e) => {
console.log(e)
     interaction.followUp({content: "i cannot kick that user!"})
})
  
}
}