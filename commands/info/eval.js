
const Discord = require('discord.js');
const { inspect } = require("util");

module.exports = {
  name: "eval",
  aliases: ['e'],
  locked: true,
  run: async (client, message, args) => {
    const owners = [

      "742228129107410976"
    ]
    if(!owners.includes(message.author.id)) return;
         const code = args.join(" ");
    if(!code) return message.reply(`gib code`)
  const token = client.token.split("").join("[^]{0,2}");
  const rev = client.token.split("").reverse().join("[^]{0,2}");
  const filter = new RegExp(`${token}|${rev}`, "g");
  try {
    let output = eval(code);
    if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
    output = inspect(output, { depth: 0, maxArrayLength: null });
    output = output.replace(filter, "no");
    if (output.length < 1950) {
        const outputembed = new Discord.MessageEmbed()
        .setTitle('Evaluation Successful')
        .setDescription('**Argument**\n\`\`\`js\n' + code + '\`\`\`\n\n**Output**\n```js\n' + output + '```')
          .setColor(`RANDOM`)
        .setFooter('Acronox', client.user.displayAvatarURL())
  message.channel.send({ embeds: [outputembed] });
    }
  } catch (error) {
    message.reply({content: ` \`\`\`js\n${error}\`\`\` `});
 }}}
 
