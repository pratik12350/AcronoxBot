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
    },
    {
      name: "bio_set",
      description: "set bio for your profile",
      type: "SUB_COMMAND",
      options: [{
        name: 'bio',
        type: "STRING",
        description: "enter your bio",
        required: true
      }]
    },
    {
      name: 'pronoun_set',
      description: "set your pronoun.",
      type: "SUB_COMMAND",
      options: [{
        name: 'pronoun',
        description: "Select a pronoun",
        type: "STRING",
        required: true,
        choices: [
          {
            name: 'He/Him',
            value: 'He/Him'
          },
          {
            name: 'She/Her',
            value: 'She/Her'
          },
          {
            name: 'They/Them',
            value: "They/Them"
          }
        ]
      }]
    },
    {
      name: "hobby_set",
      description: "Set your hobbies for profile",
      type: "SUB_COMMAND",
      options: [{
        name: 'hobby',
        description: "Add your hobby.",
        type: "STRING",
        required: true
      }]
    },
    {
      name: 'age_set',
      description: "Set your age",
      type: "SUB_COMMAND",
      options: [{
        name: 'age',
        description: "Enter your age",
        type: "INTEGER",
        required: true
      }]
    },
    {
      name: "image_set",
      description: "Set a image for your Profile",
      type: "SUB_COMMAND",
      options: [{
        name: 'link',
        description: "Image Link!",
        type: "STRING",
        required: true
      }]
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

    if (cmd === "display") {

      profileSchema.findOne({ userID: interaction.user.id }, async (err, data) => {

        if (err) throw err;
        // if (data) return;
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
          }).save()
        }

      })

      let data = await profileSchema.findOne({ userID: interaction.user.id })

      // console.log(data)

      const displayEmbed = new MessageEmbed()
        .setTitle(`${interaction.user.tag}'s Profile`)
        .setThumbnail(interaction.user.displayAvatarURL())

        .setDescription(`**${data?.bio || "A Cool Acronox Bot User!"}**`)
        .addField("👥 Pronoun:", `${data?.pronoun || "Not Selected"}`, true)
        .addField("📚 Hobbies", `${data?.hobbies || "Not Added"}`, true)
        .addField("🤝 age", `${data?.age || "Not Added"}`)
        // .addField("Hugs", `${data.hugs}`, true
        .setColor("RANDOM")

      if (data?.image && !data?.image.includes('https://')) {
 displayEmbed.setImage(null)       
      } else if (data?.image && !data ?.image.includes('http://')) {
 displayEmbed.setImage(null)       
      } else {
        displayEmbed.setImage(data?.image)
      }

      const displayRow = new MessageActionRow()
        .addCompoents(
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

      client.on("interactionCreate", async (i) => {
        if (!i.isButton) return;
        if (i.user.id !== interaction.user.id) return i.reply({ content: "Not your button", ephemeral: true })
        if (i.customId === "socials") {

          let data = await profileSchema.findOne({ userID: interaction.user.id })

          let embed = new MessageEmbed()
            .setTitle(`${interaction.user.tag}'s Socials`)
            .addField("<a:YouTube:927746854895120484> YouTube", `${data ?.socials.youtube || "Not Added Yet"}`)
            .addField("<:instagram:927746949317275698> Instagram", `${data ?.socials.instagram || "Not Added Yet"}`)
            .addField("<:facebook:927747062236344360> Facebook", `${data ?.socials.facebook || "Not Added Yet"}`)
            .addField("<a:tiktok:927747510032793620> TikTok", `${data ?.socials.tiktok || "Not Added Yet"}`)
            .setColor("00FF00")

          i.update({ embeds: [embed], components: [displayRow] })


          //   console.log(data?.socials.instagram)
          //   console.log(data?.socials.youtube)
          //   console.log(data?.socials.facebook)
          //   console.log(data?.socials.youtube)
        } else if (i.customId === "profile-home") {
          i.update({ embeds: [displayEmbed], components: [displayRow] })
        }
      })

    } else if (cmd === "bio_set") {

      let bio = interaction.options.getString("bio");
      if (bio.length > 230) return interaction.followUp({ content: "Content must be between 230 Characters!" })

      try {
        profileSchema.findOne({ userID: interaction.user.id }, async (err, data) => {

          if (err) throw err;
          if (data) {
            data.bio = bio;
            data.save()
          }
          if (!data) {
            new profileSchema({
              userID: interaction.user.id,
              bio: bio,
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
            }).save()
          }

        })

      } catch (err) {
        interaction.followUp({ content: `Theres a error applying changes on your profile data. can you report this on my support server?\nError Message: ${err}` })
      }
      interaction.followUp({ content: "Successfully Applied changes on your profile!" })


    } else if (cmd === "pronoun_set") {

      let pronoun = interaction.options.getString('pronoun')

      try {
        profileSchema.findOne({ userID: interaction.user.id }, async (err, data) => {

          if (err) throw err;
          if (data) {
            data.pronoun = pronoun;
            data.save()
          }
          if (!data) {
            new profileSchema({
              userID: interaction.user.id,
              bio: null,
              //  hugs: 0,
              pronoun: pronoun,
              image: null,
              hobbies: null,
              age: null,
              socials: {
                instagram: null,
                youtube: null,
                facebook: null,
                tiktok: null
              }
            }).save()
          }

        })

      } catch (err) {
        interaction.followUp({ content: `Theres a error applying changes on your profile data. can you report this on my support server?\nError Message: ${err}` })
      }
      interaction.followUp({ content: "Successfully Applied changes on your profile!" })

    } else if (cmd === "hobby_set") {

      const hobby = interaction.options.getString('hobby');

      const badHobby = [
        "fuck",
        "nigga",
        "cum",
        "nigger",
        "fuckYourMom",
        "bastard",
        "fuckyou",
        "cuming",
        "condom"
      ]

      // let splittedHobby = hobby.split(" ").toLowerCase()

      if (badHobby.includes(badHobby)) return interaction.followUp({
        content: "Woah, Control yourself you horny, Dont use Inappropriate Words!"
      })

      if (hobby.length > 150) return interaction.followUp({ content: "Woah, Hobby must be under 150 Characters ;-;" })

      try {
        profileSchema.findOne({ userID: interaction.user.id }, async (err, data) => {

          if (err) throw err;
          if (data) {
            data.hobbies = hobby;
            data.save()
          }
          if (!data) {
            new profileSchema({
              userID: interaction.user.id,
              bio: null,
              //  hugs: 0,
              pronoun: null,
              image: null,
              hobbies: hobby,
              age: null,
              socials: {
                instagram: null,
                youtube: null,
                facebook: null,
                tiktok: null
              }
            }).save()
          }

        })

      } catch (err) {
        interaction.followUp({ content: `Theres a error applying changes on your profile data. can you report this on my support server?\nError Message: ${err}` })
      }
      interaction.followUp({ content: "Successfully Applied changes on your profile!" })



    } else if (cmd === "age_set") {

      let age = interaction.options.getInteger('age');

      if (age > 99) return interaction.followUp({ content: "Enter Your Real age bruh." })

      if (age < 12) return interaction.followUp({ content: "Sussy Baka, Discord minimum age requirement is 13." })

      try {
        profileSchema.findOne({ userID: interaction.user.id }, async (err, data) => {

          if (err) throw err;
          if (data) {
            data.age = age;
            data.save()
          }
          if (!data) {
            new profileSchema({
              userID: interaction.user.id,
              bio: null,
              //  hugs: 0,
              pronoun: null,
              image: null,
              hobbies: null,
              age: age,
              socials: {
                instagram: null,
                youtube: null,
                facebook: null,
                tiktok: null
              }
            }).save()
          }

        })

      } catch (err) {
        interaction.followUp({ content: `Theres a error applying changes on your profile data. can you report this on my support server?\nError Message: ${err}` })
      }
      interaction.followUp({ content: "Successfully Applied changes on your profile!" })


    } else if (cmd === "image_set") {
      let link = interaction.options.getString("link")

      // if(!link.includes("https://") || !link.includes('http://')) return interaction.followUp({content: "It doesn't look like its image link? please provide link"})

      try {
        profileSchema.findOne({ userID: interaction.user.id }, async (err, data) => {

          if (err) throw err;
          if (data) {
            data.image = link;
            data.save()
          }
          if (!data) {
            new profileSchema({
              userID: interaction.user.id,
              bio: null,
              //  hugs: 0,
              pronoun: null,
              image: link,
              hobbies: null,
              age: null,
              socials: {
                instagram: null,
                youtube: null,
                facebook: null,
                tiktok: null
              }
            }).save()
          }

        })

      } catch (err) {
        interaction.followUp({ content: `Theres a error applying changes on your profile data. can you report this on my support server?\nError Message: ${err}` })
      }
      interaction.followUp({ content: "Successfully Applied changes on your profile!\n**__If Still image doesn't show on your profile it means that its invalid image Link!__**" })


    }


  },

};