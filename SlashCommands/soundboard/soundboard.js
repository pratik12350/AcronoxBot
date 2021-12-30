 const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const path = require('path');

module.exports = {
  name: 'soundboard',
  description: "test command",

run: async(client, interaction, args) => {

  if(interaction.guild.id !== "890260823572889610") return;
  
if(!interaction.member.voice.channel) return interaction.followUp({content: `:x: Please Join A Voice Channel!`})

  const channel = interaction.member.voice.channel
  
  function play() {
		const player = createAudioPlayer();
		const resource = createAudioResource('../../amogus.mp3');
		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});

		player.play(resource);
		connection.subscribe(player);
		player.on(AudioPlayerStatus.Idle, () => {
			connection.destroy();
		});
	}

  play()
  interaction.followUp({content: 'test'})}
}