const client = require("../index");
const Schema = require("../models/automod")

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

//Anti swear here

  
//----------
  

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

try {
    if(!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return message.author.send(`<:error:882263202992357437> | I am Missing \`SEND MESSAGES\` Permission in that Channel!`)
    if(!message.channel.permissionsFor(client.user.id).has("ATTACH_FILES")) return message.channel.send(`<:error:882263202992357437> | I Need \`ATTACH FILES\` Permission to Run the Command!`)

    if(command.locked) {
    
      if(message.author.id !== "742228129107410976") {
        message.channel.send(`The Bot is Not Yours! <:baka:899697154258534430>`)
        return message.react("<:baka:899697154258534430>");
    }
    }

    if(command.nsfw) {
      if(!message.channel.nsfw) return message.channel.send({ content: `${process.env.error} | This Command Can Only Be Used in NSFW Channel!`})
    }

    if(command.args && !args.length) {
      const embed = new Discord.MessageEmbed()
      .setDescription(`\`\`\`${command.args} is a Required Argument that is Missing!\n^^^^^\`\`\``)
      .setColor(`RED`)
			return message.channel.send( { embeds: [embed] } );
    }

    if(command.botperms) {
      if(!message.guild.me.permissionsIn(message.channel).has(`${command.botperms}`)) {
        const embed = new Discord.MessageEmbed()
      .setDescription(`<:error:882263202992357437> | I am Missing \`${command.permissions}\` Permissions to Run This Command!`)
      .setColor(`RED`)
			return message.channel.send( { embeds: [embed] } );
      }
    }

    if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
      const embed = new Discord.MessageEmbed()
      .setDescription(`<:error:882263202992357437> | You Are Missing \`${command.permissions}\` Permissions to Run This Command!`)
      .setColor(`RED`)
			return message.channel.send( { embeds: [embed] } );
		}
        }
      await command.run(client, message, args);
      
    } catch(error) {
      message.channel.send(`AN ERROR OCCURED:\n\`\`\`js\n${error}\`\`\``)
          }

  
  
});
