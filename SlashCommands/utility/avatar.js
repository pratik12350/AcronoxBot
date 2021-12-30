const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Check someone's avatar!",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "Find a user.",
            type: 'USER',
            required: false,
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const member = interaction.options.getMember('user') || interaction.member;

        const png = member.user.displayAvatarURL({ dynamic: true, format: 'png' });
        const jpg = member.user.displayAvatarURL({ dynamic: false, format: 'jpg' });
        const webp = member.user.displayAvatarURL({ dynamic: false, format: 'webp' });
        const gif = member.user.displayAvatarURL({ dynamic: true });

        const png2 = member.displayAvatarURL({ dynamic: true, format: 'png' });
        const jpg2 = member.displayAvatarURL({ dynamic: false, format: 'jpg' });
        const webp2 = member.displayAvatarURL({ dynamic: false, format: 'webp' });
        const gif2 = member.displayAvatarURL({ dynamic: true });
        const avatarMenu = new MessageActionRow().addComponents(
            new MessageSelectMenu({
                placeholder: 'Choose the Image Size',
                customId: 'main',
                options: [
                    
                    {
                        label: '128 pixels',
                        value: "Option 1",
                        emoji: '🖼️',
                    },
                    {
                        label: '256 pixels',
                        value: "Option 2",
                        emoji: '🖼️',
                    },
                    {
                        label: '1024 pixels',
                        value: "Option 0",
                        emoji: '🖼️',
                    },
                ]
            }),
        );

        const avtEmbed = new MessageEmbed()
            .setColor(client.config.color)
            .setTitle('Size : 1024px')
            .setImage(member.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
            .setDescription(`Download the image in:\n\n**[png](${png}) | [jpg](${jpg}) | [gif](${gif}) | [webp](${webp})**` || `**[png](${png}) | [jpg](${jpg})**` + ` || Server Pfp: **[png](${png2}) | [jpg](${jpg2}) | [gif](${gif2}) | [webp](${webp2})**`)

        let avt = await interaction.followUp({ content: '**' + member.user.tag + '**\'s Avatar', embeds: [avtEmbed], components: [avatarMenu] })

        const filter = async interaction => {

            if (interaction.user.id !== interaction.user.id) {
                interaction.reply({
                    content: ":x: Don't help other people to select the menu",
                    ephemeral: true
                });
                return false;
            };
            return true;
        }

        const collector = avt.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',
            time: 50000,
        })

        collector.on('collect', async (menu) => {
            if (menu.values[0] === 'Option 1') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 128px').setImage(member.user.displayAvatarURL({ size: 128, dynamic: true, format: 'png' }))
                    ]
                })
            } else if (menu.values[0] === 'Option 0') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 1024px').setImage(member.user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
                    ]
                })
            } else if (menu.values[0] === 'Option 2') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 256px').setImage(member.user.displayAvatarURL({ size: 256, dynamic: true, format: 'png' }))
                    ]
                })
            } else if (menu.values[0] === 'Option -3') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 128px [ Server Profile ]').setImage(member.displayAvatarURL({ size: 128, dynamic: true, format: 'png' }))
                    ]
                })
            } 
            else if (menu.values[0] === 'Option -2') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 256px [ Server Profile ]').setImage(member.displayAvatarURL({ size: 256, dynamic: true, format: 'png' }))
                    ]
                })
            } else if (menu.values[0] === 'Option -1') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 1024px [ Server Profile ]').setImage(member.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
                    ]
                })
            } 
        })

        collector.on('end', async (menu) => {
            avt.edit({ components: [] });
        })
    }
}
