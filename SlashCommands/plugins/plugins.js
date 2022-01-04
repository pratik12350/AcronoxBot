const { MessageEmbed } = require('discord.js');
const logSchema = require('../../models/logs');
const welcomeSchema = require("../../models/welcomeModel");
const automodSchema = require("../../models/automod"); 
const suggestionSchema = require('../../models/channel') 
const automemeSchema = require("../../models/automeme")
const { pagination } = require("reconlx")

module.exports = {
  name: 'plugin',
  description: "plugins",
  //  userPermission: ["MANAGE_GUILD"],
  options: [
    {
      name: 'list',
      description: "Shows the list of plugins we offer",
      type: "SUB_COMMAND",
    }, {
      name: 'show',
      description: "shows the plugins activated for your server",
      type: "SUB_COMMAND"
    }, {
      name: 'help',
      description: "Learn About Plugins",
      type: "SUB_COMMAND"
    }
  ],

  run: async (client, interaction, args) => {

 //   if (interaction.guild.id !== "890260823572889610") return interaction.followUp({ content: "Underdevelopment command!" })

    const [cmd] = args;

    /* /PLUGIN LIST */

    if (cmd === "list") {

      let embed = new MessageEmbed()
        .setTitle(`🔌 PLUGINS LIST`)
        .setColor(client.config.color)
        .setDescription(
          ">>> `Mod Logging`: **Logs Almost all moderator actions**\n`AntiSwear`: **Deletes Messages contain bad words**\n`Welcome`: **Welcomes users with a Welcome card and custom messages**\n`Suggestion`: Suggest system with reply!\n`AutoMeme`: funny reddit memes every 30s!\\nUse `/plugin show` To Get All Activated Plugins in this server!"
        )
        .setFooter(`Use /plugin help to learn how to use plugins!`)
      interaction.followUp({ embeds: [embed] })
    }
    else if (cmd === "show") {

      let embed = new MessageEmbed()
        .setTitle("Plugins Activated For This Server")
        .setColor("#00FF00")
        .setFooter("Use /plugin help to learn how to enable/disable plugins")

      const onEmoji = "<:toggleOn:923826703325888533>";
      const offEmoji = "<:toggleOff:923826740957155338>";
      //fetching data
      let dataForLog = await logSchema.findOne({ guildId: interaction.guild.id })
      let dataForWelcome = await welcomeSchema.findOne({ guild: interaction.guild.id })
      let dataForAutomodAntiswear = await automodSchema.findOne({ guildId: interaction.guild.id, antiswear: true })
      let dataForSuggestion = await suggestionSchema.findOne({ Guild: interaction.guild.id })
      let dataForAutomeme = await automemeSchema.findOne({ guildID: interaction.guild.id })
      
      //ADDING FIELDS ACCORDING TO DATA
      if (dataForLog) {
        embed.addField(`Mod Logging:`, `${onEmoji}`, true)
      } else {
        embed.addField(`Mod Logging:`, `${offEmoji}`, true)
      }

      if (dataForWelcome) {
        embed.addField(`Welcome:`, `${onEmoji}`, true)
      } else {
        embed.addField(`Welcome:`, `${offEmoji}`, true)
      }

      if (dataForAutomodAntiswear) {
        embed.addField(`Anti-Swear:`, `${onEmoji}`, true)
      } else {
        embed.addField(`Anti-Swear:`, `${offEmoji}`, true)
      }

      if (dataForSuggestion) {
        embed.addField(`Suggestion:`, `${onEmoji}`, true)
      } else {
        embed.addField(`Suggestion:`, `${offEmoji}`, true)
      }

      if(dataForAutomeme) {
        embed.addField("Automeme", `${onEmoji}`)
      } else {
        embed.addField("Automeme", `${offEmoji}`)
      }

        } else if (cmd === "help") {
     let embed1 = new MessageEmbed() 
      .setTitle('Everything about plugins!')
.setColor("#00FF00")
.addField('What are plugins?', 'Plugins Are systems offered by Acronox Bot, You can Use them to make your server look Better\nThere are a lot of types of Plugins like Moderation Plugin, Utility Plugin, etc.', true)
.addField('How To Use Them?', 'You have to enable those Plugins by using specific slash commands!', true)
.addField('More Info!', 'Click On buttons to change embed pages, each page will tell about each plugin.\nPlugin Page Numbers:\nPage 1: This One\nPage 2: Moderation Logging\nPage 3: Anti-Swear\nPage 4: Welcome\nPage 5: AutoMeme\nPage 6: Suggestion System\n\nClick On #⃣ icon and type the page number to navigate or use other buttons.', true) 

      let embed2 = new MessageEmbed()
      .setTitle("Moderation Logging Plugin")
      .setColor("#00FF00")
      .setDescription("Moderation Logging is a plugin which logs almost all moderator actions in a specific channel.\nIt will not fetch action from audit log so 0% chance of missing a action!") 
      .addField("How to activate", "Use the command `/logchannel` to set mod logs channel. It will take only one parameter channel\nExample: `/logchannel set [channel]`", true)
      .addField("How to deactivate", "Just use the command `/logchannel` delete. Simple Right?", true)
      .setImage("https://media.discordapp.net/attachments/904757607389081610/924523289555132416/Screenshot_20211226_101507.JPG")


      let embed3 = new MessageEmbed()
.setTitle('Anti-Swear Plugin')
.setDescription('This plugin will delete the messages which contains bad words.\nClick [Me](https://srcb.in/l74Tv0Lgfb) for list of bad words.\n\n⚠ NOTE: It will ignore members with ADMINISTRATOR Permissions!')
.addField('How to activate', 'Use the command `/automod antiswear`. this command takes one parameter status\nExample: `/automod antiswear status:[status]` and done!', true)
.addField('How to deactivate', 'Use that command again with status as OFF', true)
.setColor('#00FF00')  
      .setImage("https://cdn.discordapp.com/attachments/890260823572889613/924529243579379742/Screenshot_20211226_103854.JPG")

      let embed4 = new MessageEmbed()
      .setTitle("Welcome plugin")
.setDescription("This plugin welcomes the user with a custom message and welcome card\nNot Much about this plugin you already know about it!")
.addField("How to activate", "Use the commands which starts with `/welcome`\nStep1: Use the command `/welcome channel_set channel:[channel]` this will set a welcome channel in database.\nStep2: Use the command `/welcome variables` to check all variables for custom message.\nStep3: Use `/welcome message_set` and set a custom message for welcome and you can use variables too.\nStep4: At last use `/welcome test` and test the welcome plugin, if not working then repeat the process. if still not working just report this on support server!")
.addField("How to deactivate", "use `/welcome channel_delete` Command!", true)
.setColor("#00FF00")

      let embed5 = new MessageEmbed()
      .setTitle("AutoMeme Plugin")
      .setDescription("Auto meme plugins sends memes every 30s in a specific channel!")
      .addField("How to activate", "Use `/automeme set` to set a channel for automeme.", true)
      .addField("How to deactivate", "Use `/automeme delete` to delete automeme plugin.\nNOTE: IT WILL STILL SEND MEME THERE UNTIL BOT RESTARTS! This can take some time")
      .setColor("#00FF00")

let embed6 = new MessageEmbed()
      .setTitle("Suggestion System Plugin")
      .setDescription("just a simple suggestion system!")
      .addField("How to use", "Use `/suggestion channel` and set a suggestion channel, then you can suggest stuff using `/suggestion suggest` and Mods can reply using `/suggestion reply`")
      .setColor("00FF00")
      
    let embeds = [embed1, embed2, embed3, embed4, embed5, embed6]

      pagination({
        pageTravel: true,
        embeds: embeds,
        channel: interaction.channel,
        author: interaction.user,
        fastSkip: true,
        time: 600000     
      })
     
    }

}
}