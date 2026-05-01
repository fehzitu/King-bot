const config = require('../../config');
const log = require('../../utils/logger');

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        // ignore bots
        if (message.author.bot) return;

        const userTag = message.author.tag;

        // log message
        const guild = message.guild ? message.guild.name : 'DM';
        const channel = message.guild ? message.channel.name : 'DM';

        log('INFO', `${userTag} in ${guild} #${channel}: ${message.content}`);

        // prefix
        const prefix = config.prefix;

        // check prefix
        if (!message.content.toLowerCase().startsWith(prefix)) return;

        // args
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        // get command
        const command = client.commands.get(commandName);

        if (!command) {
            log('WARNING', `Unknown command: ${commandName}`);
            return;
        };

        log('INFO', `Prefix command: ${commandName} used by ${userTag}`);

        // execute command
        try {
            await command.execute(message, args);
        } catch (error) {
            log('ERROR', `Command error (${commandName}): ${error.message}`);
        };
    }
};