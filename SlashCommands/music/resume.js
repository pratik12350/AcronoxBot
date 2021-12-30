const player = require("../../client/player");

module.exports = {
    name: "resume",
    description: "resume the current song",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
if(!queue) return interaction.followUp({
  content: "No Song playing currently"
})
        queue.setPaused(false);

        return interaction.followUp({ content: "Resumed the current track!" });
    },
};
