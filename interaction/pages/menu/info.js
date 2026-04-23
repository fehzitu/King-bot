// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'info',
    execute(ctx) {
        // get the user and client
        const user = ctx.user || ctx.author;
        const client = ctx.client;

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // bot info
        const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const totalChannels = client.channels.cache.size;
        const totalGuilds = client.guilds.cache.size;

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields({
                name: `👑 Nome: **${client.user.tag}**`,
                value: `⏳ Uptime: **${Math.floor(client.uptime / 1000)} seconds**\n📡 Ping: **${client.ws.ping}ms**`,
                inline: true
            },
                {
                    name: `🏠 Servidores: **${totalGuilds}**`,
                    value: `📚 Canais: **${totalChannels}**\n👥 Usuários: **${totalUsers}**`,
                    inline: true
                })
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491798798505082920/images_2.jpeg?ex=69d90165&is=69d7afe5&hm=03c7377c4333769a4dc11c52413d49aa3c3f6fdc3cbf5b3c006b42c11fbf30e3')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:menu:home:${user.id}`)
                .setLabel('↩️')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};