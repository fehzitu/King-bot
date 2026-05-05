// command
const { SlashCommandBuilder } = require('@discordjs/builders');
const createEmbed = require('../utils/embed');

module.exports = {
    // slash data
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mostra a latência do bot'),

    // prefix name
    name: 'ping',

    // execute
    async execute(ctx, args) {
        const client = ctx.client;
        const user = ctx.user || ctx.author;

        // start time
        const start = Date.now();

        // calculate latencies
        const end = Date.now();
        const responseTime = end - start;
        const apiPing = client.ws.ping;

        // create embed
        const embed = createEmbed({ user });

        embed.setDescription(
            `🏓 **Pong!**\n\n` +
            `📡 API: **${apiPing}ms**\n` +
            `⚡ Resposta: **${responseTime}ms**`
        );

        // reply
        return ctx.reply({ embeds: [embed] });
    }
};