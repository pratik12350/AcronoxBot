const client = require("../index");
const { MessageEmbed,
   //     WebhookClient,
        Collection } = require("discord.js")

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
   
  if (interaction.isCommand()) {
    /*
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
*/
const cmd = await client.slashCommands.get(interaction.commandName);
       await interaction.deferReply({ ephemeral: cmd.ephemeral ? cmd.ephemeral : false }).catch(() => {});  

if(!interaction.guild) return interaction.followUp({content: "Slash commands can only be executed on servers not dms"});

  
        
 
      if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

if(!interaction.member.permissions.has(cmd.userPermission || [])) return interaction.followUp({content: "You are missing permissions to use this command!"})

// cooldowns
const TimeoutCollection = new Collection()
if(TimeoutCollection.has(interaction.user.id)) return interaction.editReply(`Bruh, You Need To Wait Before Using This Command Again!`);

    if (cmd.test) {
      if (interaction.guild.id !== "890260823572889610") return interaction.followUp({content: 'under development!'})
    }
    
 cmd.run(client, interaction, args)

TimeoutCollection.set(interaction.user.id, undefined)

setTimeout(() => {
  TimeoutCollection.delete(interaction.user.id)
}, cmd.cooldown * 1000)


    
      //  cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
