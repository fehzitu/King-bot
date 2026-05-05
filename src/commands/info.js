// command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

// import custom functions
const createEmbed = require('../utils/embed.js');

module.exports = {
    // slash data
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Mostra informações do bot'),

    // prefix name
    name: 'info',

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
        .addFields({
            name: `👑 Nome: **${client.user.tag}**`,
            value: `😎 Criador: <@830634043560296468>\n⏳ Tempo ativo: **${formattedUptime}**`,
            inline: true
        },
        {
            name: `🏠 Servidores: **${totalGuilds}**`,
            value: `📚 Canais: **${totalChannels}**\n👥 Usuários: **${totalUsers}**`,
            inline: true
        })
        .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491764536322035802/yuliowo.gif');

        // reply
        return ctx.reply({ embeds: [embed] });
    }
};