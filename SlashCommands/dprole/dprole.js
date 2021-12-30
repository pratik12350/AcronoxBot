const {
  MessageEmbed,
  CommandInteraction,
  Client
} = require('discord.js')
const Nuggies = require('nuggies');

module.exports = {
  name: 'dprole',
  description: 'dp roles',
  userPermission: ["MANAGE_GUILD"],
  options: [
    {
    name: 'create',
    description: "Create DropDown roles",
    type: "SUB_COMMAND"
  }, {
      name: "help",
      description: "Want help in dp roles?",
      type: "SUB_COMMAND"
  }
  ],

  /*
  * @param {CommandInteraction} interaction
  * @param {Client} client
  * @param {String[]} args
  */

run: async(client, interaction, args) => {

// if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: `This Command under Development!`})

const [ cmd ] = args;

if(cmd === "create") {
  
  const dpmanager = new Nuggies.dropdownroles();

  	interaction.channel.send('Send messages in `roleID label emoji` syntax! Once finished say `done`.');

  	const filter = m => m.author.id === interaction.user.id;
  	const collector = interaction.channel.createMessageCollector(filter, { max: 10000 });

  collector.on('collect', async (msg) => {
	// if (!msg.content) return /*interaction.channel.send('Invalid syntax'); */
     // if(msg.content) {

    if(msg.author.bot) return;
		if (msg.content.toLowerCase() == 'done') return collector.stop('DONE');

    
		if (!msg.content.split(' ')[0].match(/[0-9]{18}/g)) return interaction.channel.send('Invalid syntax!\nProvide Message in `roleID label emoji` syntax! Once finished say `done`.'); 

		const roleid = msg.content.split(' ')[0];
		const role = interaction.guild.roles.cache.get(roleid);
		if (!role) return interaction.channel.send('Invalid role');

		const label = msg.content.split(' ').slice(1, msg.content.split(' ').length - 1).join(' ');

		const reaction = (await msg.react(msg.content.split(' ').slice(msg.content.split(' ').length - 1).join(' ')).catch(/*() => null*/console.log));

		const final = {
			role: roleid, label: label, emoji: reaction ? reaction.emoji.id || reaction.emoji.name : null,
		};
		dpmanager.addrole(final);
    // } else return 
	})

  collector.on('end', async (msgs, reason) => {
		if (reason == 'DONE') {
			const embed = new MessageEmbed()
				.setTitle('Dropdown roles!')
				.setDescription('Click on the DropDown menu to get roles or vice-versa!')
				.setColor(client.config.color)
				.setTimestamp();
			Nuggies.dropdownroles.create(client, { content: embed, role: dpmanager, channelID: interaction.channel.id, type: 'single' })
		}
	});

} else if(cmd === "help") {
  let embedForHelp = new MessageEmbed()
  .setTitle("DropDown role help!")
      .setColor("#00FF00")
      .setDescription(`Dropdown role is same like reaction role but in dropdown menu In dropdown menu you can select the roles you want and dropdrown menus are popular!`)
      .addField("How To Activate", "Use command `/dprole create` and send the info in `roleID label emoji` syntax! others will not work, in this roleID is id of that role you can copy it. Label is the label which will Given as option name and emoji is just emoji for options! you can send Multiple times and after that just say `done` and it will make the drop-down menu make sure that you're doing this in correct channel because it will send embed in current channel!")
      .addField("How to deactivate", "delete the bot message 👀")
      .setImage("https://cdn.discordapp.com/attachments/902718740326658058/925336198422093824/SPOILER_Screenshot_20211228_112353.JPG")

  interaction.followUp({embeds: [embedForHelp]})
  
}



  
}
}