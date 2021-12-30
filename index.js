const chalk = require(`chalk`);
const express = require(`express`);
const app = express();
const axios = require('axios');
const path = require("path");
const Nuggies = require('nuggies');


let port = 3000 || 3001

app.listen(port, () => {
  // process.exit()
  console.log(chalk.bgBlueBright("WebServer Ready!"))
})

app.get('/', (req, res) => {
 res.send(`Online Yoooooooo`)
  // res.render('pages/home')
})

app.set("view engine", "ejs")
 
 
const { Client, Collection, MessageEmbed } = require("discord.js");

const client = new Client({
    intents: 32767,
 //   restTimeOffset: 0,
    disableMentions: "all"
});


Nuggies.handleInteractions(client);module.exports = client;

// Global Variables

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.snipes = new Collection()
// Initializing the project
require("./handler")(client);


//VOTE---------------


const Topgg = require('@top-gg/sdk')
const db = require('quick.db')
client.db = db;
const webhook = new Topgg.Webhook(process.env.webhookPW)

app.post('/vote', webhook.middleware(), (req, res) => {
  console.log(req.vote)
 const voteCnt = client.db.add(`${req.vote.user}_votes`, 1)

  const voteEmbed = new MessageEmbed()
  .setTitle(`I Just Got A Vote!`)
  .setDescription(`<@${req.vote.user}> (${req.vote.user}) Just Voted Me!\nThey Now Have ${voteCnt} Votes! ❤️`)
  .setColor(client.config.color)
  .setFooter(`https://top.gg/bot/900248756329512990/vote`)

  

  const e = client.db.fetch(`${req.vote.user}_vote`)
  const user = client.users.cache.get(req.vote.user);
  user.send(`Thanks For Voting Me!\nJoin https://discord.gg/aN2W6GP2kd To Check How many Votes you have in <#902735823039000626>`)

    client.channels.cache.get('902735823039000626').send({embeds: [voteEmbed]})
})



//-----------------





                      

client.login(client.config.token)