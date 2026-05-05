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
        .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1501199433201618984/Killua_Hunter_X_Hunter_GIF_-_Killua_Hunter_X_Hunter_Killua_Lightning_-_Descobrir_e_Compartilhar_GIFs.gif?ex=69fb346b&is=69f9e2eb&hm=d8b93ace4e22f03f6fc4698e2c190c996614c72ea9c9dc9b9b33b5c42eb3e7b3&');

        // reply
        return ctx.reply({ embeds: [embed] });
    }
};