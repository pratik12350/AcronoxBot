const { QueryType } = require("discord-player");
const player = require("../../client/player");
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "play",
    description: "play a song",
    options: [
        {
            name: "song",
            description: "title of the song",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const songTitle = interaction.options.getString("song");

        if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: "Please join a voice channel first!",
            });

        const searchResult = await player.search(songTitle, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        if (!queue.connection)
            await queue.connect(interaction.member.voice.channel);

const embed = new MessageEmbed()
      .setTitle(`Added New Song In Queue!`)
      .setDescription(`🎵 **[${songTitle}](${searchResult.tracks[0].url})**🎵 `)
      .setColor(client.config.color)
      .setThumbnail(searchResult.tracks[0].thumbnail)
      
      
        interaction.followUp({ embeds: [embed]
 });

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};