const Discord = require('discord.js');

module.exports = {
    name: Discord.Events.MessageCreate,
    async execute(message) {
        // check if an bot send the message
        if (message.author.bot) return;

        // check the server and channel from the message
        const guildName = message.guild?.name ?? "DM";
        const channelName = message.channel?.name ?? "DM";

        // log
        console.log(`[${new Date().toLocaleTimeString()}] @${message.author.tag} ${guildName} ${channelName}: ${message.content}`);

        // commands prefix
        const prefix = "k.";

        // set lower case
        const content = message.content.toLowerCase();
        if (!content.startsWith(prefix)) return;

        // get args from message content
        const args = content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift();

        // get the command by the name
        const command = message.client.prefixCommands.get(commandName);
        if (!command) return;

        // handle error
        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
        }
    }
};