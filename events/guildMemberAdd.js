const client = require('../index');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const logSchema = require('../models/logs');
const wlcSchema = require("../models/welcomeModel");
const pop = require("popcat-wrapper");

client.on('guildMemberAdd', async(member) => {

  const data = await logSchema.findOne({guildId: member.guild.id });
  if(!data) return;
// const date = Date.now()
 // const createdAt = Math.floor(member.createdAt / 1000);
  
const joinLogEmbed = new MessageEmbed()
  .setTitle(`Member Joined`)
  .setDescription(`Mod Logs Have Detected a member join!`)
  .addField(`Joined Member`, `${member.user.tag}`, true)
 // .addField(`Age`, `<@${createdAt}>`, true)
  .addField(`Current Member Count`, `${member.guild.memberCount}`, true)
  .setColor(`RANDOM`)
  .setThumbnail(member.displayAvatarURL({dynamic: true}))

//const x =  await client.channels.cache.get(data.channelId)
 // x.send({ embeds: [joinLogEmbed] })
client.channels.cache.get(data.channelId).send({embeds: [joinLogEmbed]                                           })


//ignore the upper part ^^

  
  
//WELCOMING SYSTEM

const wData = await wlcSchema.findOne({guild: member.guild.id});

if(!wData) return;
  /*
  function format(msg) {
      var text = msg;

      const terms = [
        { name: "${member.mention}", value: `${member}`},
       // { name: "${member.username}", value: `${member.user.username}`},
        { name: "${member.tag}", value: `${member.user.tag}`},
        { name: "${memberCount}", value: `${member.guild?.memberCount}`},
      //  { name: "{convertedMemberCount}", value: `${convertedCount(member.guild?.memberCount)}`},
        { name: "${guild.name}", value: `${member.guild?.name}`},
      ];

      for (let { name, value } of terms) text = text.replace(new RegExp(name, "igm"), value);

      return text;
    } 
*/
  
  const background = "https://media.discordapp.net/attachments/890260823572889613/908947779164966962/triangles-gc15a8a848_1280.png"
  const avatar = await member.displayAvatarURL({ dynamic: false, format: "png" });
  
const text1 = `Welcome!`
const text2 = `Welcome To ${member.guild.name}!`
const text3 = `Now We Have ${member.guild.memberCount}`

  const image = await pop.welcomecard(background, avatar, text1, text2, text3)

const attachment = new MessageAttachment(image, "welcome.png")
//const formatedMsg = await format(`${wData.message}`)

const fMsg = await wData.message.replace('${member.mention}', member).replace('${member.tag}', member.user.tag).replace('${memberCount}', member.guild?.memberCount).replace('${guild.name}', member.guild?.name) 

  
client.channels.cache.get(wData.channel).send({
 content: `${fMsg}`,
 files: [attachment]
})
  
})