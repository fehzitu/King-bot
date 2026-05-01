// command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    // slash data
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Mostra informações do bot'),

    // prefix name
    name: 'info',

    // execute
    async execute(ctx, args) {
        // get client
        const client = ctx.client;

        // get user
        const user = ctx.user || ctx.author;

        // bot stats
        const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const totalChannels = client.channels.cache.size;
        const totalGuilds = client.guilds.cache.size;

        // embed
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields(
                {
                    name: `👑 Nome: **${client.user.tag}**`,
                    value: `⏳ Uptime: **${Math.floor(client.uptime / 1000)}s**\n📡 Ping: **${client.ws.ping}ms**`,
                    inline: true
                },
                {
                    name: `🏠 Servidores: **${totalGuilds}**`,
                    value: `📚 Canais: **${totalChannels}**\n👥 Usuários: **${totalUsers}**`,
                    inline: true
                }
            )
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491764536322035802/yuliowo.gif')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // buttons
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('returnBtn')
                .setLabel('↩️')
                .setStyle('PRIMARY')
                .setDisabled(true)
        );

        // reply (works for slash + prefix)
        return ctx.reply({
            embeds: [embed],
            components: [row]
        });
    }
};