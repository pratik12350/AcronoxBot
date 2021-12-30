module.exports = {
  name: 'invite',
  description: 'invite meeeeeee',
  type: "CHAT_INPUT",

run: async(client, interaction) => {
  interaction.followUp({
    content: `[Click Here To Invite Me!](${client.config.url})\n[Click Here To Vote For Me!](https://top.gg/bot/900248756329512990/vote)\n[Click Here to join Support server!](https://discord.gg/aN2W6GP2kd)`})
}
}