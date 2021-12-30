const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // Register for a single guild
     await client.guilds.cache.     get("890260823572889610")          .commands.set(arrayOfSlashCommands);

        // Register for all the guilds the bot is in
        await client.application.commands.set(arrayOfSlashCommands);
    });

    // mongoose
    const { mongooseConnectionString } = require('../config.json')
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb'));

  const { readdirSync } = require('fs')

  /*

const ascii = require('ascii-table')
let table = new ascii("Commands");
table.setHeading('Command', ' Load status');

    // Load Status
    readdirSync('./SlashCommands/').forEach(dir => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../SlashCommands/${dir}/${file}`);
            if (pull.name) {
                table.addRow(file, '✅')
            } else {
                table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
                continue;
            }
        }
    });
    console.log(table.toString()); 
  */
}
