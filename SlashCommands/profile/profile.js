const profileSchema = require('../../models/profile');
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Client,
  CommandInteraction
} = require('discord.js')
const economySchema = require("../../models/economy");

module.exports = {
  name: "profile",
  description: "sussy profile",
  options: [
    {
      name: "display",
      description: "Display your profile!",
      type: "SUB_COMMAND"
    }
  ],

  /* 
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {

    if (interaction.guild.id !== "890260823572889610") return interaction.followUp({ content: "Nah, this command under development!" })

    const [cmd] = args;

if(cmd === "display") {

profileSchema.findOne({ userID: interaction.id }, async(err, data) => {
  
if (err) throw err;
if (data) return;
if (!data) {
new profileSchema({
  userID: interaction.user.id,
  bio: null,
//  hugs: 0,
  pronoun: null,
  image: null,
  hobbies: null,
  age: null,
  socials: {
    instagram: null,
    youtube: null,
    facebook: null,
    tiktok: null
  }
})
}
  
})

let data = await profileSchema.findOne({ userID: interaction.user.id })

  const displayEmbed = new MessageEmbed()
  .setTitle(`${interaction.user.tag}'s Profile`)
    .setThumbnail(interaction.user.displayAvatarURL())
    
  .setDescription(`**${data?.bio || "A Cool Acronox Bot User!"}**`)
  .addField("👥 Pronoun:", `${data?.pronoun || "Not Selected"}`, true)
    .addField("📚 Hobbies", `${data?.hobbies || "Not Added"}`, true)
    .addField("🤝 age", `${data?.age || "Not Added"}`)
 // .addField("Hugs", `${data.hugs}`, true)
  .setImage(data?.image || null)
  .setColor("RANDOM")

  const displayRow = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId("socials") 
    .setLabel("Socials")
    .setStyle("PRIMARY"),
    new MessageButton()
    .setCustomId("profile-home")
    .setLabel("Home")
    .setStyle("SECONDARY")
  )

   
    interaction.followUp({
    embeds: [displayEmbed],
    components: [displayRow]
  })
  
client.on("interactionCreate", async(i) => {
if(!i.isButton) return;
  if(i.user.id !== interaction.user.id) return i.reply({content: "Not your button", ephemeral: true})
     if(i.customId === "socials") {
    
    let data = await profileSchema.findOne({ userID: interaction.user.id })

    let embed = new MessageEmbed()
    .setTitle(`${interaction.user.tag}'s Socials`)
    .addField("<a:YouTube:927746854895120484> YouTube", `${data?.socials.youtube || "Not Added Yet"}`)
   .addField("<:instagram:927746949317275698> Instagram", `${data?.socials.instagram || "Not Added Yet"}`)
    .addField("<:facebook:927747062236344360> Facebook", `${data?.socials.facebook || "Not Added Yet"}`)
    .addField("<a:tiktok:927747510032793620> TikTok", `${data?.socials.tiktok || "Not Added Yet"}`)
    .setColor("00FF00")

    i.update({embeds: [embed], components: [displayRow]})
    

 //   console.log(data?.socials.instagram)
 //   console.log(data?.socials.youtube)
 //   console.log(data?.socials.facebook)
 //   console.log(data?.socials.youtube)
  } else if (i.customId === "profile-home") {
    i.update({embeds: [displayEmbed], components: [displayRow]})
}
})

}


  },

};