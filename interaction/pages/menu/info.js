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
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491764536322035802/yuliowo.gif?ex=69d8e17d&is=69d78ffd&hm=93ba3d94e4fa0d41eacb0ffc689604c26d884ee632a491e54c9c3e9b6cfd9e9f')
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