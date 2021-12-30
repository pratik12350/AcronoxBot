const {MessageEmbed} = require(`discord.js`)
const player = require("../../client/player");

module.exports = {
    name: "skip",
    description: "skip the current song",
    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: "No music is currently being played",
            });

        await queue.skip();
const skip = new MessageEmbed()
      .setTitle(`Skipped!`)
      .setDescription(`Skipped The Current Song!`)
      .setColor(client.config.color)
        interaction.followUp({ embeds: [skip] });
    },
};