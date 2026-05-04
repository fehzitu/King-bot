// command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

// import custom functions
const createEmbed = require('../utils/embed.js');

module.exports = {
    // slash data
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Uma ajuda simples sobre o bot'),

    // prefix name
    name: 'ajuda',

    // execute
    async execute(ctx, args) {
        // get client and user
        const client = ctx.client;
        const user = ctx.user || ctx.author;

        // bot stats
        const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const totalChannels = client.channels.cache.size;
        const totalGuilds = client.guilds.cache.size;

        // uptime format
        const uptime = Math.floor(client.uptime / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;

        const formattedUptime = `${hours}h ${minutes}m ${seconds}s`;

        // embed
        const embed = createEmbed({user})
        .addFields([{
            name: '🥀 Em **qualquer servidor que eu estiver** basta **você utilizar** meu comando base pra **abrir o menu e interagir comigo** no chat.',
            value: '**👉 comando base "k.menu" ou "/menu"**'
        }])
        .setImage('https://cdn.discordapp.com/attachments/1478819111906705430/1491724642799583322/images.jpeg?ex=69d8bc55&is=69d76ad5&hm=20d6a24780e97cda50b1b41b0721d16a856c588b144551bd7c3e26dfb7b3fb14&');

        // reply
        return ctx.reply({ embeds: [embed] });
    }
};