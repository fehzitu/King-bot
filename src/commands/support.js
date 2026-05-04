// command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

// import custom functions
const createEmbed = require('../utils/embed.js');

module.exports = {
    // slash data
    data: new SlashCommandBuilder()
        .setName('suporte')
        .setDescription('Mostra informações do suporte do bot'),

    // prefix name
    name: 'suporte',

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
            name: '**🤖 Ainda estou em desenvolvimento então pode ser que algo de errado ou inesperado aconteça. Se for o caso informe aos desenvolvedores bellzitu / karyarky**',
            value: '**☕ Bora tomar um café?**'
        }])
        .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491798480216264824/93f04b4b1103cc4e6410bb4f831acb6c.gif?ex=69d90119&is=69d7af99&hm=ca14d33797d593d0914af41ff129a00fc1f87c8ab1ce3a564058456fc749bb34&');

        // reply
        return ctx.reply({ embeds: [embed] });
    }
};