const db = require('../models/afk');
const moment = require('moment');
const client = require('../index')
const { MessageEmbed } = require('discord.js');

client.on('messageCreate', async(message) => {
  if(message.author.bot) return;
  db.findOne({ Guild: message.guild.id, Member: message.author.id }, async(err, data) => {
    if(err) throw err;
    if(data) {
      data.delete()
      const afk = new MessageEmbed()
      .setTitle('Afk Removed')
      .setDescription(`${message.author.tag} afk has been removed`)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
              .setColor(client.config.color)
      message.reply({ content: 'Welcome back!', embeds: [afk]})
    } else return;
  })
  
  if(message.mentions.members.first()) {
    db.findOne({ Guild: message.guild.id, Member: message.mentions.members.first().id }, async(err, data) => {
      if(err) throw err;
      if(data) {
        const member = message.guild.members.cache.get(data.Member);
        const afk = new MessageEmbed()
        .setTitle(`${member.user.tag} is Afk`)
        .setDescription(`${data.Content} - ${moment(parseInt(data.TimeAgo)).fromNow()}`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
                .setColor(client.config.color)
        
        message.channel.send({ embeds: [afk]})
      } else return;
    })
  }
})