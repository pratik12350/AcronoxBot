const warnModel = require('../../models/warnModel')
const { Client, CommandInteraction } = require('discord.js')

module.exports = {
  name: 'warn-remove',
  description: 'Remove a warn using its id',
  options: [
    {
      name: 'warnid',
      description: 'the warn id of that warn',
      type: 'STRING',
      required: true,
    },
  ],

/**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  */

run: async (client, interaction) => {

if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.followUp({content: "You dont have Permissions To Delete Warnings!"})
  
  const warnId = interaction.options.getString('warnid')

const data = await warnModel.findById(warnId)

if(!data) return interaction.followUp({ content: `That is not a valid id!`});
  
if(data.guildId !== interaction.guild.id) return interaction.followUp({content: 'Invalid warn id! make sure the user is warned in this server!'});
  
data.delete();

  const user = interaction.guild.members.cache.get(data.userId) 
    return interaction.followUp({
    content: `Remove 1 Warning From ${user}`
  })
  
}
}