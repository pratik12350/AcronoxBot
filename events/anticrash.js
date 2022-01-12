let { MessageEmbed } = require("discord.js")
let client = require("../index.js")



process.on("unhandledRejection", (reason, p) => {

  console.log(reason, p)
 
    const embed = new MessageEmbed()
        .setAuthor(`Anti Crash`, client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Unhandled Rejection`)
        .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
        .addField("Promise", `\`\`\`${p}\`\`\``, true)
        .addField("Reason", `\`\`\`${reason.stack}\`\`\``, true)
        .setTimestamp()
        .setFooter("Imagine a bot without anti-crash")
        .setColor(`#2F3136`)

        return client.channels.cache.get("906053930746794004").send({ embeds: [embed]})

  process.exit(1)
});


process.on("uncaughtException", (err, origin) => {

  //  const channel = client.channels.cache.get("901478033628753951")

    const embed = new MessageEmbed()
    .setAuthor(`Anti Crash`, client.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`Uncaught Exception`)
    .setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
    .addField("Origin", `\`\`\`${origin}\`\`\``, true)
    .addField("Error", `\`\`\`${err}\`\`\``, true)
    .setTimestamp()
    .setFooter("Imagine a bot without anti-crash")
.setColor(`#2F3136`)

    return client.channels.cache.get("906053930746794004").send({ embeds: [embed]})
 process.exit(1)
});


process.on("uncaughtExceptionMonitor", (err, origin) => {

 //   const channel = client.channels.cache.get("901478033628753951")

    const embed = new MessageEmbed()
   // .setAuthor(`Anti Crash`, client.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`Uncaught Exception Monitor`)
    .setURL("https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor")
    .addField("Origin", `\`\`\`${origin}\`\`\``, true)
    .addField("Error", `\`\`\`${err}\`\`\``, true)
    .setTimestamp()
    .setFooter("Imagine a bot without anti-crash")
    .setColor(`#2F3136`)

    return client.channels.cache.get("906053930746794004").send({ embeds: [embed]})
process.exit(1)
});

process.on("multipleResolves", (type, promise, reason) => {

   // const channel = client.channels.cache.get("901478033628753951")

    const embed = new MessageEmbed()
    .setAuthor(`Anti Crash`, client.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`Multiple Resolves`)
    .setURL("https://nodejs.org/api/process.html#event-multipleresolves")
    .addField("Type", `\`\`\`${type}\`\`\``, false)
    .addField("Promise", `\`\`\`${promise}\`\`\``, true)
    .addField("Reason", `\`\`\`${reason}\`\`\``, true)
    .setTimestamp()
    .setFooter("Imagine a bot without anti-crash")
    .setColor(`#2F3136`)

    return client.channels.cache.get("906053930746794004").send({ embeds: [embed]})

});