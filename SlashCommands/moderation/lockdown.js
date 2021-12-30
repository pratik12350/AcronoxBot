const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "lock",
    description: "Locks a channel",
    options: [
        {
            name: "state",
            description: "Lock on or off",
            type: "STRING",
            required: true,
            choices: [
              {
                name: 'ON',
                value: 'on'
              },
              {
                name: 'OFF',
                value: 'off'
               }  
            ],
        }, {
            name: "channel",
            description: "the channel you want to (un-)lock",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]  
        },  {
            name: "role",
            description: "the role which can't type in the channel",
            required: false,
            type: "ROLE"
        }

    ],
    userPermissions: ["MANAGE_CHANNELS"],
    run: async(client, interaction) => {
        const cross = "❌";
        const shield = "🔰";

   //   if(interaction.guild.id !== "890260823572889610") return interaction.followUp({content: "Coming on next update!"})

        const state = interaction.options.getString("state");
        const channel = interaction.options.getChannel("channel");
        if(!channel.type === "GUILD_TEXT") return await interaction.followUp({
            content: `${cross} that channel is not a text channel.`
        })
        let role = channel.guild.roles.everyone || interaction.options.getRole('role')

        const sendMessages = channel.permissionsFor(role).has("SEND_MESSAGES")

        if(state.toLowerCase() === "on" && sendMessages === true) {
            await channel.permissionOverwrites.edit(role, {
                SEND_MESSAGES: false
            });

            const embed = new MessageEmbed()
            .setColor("#00ff00")
            .setAuthor(`channel locked by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`locked ${channel} for ${role}`)

            interaction.followUp({ embeds: [embed] })
        } else if(state.toLowerCase() === "off" && sendMessages === false){
            await channel.permissionOverwrites.edit(role, {
                SEND_MESSAGES: null
            })

            const embed = new MessageEmbed()
.setColor("#00ff00")
            .setAuthor(`channel unlocked by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`unlocked ${channel} for ${role}`)

            interaction.followUp({ embeds: [embed] })
        }  
    }
}