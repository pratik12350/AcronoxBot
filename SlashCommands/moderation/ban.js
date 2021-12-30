const { MessageEmbed, Client, CommandInteraction } = require('discord.js');

module.exports = {
  name: "ban",
  description: 'BAN!',
  options: [{
    name: 'add',
    description: "Ban Someone!",
    type: "SUB_COMMAND",
    userPermissions: ["BAN_MEMBERS"],
    options: [{
      name: 'target', 
      description: "the user who you want to ban!",
      type: "USER",
      required: true
    }, {
      name: 'reason',
      description: "The reason why you are banning.",
      type: "STRING",
      required: false
    }]
  }, 
  {
    name: 'remove',
    description: "Unban Someone!",
    type: "SUB_COMMAND",
    options: [{
      name: 'user_id',
      type: "STRING",
      description: "the user id of the user",
      required: true
    }, {
      name: 'reasons',
      type: "STRING",
      description: "the reason why you are unbanning the user",
      required: false
    }]
}],

/*
* @param {Client} client
* @param {CommandInteraction} interaction
* @param {String[]} args
*/

run: async(client, interaction, args) => {

if(!interaction.guild.me.permissions.has("BAN_MEMBERS")) return interaction.followUp({content: "Im missing permissions to do that!"})
  
   //   if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: "Coming on next update!"})
if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({content: "You are missing permissions to do that!"})
const [ subcmd ] = args;

  if(subcmd === "add") {
    const user = interaction.options.getUser('target');

    const member = interaction.guild.members.cache.get(user.id)
    const reason = interaction.options.getString('reason') || "No Reason Provided!";

    if(interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.followUp({content: ":x: • You can't do this because of role hierarchy with target"});

    try {
     member.send(`You have been banned from **${interaction.guild.name}**\nModerator: ${interaction.user.tag}\nReason: ${reason}`)
    } catch (err) {
 return;
}
    try {
      interaction.guild.members.ban(member, {reason: reason})
      interaction.followUp({content: `**Banned ${member.user.tag} For ${reason}**`})
    } catch (err) {
      interaction.followUp({content: "Missing Permissions!"})
    }

  }

  if(subcmd === "remove") {
    const userID = interaction.options.getString('user_id')
const reasonToUnban = interaction.options.getString('reasons') || "No Reason Provided"
const bannedUsers = await interaction.guild.bans.fetch();

const userToUnban = bannedUsers.get(userID).user;
if(!userToUnban) return interaction.followUp({content: "Invalid user id!"})
if(reasonToUnban.length > 1024) reasonToUnban = reason.slice(0, 1021) + '...';

  try {
    await interaction.guild.members.unban(userToUnban, reasonToUnban)
      interaction.followUp({content: `✅ • Successfully unbanned \`${userToUnban.tag}\``})
  } catch (error) {
    interaction.followUp({content: `Faced a error, can u report this on support server ${error}`})
  }
  }
}
}