const Discord = require('discord.js');

module.exports = {
    name: 'info',
    execute(ctx) {
        // get the user and client
        const user = ctx.user || ctx.author;
        const client = ctx.client;
        
        // error log
        if(!user) {
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
            .setTitle('**🤖 Informações do bot**')
            .addFields({
                name: `👑 Nome e Id: **${client.user.tag}** | **${client.user.id}**`,
                value: `⏳ Uptime: **${Math.floor(client.uptime / 1000)} seconds**\n📡 Ping: **${client.ws.ping}ms**`
            },
                {
                    name: `🏠 Servidores: **${totalGuilds}**`,
                    value: `📚 Canais: **${totalChannels}**\n👥 Usuários: **${totalUsers}**`
                })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create the row
        let row = null;

        // create some buttons inside a row
        row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`menu:page:home:${user.id}`)
                .setLabel('🏠')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};