const Discord = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Info about user',
  options: [
    {
      name: 'user',
      type: 'USER',
      description: 'The user',
    },
  ],

run: async (client, interaction) => {

  const user = interaction.options.getMember('user') || interaction.member;
  var permissions = []
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

const flags = {
            DISCORD_STAFF: 'Discord Staff',
	          DISCORD_EMPLOYEE: 'Discord Employee',
	          DISCORD_PARTNER: 'Discord Partners',
	          BUGHUNTER_LEVEL_1: 'Bug Hunter lvl 1',
	          BUGHUNTER_LEVEL_2: 'Bug Hunter lvl 2',
	          HYPESQUAD_EVENTS: 'Bug Hunter lvl 3',
	          HOUSE_BRAVERY: 'Bravery House',
	          HOUSE_BRILLIANCE: 'Brilliance House',
	          HOUSE_BALANCE: 'Balance House',
	          EARLY_SUPPORTER: 'Early Supporter',
	          TEAM_USER: 'Team User',
	          SYSTEM: 'System',
	          VERIFIED_DEVELOPER: 'Verified Developer'
        };
// const userFlags = user.flags.toArray();
      
if(user.permissions.has("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(user.permissions.has("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(user.permissions.has("ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(user.permissions.has("MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(user.permissions.has("MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(user.permissions.has("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(user.permissions.has("MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(user.permissions.has("MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(user.permissions.has("MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        /*
          if(user.permissions.has("MANAGE_EMOJIS")){
            permissions.push("Manage Emojis");
        }*/
    
        if(permissions.length == 0){
            permissions.push("No Key Permissions Found");
        }

const uiEmbed = new Discord.MessageEmbed()
            .setAuthor(`${user.user.tag}`, user.displayAvatarURL())
            .setColor('#00FF00')
            .setFooter(`User Info`, client.user.avatarURL({ dynamic: true }))
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp()
            .addField('__User:__ ', `<@${user.id}>`)
            .addField('__User ID:__ ', `${user.id}`, true)
            .addField('__Joined at:__ ',`${moment(user.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
            // .addField('__Created On:__', `${user.createdAt}`, true)
          //  .addField('__Badges:__', `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`, true)
            .addField(`\n__Roles [${user.roles.cache.filter(r => r.id !== interaction.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${user.roles.cache.filter(r => r.id !== interaction.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`)
            
           // .addField("\n__Permissions:__ ", `${permissions.join(` **|** `)}`, true);
            

interaction.followUp({
embeds: [uiEmbed]
})

}
}