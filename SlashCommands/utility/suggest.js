const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu,
    Channel
} = require('discord.js')
// const rrModel = require('../../models/reactionroles');

module.exports = {
    name: 'suggestion',
    description: 'Suggestion System!',
    botPermissions: ['ADD_REACTIONS'],
    options: [{
            name: 'channel',
            type: 'SUB_COMMAND',
            description: 'Set a channel for Suggestions',
            options: [{
                name: 'channel',
                description: 'Channel for the Suggestions',
                type: 'CHANNEL',
                channelTypes: ['GUILD_TEXT'],
                required: true,
            }, ],
        },
        {
            name: 'suggest',
            type: 'SUB_COMMAND',
            description: 'Send a suggestion',
            options: [{
                name: 'query',
                description: 'Your Suggestion',
                type: 'STRING',
                required: true,
            }, ],
        },
        {
            name: 'reply',
            type: 'SUB_COMMAND',
            description: 'Reply a suggestion',
            options: [{
                name: 'token',
                description: 'Suggestion Token',
                type: 'STRING',
                required: true,
            }, {
                name: 'reply',
                description: 'Your reply for the Suggestion',
                type: 'STRING',
                required: true,
            }, ],
        },
    ],
    run: async (client, interaction, args) => {
        const [SubCommand] = args;

        if (SubCommand === "channel") {
            const Schema = require('../../models/channel');
            const channell = interaction.options.getChannel('channel');


            Schema.findOne({
                Guild: interaction.guild.id
            }, async (err, data) => {
                if (data) data.delete()
                new Schema({
                    Guild: interaction.guild.id,
                    Channel: channell.id,
                }).save();
                interaction.followUp(`I have set ${channell} for Suggestions!`)
            })
        } else if (SubCommand === "suggest") {
            const suggestion = interaction.options.getString('query');
            const CodeSchema = require('../../models/suggestion')

            const Schema = require('../../models/channel');
            Schema.findOne({
                Guild: interaction.guild.id
            }, async (err, data) => {
                const pass = generatePassword()
                const channell = interaction.guild.channels.cache.get(data.Channel)
                if (!data) return interaction.followUp('Suggestion Channel is not set');
                if (data) {
                    const embed = new MessageEmbed()
                        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle('Suggestion!')
                        .setColor('BLUE')
                        .setDescription(`**Suggestion:** ${suggestion}`)
                        .addField('Status:', 'Pending Reply...')
                        .setTimestamp()
                        .setFooter(`Suggestion Token: ${pass}`)
                    channell.send({
                        embeds: [embed]
                    }).then(m => {
                        const replyembed = new MessageEmbed()
                            .setColor('RED')
                            .setDescription(`✅ Your [Suggestion](https://discord.com/channels/${interaction.guild.id}/${data.Channel}/${m.id}) has been sent!`)
                        interaction.followUp({
                            embeds: [replyembed]
                        })
                        m.react('⬆')
                        m.react('⬇')
                        new CodeSchema({
                            message: m.id,
                            token: pass,
                            suggestion: suggestion,
                            user: interaction.user.id,
                            guild: interaction.guild.id
                        }).save()
                    })
                }

            })
        } else if (SubCommand === "reply") {
            const stoken = interaction.options.getString('token');
            const reply = interaction.options.getString('reply')
            const Schema = require('../../models/suggestion')
            Schema.findOne({
                token: stoken,
            }, async (err, data) => {
                if (!data) return interaction.followUp(`❌ Invalid Token`)
                const message = data.message
                const user = client.users.cache.get(data.user)
                const guild = data.guild
                const suggestion = data.suggestion

                if (interaction.guild.id !== guild) return interaction.followUp(`❌ Invalid Token`)
                const channelS = require('../../models/channel');
                const cookie = await channelS.findOne({
                    Guild: interaction.guild.id
                });
                const channel = cookie.Channel;
                const gchannel = interaction.guild.channels.cache.get(channel)
                if(!gchannel) return interaction.followUp(`❌ Couldnt find the Suggestion Channel.. Please set a new One`)
                if (channel) {
                    const embed = new MessageEmbed()
                        .setAuthor(`${user.tag}`, user.displayAvatarURL({dynamic: true}))
                        .setTitle('Suggestion!')
                        .setColor('GREEN')
                        .setDescription(`**Suggestion:** ${suggestion}`)
                        .addField('Status: Replied', reply)
                        .setTimestamp()
                        .setFooter(`Suggestion Token: ${stoken}`)
                        gchannel.messages.fetch(message).then(editm => {
                        editm.edit({ embeds: [embed] })
                        })
                    const newEmbed = new MessageEmbed()
                        .setColor('RED')
                    .setDescription(`[Suggestion](https://discord.com/channels/${interaction.guild.id}/${channel}/${message}) Has been Replied!`)
                    interaction.followUp({ embeds: [newEmbed] })
                    const userembed = new MessageEmbed()
                        .setColor('RED')
                    .setDescription(`Your [Suggestion](https://discord.com/channels/${interaction.guild.id}/${channel}/${message}) has been replied!`)
                    user.send({embeds: [userembed]})
                }

            })

        }
    }
}

function generatePassword() {
    var length = 12,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}