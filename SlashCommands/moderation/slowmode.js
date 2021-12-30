const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const  ms = require("ms")

module.exports = {
  name: "slowmode",
  description: "Set the channel slowmode",
  userPermission: ["MANAGE_CHANNELS"],
  options: [
    {
      name: "time",
      description: "The slowmode time you want for the channel",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {


    /*
if (!interaction.member.permissions.has("MANAGE_CHANNELS"))
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
          .sstColor("RED")
          .setDescription("You don't have `Manags Channels` permission")
        ]
      });

*/
    
    if (!interaction.guild.me.permissions.has("MANAGE_CHANNELS"))
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
          .setColor("RED")
         .setDescription("I don't have `Manage Channels` permission")
        ]
      });

    const raw = interaction.options.getString("time")
    // const raw = time;
    const milliseconds = ms(raw);

    if (isNaN(milliseconds))
      return interaction.followUp({
        embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setDescription(`Please enter a valid time`)
          ]
      });

    if (milliseconds < 1000)
      return interaction.followUp({
        embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setDescription(`Invalid duration!`)
          ]
      });

    interaction.channel.setRateLimitPerUser(milliseconds / 1000);
    interaction.followUp({
      embeds: [
      new MessageEmbed()
        .setDescription(
          `The slowmode in this channel is now set to ${ms(milliseconds, {
            long: true,
          })}`
        )
        .setColor(client.config.color)
        ]
    });
  },
};