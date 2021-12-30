const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  CommandInteraction,
  Client
} = require("discord.js");
const Schema = require('../../models/economy');
const cooldown = new Set();
const coinEmoji = ":dollar:";

//SETS--------------------

const dailyCooldown = new Set()

//------------------------

module.exports = {
  name: "economy",
  description: "Economy System!",
  options: [
    {
      name: "bal",
      description: "Your Balance",
      type: "SUB_COMMAND"
    },
    {
      name: "start",
      description: "Start your economy!",
      type: "SUB_COMMAND"
    },
    {
      name: "beg",
      description: "Beg For Coins!!!",
      type: "SUB_COMMAND"
    },
    {
      name: "withdraw",
      description: "withdraw some money from bank",
      type: "SUB_COMMAND",
      options: [{
        name: "amount_to_withdraw",
        type: "INTEGER",
        description: "The Amount To Withdraw!",
        required: true
      }]
    },
    {
      name: "deposit",
      description: "deposit some money in bank",
      type: "SUB_COMMAND",
      options: [{
        name: "amount_to_deposit",
        type: "INTEGER",
        description: "The Amount To Deposit!",
        required: true
      }],
    },
    {
      name: "daily",
      description: "Your Daily Redeem!!!",
      type: "SUB_COMMAND"
    },
    {
      name: 'coinflip',
      description: "flip a coin, You Won double or loose it!",
      type: "SUB_COMMAND",
      options: [{
        name: 'amount_to_bet',
        description: 'amount to bet',
        type: "INTEGER",
        required: true
      }],
    }, 
    /*
    {
      name: "leaderboard",
      description: "Top 10 Richest Users in this server!",
      type: "SUB_COMMAND"
    },
*/
  ],

 /*
  * @param {CommandInteraction} interaction
  * @param {Client} client
  * @param {String[]} args
  */

run: async (client, interaction, args) => {

const [ cmd ] = args;
/*
if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})
*/
  if(cmd === "bal") {
    
   const balData = await Schema.findOne({ userID: interaction.user.id })

    if(balData.started === false) return interaction.followUp({content: "You have Not Started Economy System!\nUse `/economy start` To Start It!"});
  
const balEmbed = new MessageEmbed()
    .setTitle(`${interaction.user.username}'s balance`)
  .addField(`Wallet:`, `${balData.coins} ${coinEmoji}`, true)
   .addField(`Bank:`, `${balData.bank} ${coinEmoji}`, true)
    .setColor("RANDOM")
// console.log(balData)
interaction.followUp({embeds: [balEmbed]})
}

if(cmd === "start") {
  Schema.findOne({userID: interaction.user.id}, async(err, data) => {
   if(err) throw err
    
  if(data) return interaction.followUp({content: "You have already started 😐"});
    
    if(!data) {
      new Schema({
        userID: interaction.user.id,
        coins: 1000,
        bank: 0,
        started: true,
      }).save()
    }
  interaction.followUp({content: "Nice! Started Your Wallet With 1000 Coins!"})
})
}

 if(cmd === "beg") {
if(cooldown.has(interaction.member.id)) return interaction.followUp({content: "You Need To wait 3s!!"})
const randomNumber = Math.floor(Math.random() * 500) + 1;
   
var begData = await Schema.findOne({userID: interaction.user.id})
   if(!begData) return interaction.followUp({content: "You Have Not Started Economy Yet! use /economy start"})
   await Schema.findOneAndUpdate(
              {
                userID: interaction.member.id,
              },
              {
                $inc: {
                  coins: randomNumber,
                },
              }
            ); 


const begEmbed = new MessageEmbed()
   .setTitle(`Nice!`)
   .setDescription(`You Got ${randomNumber} ${coinEmoji} By Begging On Road!`)
   .setColor(client.config.color)
interaction.followUp({embeds: [begEmbed]})


cooldown.add(interaction.member.id)
   setTimeout(() => {
     cooldown.delete(interaction.member.id)
   }, 3000)
 }

if(cmd === "withdraw") {
  const amntToWith = interaction.options.getInteger("amount_to_withdraw");
if(amntToWith < 0) return interaction.followUp({content: "Why You have a `-` in that number? Remove it!"})
// if(amntToWith.includes('-')) return interaction.followUp({content: "Why You have a `-` in that number?"})
/*
var begData = await Schema.findOne({userID: interaction.user.id})
  */
   


const withData = await Schema.findOne({userID: interaction.member.id})
 
  if(!withData) return interaction.followUp({content: "You Have Not Started Economy Yet! use /economy start"})

  if(amntToWith > withData.bank) { 
    return interaction.followUp({content: `You have only ${withData.bank} ${coinEmoji} on bank!`});
    }
  
await Schema.findOneAndUpdate(
              {
                userID: interaction.member.id,
              },
              {
                $inc: {
                  coins: amntToWith,
                  bank: -amntToWith 
                },
              }
            ); 
  interaction.followUp({content: `You have Withdrawal ${amntToWith}!`})
}

if(cmd === "deposit") {
  const amntToDep = interaction.options.getInteger("amount_to_deposit");
if(amntToDep < 0) return interaction.followUp({content: "Why You have a `-` in that number? Remove it!"})
const depData = await Schema.findOne({userID: interaction.member.id})
   if(!depData) return interaction.followUp({content: "You Have Not Started Economy Yet! use /economy start"})
  if(amntToDep > depData.coins) return interaction.followUp({content: `You have only ${withData.coins} ${coinEmoji}  !`});

await Schema.findOneAndUpdate(
              {
                userID: interaction.member.id,
              },
              {
                $inc: {
                  coins: -amntToDep,
                  bank: amntToDep 
                },
              }
            ); 
  interaction.followUp({content: `You have Deposited ${amntToDep}!`})
    }

  if(cmd === "daily") {

  var dailyDataForStart = await Schema.findOne({userID: interaction.user.id})
   if(!dailyDataForStart) return interaction.followUp({content: "You Have Not Started Economy Yet! use /economy start"})

// const dailyCooldown = new Set()

    if(dailyCooldown.has(interaction.member.id)) return interaction.followUp({content: "You have already claimed your daily money! see you tomorrow!"})

    await Schema.findOneAndUpdate(
              {
                userID: interaction.member.id,
              },
              {
                $inc: {
                  coins: 10000                
                },
              }
            ); 
interaction.followUp({content: `Nice! You have claimed your today's daily money!\nYou Got 10000 ${coinEmoji}!!`})
dailyCooldown.add(interaction.member.id)
    setTimeout(() => {
  dailyCooldown.delete(interaction.member.id)
    }, 86400000)
}
  

if(cmd === "coinflip") {
  var dailyDataForFlip = await Schema.findOne({userID: interaction.user.id})
   if(!dailyDataForFlip) return interaction.followUp({content: "You Have Not Started Economy Yet! use /economy start"})

const amountToBet = interaction.options.getInteger("amount_to_bet")
if(amountToBet < 0) return interaction.followUp({content: "Why You have a `-` in that number? Remove it!"})
  const amountAfterWinFlip = amountToBet * 2
  const replies = ["heads", "tails"]

const randomReply = Math.floor(Math.random() * replies.length);

const descForFlip = replies[randomReply]

    if(amountToBet > dailyDataForFlip.coins) return interaction.followUp({content: `You have only ${dailyDataForFlip.coins} ${coinEmoji}!`});

  if(descForFlip === `heads`) {
await Schema.findOneAndUpdate(
              {
                userID: interaction.member.id,
              },
              {
                $inc: {
                  coins: amountAfterWinFlip                
                },
              }
            ); 

    interaction.followUp({content: `Thats A **Heads**! :tada:\nYou Won ${amountAfterWinFlip} ${coinEmoji}`})
  
}

    if(descForFlip === `tails`) {
 
    

      await Schema.findOneAndUpdate(
              {
                userID: interaction.member.id,
              },
              {
                $inc: {
                  coins: -amountToBet                
                },
              }
            ); 
interaction.followUp({content: `Thats A **Tails**! :'(\nYou Lost Your Bet Money!`})
}


}

if(cmd === "leaderboard") {
  var dailyDataForLb = await Schema.findOne({userID: interaction.user.id})
  
   if(!dailyDataForLb) return interaction.followUp({content: "You Have Not Started Economy Yet! use /economy start"})
if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})

try {
const data = await Schema.find().first(10);
const first = data.first(10);
if(!data) return interaction.followUp({
content: `No Data tf`
});

const embed = new MessageEmbed()
.setTitle("Leaderboard of " + interaction.guild.name)
.setColor(client.config.color)
.setThumbnail(client.user.displayAvatarURL())

 first.forEach(d => {
   const user = client.users.cache.get(d.userID);
   embed.addField(`${user}`, `${d.coins}`)
  })

interaction.followUp({ embeds: [embed] })
} catch (err) {
    interaction.followUp({content: `${err.stack}`})
  }   
 

  


 

}
  
}
} 