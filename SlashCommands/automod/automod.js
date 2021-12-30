const { MessageEmbed } = require("discord.js");
const Schema = require("../../models/automod");

module.exports = {
  name: "automod",
  description: "Powerful auto moderation toggle",
  options: [
    {
      name: 'antiswear',
      description: 'Deletes The Badwords messages',
      type: "SUB_COMMAND",
      options: [
        {
         name: "status",
         required: true,
         description: "toggle on off! default: off",
         
         type: "STRING",
         choices: [
        {
          name: 'ON',
          value: `true`,
        },
        {
          name: "OFF",
          value: `false`,
        }
      ]
        }
      ]
    },
    /*
    {
      name: 'antilink',
      description: 'Deletes The Links',
      type: "SUB_COMMAND",
      options: [
        {
         name: "toggle",
         required: true,
         description: "toggle on off! default: off",
         
         type: "STRING",
         choices: [
        {
          name: 'ON',
          value: `true`,
        },
        {
          name: "OFF",
          value: `false`,
        }
      ]
        }
      ]
    },
   */
  ],

run: async (client, interaction, args) => {

// if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: "This Feature Is under development!"})

if(!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.followUp({content: "You are missing manage server permissions!"})
  
const [ subcommand ] = args;


  if(subcommand === "antiswear") {

let selected = interaction.options.getString("status")
    if(!selected) return interaction.followUp({content: "Provide a Option!"})
if(selected === "true") {
selectedFinal = true; 
} else {
  selectedFinal = false;
}


Schema.findOne({guildId: interaction.guild.id}, async(err, data) => {
  if(err) throw err;
  if(data) {
data.antiswear = selectedFinal;
data.save()
} else {
     new Schema({
          antiswear: selectedFinal,
          guildId: interaction.guild.id,
        }).save()
}
})

    interaction.followUp({content: "Done! Applied Changes According to your choice!"})
    
}
/*
if(subcommand === "antilink") {
  if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: "This Feature Is under development!"})
 let selectedChoice = interaction.options.getString('toggle');

  if(selectedChoice === "true") {
   selectedChoiceFinal = true;
  } else {
   selectedChoiceFinal = false;
  }

  Schema.findOne({guildId: interaction.guild.id}, async(err, data) => {
if(err) throw err;
  if(data) {
    data.antilink = selectedChoiceFinal;
    data.save()
  } else {
    new Schema({
      guildId: interaction.guild.id,
      antilink: selectedChoiceFinal,
    }).save()
  }
})

interaction.followUp({content: "Done! Applied Changes According to your choice!"})
  
}
*/
  
     },

};