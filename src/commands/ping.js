// command
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    // slash data
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong'),
    // name for prefix usage
    name: 'ping',
    // execute
    async execute(ctx, args) {
        // slash command
        if (ctx.isCommand && ctx.isCommand()) {
            return ctx.reply('Pong!');
        };

        // prefix command
        return ctx.reply('Pong!');
    }
};