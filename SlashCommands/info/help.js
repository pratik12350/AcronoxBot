const { MessageEmbed,
        MessageButton, 
        MessageSelectMenu,
        MessageActionRow } = require('discord.js');

module.exports = {
  name: "help",
  description: "Main Help Menu!",

run: async(client, interaction) => {
  // if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})

  const emoji = {
    info: "<:info:900949115754664027>",
    moderation: "<:ban:900948801349615647>",
    fun: "😂",
    image: "🤣",
    settings: "<:settings:923510786398240788>",
    automod: "<:automod:923506493888819211>",
    utility: "<:utility:900950091165204520>",
    music: "<:music:900950817132122174>",
    economy: "💵"
  };

const embed = new MessageEmbed()
  .setAuthor("Help Menu!", `https://cdn.discordapp.com/avatars/900248756329512990/77b80826efff0aeb282897a965f97391.png`)
  .setDescription(`**Select category from the select menu below!**\n\n===============\n[Invite](${client.config.url})\n[Vote](https://top.gg/bot/${client.user.id}/vote)\n[Support](https://discord.gg/aN2W6GP2kd)`)
  .setColor("#00ff00")


  const row = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
    .setCustomId("help")
    .setPlaceholder("Click Here And Select A Category")
    .addOptions([
      {
        label: "INFO",
        emoji: emoji.info,
        description: "Commands From Info category",
        value: "help-info"
      },
      {
        label: "MODERATION",
        emoji: emoji.moderation,
        description: "Commands From Moderation category",
        value: "help-mod"
      },
      {
        label: "AUTOMOD",
        emoji: emoji.automod,
        description: "Commands From Automod category",
        value: "help-automod"
      },
      {
        label: "FUN",
        emoji: emoji.fun,
        description: "Commands From Fun category",
        value: "help-fun",
      },
      {
        label: " UTILITY",
        emoji: emoji.utility,
        description: "Commands From Utility category",
        value: "help-utility"
      },
      {
        label: "MUSIC",
        emoji: emoji.music,
        description: "Commands From Music category",
        value: "help-music"
      },
      {
        label: "PLUGINS",
        emoji: emoji.settings,
        description: "Commands From Plugins category",
        value: "help-setting"
      },
      {
        label: "IMAGE",
        emoji: emoji.image,
        description: "Commands From Image category",
        value: "help-image"
      },
      {
        label: "ECONOMY",
        emoji: emoji.economy,
        description: "Commands From Economy category",
        value: "help-economy"
      },
      {
        label: "HOME",
        emoji: "⬜",
        description: "Home page",
        value: "home"
      }
    ])
  )
  

 interaction.channel.send({embeds: [embed], components: [row]})


//EMBEDS

const infoEmbed = new MessageEmbed()
  .setTitle("Commands From Info Category")
  .setColor(client.config.color)
  .setFooter("Acronox | AcronoxDevelopment")
  .setDescription("`/ping`, `/help`, `/stats`, `/botinfo`, `/invite`")
//  .setThumbnail(client.user.displayAvatarURL())
  
const moderationEmbed = new MessageEmbed()
  .setTitle("Commands From Moderation Category")
  .setColor(client.config.color)
  .setFooter("Acronox | AcronoxDevelopment")
  .setDescription("`/setnick`, `/warn`, `/warnings`, `/warn-remove`, `/kick`, `/slowmode`, `/clear`, `/lockdown`, `/ban add`, `/ban remove`")
//  .setThumbnail(client.user.displayAvatarURL())

const automodEmbed = new MessageEmbed()
  .setTitle("Commands From AutoMod Category")
  .setColor(client.config.color)
  .setFooter("Acronox | AcronoxDevelopment")
//  .setThumbnail(client.user.displayAvatarURL())
  .setDescription("`/automod antiswear`")

const funEmbed = new MessageEmbed()
  .setTitle("Commands From Fun Category")
  .setColor(client.config.color)
  .setFooter("Acronox | AcronoxDevelopment")
//  .setThumbnail(client.user.displayAvatarURL())
  .setDescription("`/howgay`, `/httpcat`, `/meme`, `/roast`, `/ship`, `/text mock`, `/wyr`, `/joke`, `/facts`, `/snipe`")

const utilityEmbed = new MessageEmbed()
  .setTitle("Commands From Utility Category")
  .setColor(client.config.color)
  .setFooter("Acronox | AcronoxDevelopment")
// .setThumbnail(client.user.displayAvatarURL())
  .setDescription("`/avatar`, `/movie`, `/embed create`, `/embed edit`, `/cat`, `/dog`, `/youtube`, `/poll`, `/reminder`, `/qr`, `/membercount`, `/weather`, `/translate`, `/dprole create`, `/dprole help`")

const musicEmbed = new MessageEmbed()
  .setTitle("Commands From Music Category")
  .setColor(client.config.color)
  .setFooter("Acronox | AcronoxDevelopment")
  // .setThumbnail(client.user.displayAvatarURL())
  .setDescription("`/play`, `/pause`, `/resume`, `/skip`, `/volume`, `/now-playing`, `/lyrics`, `/queue`")

const settingsEmbed = new MessageEmbed()
  .setTitle("Commands From Plugins Category")
  .setColor(client.config.color)
  .setFooter("Acronox | AcronoxDevelopment")
//  .setThumbnail(client.user.displayAvatarURL())
  .setDescription("`/plugin list`, `/plugin show`, `/plugin help`")

const imagesEmbed = new MessageEmbed()
  .setTitle("Commands From Image Manipulation Category")
  .setColor(client.config.color)
  .setFooter("Acronox | AcronoxDevelopment")
//  .setThumbnail(client.user.displayAvatarURL())
  .setDescription('`/manipulate caution`, `/manipulate clown`, `/manipulate gun`, `/manipulate oogway`, `/manipulate pet`, `/manipulate sadcat`, `/manipulate wanted`, `/manipulate ship`, `/manipulate trigger`,  `/manipulate simp`, `/manipulate tweet`, `/manipulate delete`, `/manipulate supreme`, `/manipulate shit`, `/manipulate gravestone`')

const economyEmbed = new MessageEmbed()
  .setTitle("Commands From Economy Category")
  .setColor(client.config.color)
  .setFooter("Acronox | AcronoxDevelopment")
//  .setThumbnail(client.user.displayAvatarURL())
  .setDescription("`/economy start`, `/economy bal`, `/economy beg`, `/economy with`, `/economy dep`, `/economy daily`, `/welcome coinflip`")

//=====

    let filter = (i) => i.user.id === interaction.user.id

  
  const collector = interaction.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
    filter: filter
  });

collector.on('collect', async(collected) => {

  const value = collected.values[0];

  if(value === "help-info") {
collected.update({embeds: [infoEmbed], components: [row]})
}

 if(value === "help-mod") {
   collected.update({embeds: [moderationEmbed], components: [row]})
 }

 if(value === "help-automod") {
   collected.update({embeds: [automodEmbed], components: [row]})
}
  if(value === "help-fun") {
   collected.update({embeds: [funEmbed], components: [row]})
  }

  if(value === "help-utility") {
    collected.update({embeds: [utilityEmbed], components: [row]})
  }

  if(value === "help-music") {
    collected.update({embeds: [musicEmbed], components: [row]})
  }

  if(value === "help-setting") {
    collected.update({embeds: [settingsEmbed], components: [row]})
}

  if(value === "help-image") {
collected.update({embeds: [imagesEmbed], components: [row]})
}

  if(value === "help-economy") {
    collected.update({embeds: [economyEmbed], components: [row]})
  }

  if(value === "home") {
    collected.update({embeds: [embed], components: [row]})
  }
})
}
}
