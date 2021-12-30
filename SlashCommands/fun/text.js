const baseURL = "https://api.popcat.xyz";
const fetch = require('node-fetch');


module.exports = {
  name: 'text',
  description: 'modify text!',
  options: [
          {
            name: "mock",
            description: "mOcK tHe tExt!",
            type: "SUB_COMMAND",
            options: [{name: "text_to_mock", description: "the text u wanna convert", type: "STRING", required: true}]
          }
           ],

run: async (client, interaction, args) => {

 // if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})

  const [ cmd ] = args;
  const textToMock = interaction.options.getString('text_to_mock')
  if(cmd === "mock") {
const res = await fetch(`${baseURL}/mock?text=${encodeURIComponent(textToMock)}`)
  const json = await res.json()
    interaction.followUp({content: `${json.text}`})
  }

},


};