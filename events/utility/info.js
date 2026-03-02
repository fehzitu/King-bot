// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // get bot info
        const client = message.client;

        // bot info
        const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const totalChannels = client.channels.cache.size;
        const totalGuilds = client.guilds.cache.size;

        // catch the message content and set to lower case
        const content = message.content.toLowerCase();

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setTitle('**🤖 Bot Information**')
            .setThumbnail(`${message.client.user.displayAvatarURL()}`)
            .addFields({
                name: '👑 Bot Name',
                value: `**${client.user.tag}**`
            },
                {
                    name: '🆔 Bot ID',
                    value: `**${client.user.id}**`
                },
                {
                    name: '📡 Ping',
                    value: `**${client.ws.ping}ms**`
                },
                {
                    name: '🏠 Servers',
                    value: `**${totalGuilds}**`
                },
                {
                    name: '👥 Users',
                    value: `**${totalUsers}**`
                },
                {
                    name: '📚 Channels',
                    value: `**${totalChannels}**`
                },
                {
                    name: '⏳ Uptime',
                    value: `**${Math.floor(client.uptime / 1000)} seconds**`
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