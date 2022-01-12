const client = require("../index");
const chalk = require("chalk");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
const { MessageEmbed } = require("discord.js")
const Schema = require('../models/automeme');
const fetch = require('node-fetch')

client.on("ready", () => {

//LOGGING
console.clear();
console.log(chalk.green.bold("Success!"))
  console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users," : "User,"}`),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
  )
  console.log(
    chalk.white(`Prefix:` + chalk.red(` $`)),
    chalk.white("||"),
    chalk.red(`${client.slashCommands.size}`),
    chalk.white(`Slash Commands`)
  );
  console.log("")
  console.log(chalk.red.bold("——————————[Statistics]——————————"))
  console.log(chalk.gray(`Running on Node ${process.version} on ${process.platform} ${process.arch}`))
  console.log(chalk.gray(`Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`))


client.user.setActivity(`$help || /help • Acronox`, { type: "LISTENING"})



               setInterval(() => {
            
                 let days = Math.floor(client.uptime / 86400000);
 let hours = Math.floor(client.uptime / 3600000) % 24;
 let minutes = Math.floor(client.uptime / 60000) % 60;
 let seconds = Math.floor(client.uptime / 1000) % 60;
 
  let tips = ["Main File is online , no issues reported!", ];     //add Any tip you 
     
  let random = Math.floor(Math.random() * 3); //Sends Random Message
      var yourchannel = client.channels.cache.get('906055060147044372'); //ur channel id
  //    yourchannel.send(tips[random]); 
       yourchannel.send(`\👍  Overall Acronox is running fine!\n**Ping-${client.ws.ping}ms**\n**Uptime-${days}d ${hours}h ${minutes}m ${seconds}s**\n**MEM USAGE-${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB**`)
//       yourchannel.send('Console was cleared!')
      console.clear();
     
    }, 500000); //5000ms = 5 Sec
              //ms stands for Millisecond.
              //1000ms = 1 Sec


  // AUTO MEME ==========
  
  client.guilds.cache.forEach((guild) => {
    Schema.findOne({guildID: guild.id}, async(err, data) => {
      
if(data) {

  setInterval(async() => {
  let channel = client.channels.cache.get(data.channelID)

    if(!channel) return;
  let json = await fetch('https://api.nuggetdev.com/api/meme').then((res) => res.json())

  let embed = new MessageEmbed()
  .setTitle(json.title)
  .setURL(json.url)
  .setImage(json.image)
  .setColor("RANDOM")

  channel.send({embeds: [embed]}).catch((err) => {})
}, 30000)
  
} else return;
    if(err) throw err;
      
})
  })

  // ================
  
});
