const weather = require('weather-js');
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'weather',
  description: "weather info",
  options: [{
    name: 'place',
    description: "the place.",
    type: "STRING",
    required: true
  }],

  run: async(client, interaction) => {

         //  if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: "Coming on next update!"});
    
const place = interaction.options.getString("place");

weather.find({search: place, degreeType: 'C'}, function(error, result) {
  if(error) {
   interaction.followUp({content: `Can Yoi report this error in my support server please?\n\nerror: ${error}`})
}
  if(result === undefined || result.length === 0) return interaction.followUp({content: ':x: • Invalid Place!'})

  const current = result[0].current;
  const location = result[0].location;

  const weatherinfo = new MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor("#00ff00")
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', '℃', true)
        .addField('Temperature', `${current.temperature}°`, true)
        .addField('Wind', `${current.winddisplay}`, true)
        .addField('Feels like', `${current.feelslike}°`, true)
        .addField('Humidity', `${current.humidity}%`, true)

interaction.followUp({
  embeds: [weatherinfo]
});
});

    
     },
  
};