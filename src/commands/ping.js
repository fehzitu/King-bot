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

        // calculate latencies
        const apiPing = client.ws.ping;

        // create embed
        const embed = createEmbed({ user })
        .addFields([{
            name: '🏓 **Pong!**',
            value: `📡 Api: **${apiPing}ms**`
        }])
        .setImage('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExejdwZHowNDRnMjZ4dHBkcWNpbTA2NDRibjdpamliNmNmcDZyaTBoaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2jmnf6gznuL8Q/giphy.gif');

        // reply
        return ctx.reply({ embeds: [embed] });
    }
};