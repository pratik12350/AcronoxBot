const { MessageEmbed } = require(`discord.js`)

module.exports = {
  name: "setnick",
  description: "Change Or Remove Someone's Nickname",
  options: [
    {
      name: `user`,
      description: 'The user whos nickname will changed',
      type: 'USER',
      required: true,
    },
    {
      name: `nick`,
      description: "What to set nickname?",
      type: 'STRING',
      required: true,
    },
  ],

run: async (client, interaction, args) => {



// interaction.followUp({
//content: "Sorry This command have a bug And its under maintenance!"
//})

  
  
const user = interaction.options.getMember(`user`)

const nick = interaction.options.getString(`nick`)

  if(user.id === "742228129107410976") return interaction.followUp({content: `You can't change my owner's name using me 😂, Do that manually u gay!`})

if(!interaction.member.permissions.has("MANAGE_NICKNAMES")) return interaction.followUp({
content: 'You dont have permission!'
})

  /*
if(user.permissions.has("MANAGE_MESSAGES")) return interaction.followUp({
  content: `:x: • You cant change name of a Moderator!`
})
*/
/*
if(interaction.member.roles.highest.comparePositionTo(user.roles.highest) < 1) {

interaction.followUp({content: "Can't Do that because of your role hierarchy comparing to users one!"})
}*/





  try {
await user.setNickname(nick)
const x = new MessageEmbed()
  .setTitle(`Done!`)
  .setDescription(`Changed ${user}'s Nickname to ${nick}\nResponsible Moderator: ${interaction.user}`)
  .setColor(client.config.color)

interaction.followUp({
  embeds: [x]
})
  } catch (error) {
    console.log(error)
interaction.followUp({content: "Uh im missing permission to change thier nickname"})
}



      },
};
