const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'movie',
  description: 'Get links to watch movies for free!',
  options: [
    {
      name: 'query',
      description: 'What movie do you want!?',
      type: 'STRING',
      required: true
    }
  ],
   /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async(client, interaction) => {
    try{
        const Query = interaction.options.getString('query');
        let query = Query.split(" ").join("-")
        const row = new MessageActionRow().addComponents(
       
            new MessageButton().setLabel("Click Here").setURL(`https://ww4.soap2dayto.org/search/${query}`).setStyle("LINK") 
            );
     
   let embed = new MessageEmbed()
        .setDescription(`\`\`\`\n🔍 ${query}   \`\`\``)
        .addField("Here is your search result", `[${query}](https://ww4.soap2dayto.org/search/${query})`)
           .setColor('RANDOM')
  
        interaction.followUp({ embeds: [embed], components: [row] });
    } catch(e) {
        return console.log(e)
    }
  }
} 

