// SHELL / TERMINAL / CONSOLE / EXEC command. 

const Discord = require('discord.js');

const process = require('child_process');
module.exports = {
    name: "terminal",
    aliases: ['console', 'shell'],
       run: async(client, message, args) => {
          if(message.author.id === '742228129107410976') {
const msg = await message.channel.send(`Please wait, this may take a white.`);
msg.delete({timeout: 4000});
process.exec(args.join(" ") , (error, stdout) => { let result = (stdout || error);
message.channel.send(result, { code: "asciidoc", split: "\n"}).catch(err => message.channel.send(err))
}) 
} else { 
return message.reply(`Developers Only !`); 
}

}

}
// My Discord Tag 😂 :- VΣX丶ПΣӨП丶SHIVAM _ 🍷🌹🖤†#6969