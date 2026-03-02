// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // bot info
        const totalUsers = message.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const totalChannels = message.client.channels.cache.size;
        const totalGuilds = message.client.guilds.cache.size;

        // catch the message content and set to lower case
        const content = message.content.toLowerCase();

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setTitle('**🤖 Informações do bot**')
            .setThumbnail(`${message.client.user.displayAvatarURL()}`)
            .addFields({
                name: `👑 Nome e Id: **${message.client.user.tag}** | **${message.client.user.id}**`,
                value: `⏳ Uptime: **${Math.floor(message.client.uptime / 1000)} seconds**\n📡 Ping: **${message.client.ws.ping}ms**`
            },
                {
                    name: `🏠 Servidores: **${totalGuilds}**`,
                    value: `📚 Canais: **${totalChannels}**\n👥 Usuários: **${totalUsers}**`
                })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // check if the message has "k.info"
        if (content == 'k.info') {
            const response = await message.reply({
                embeds: [embed]
            });
        };
    }
};