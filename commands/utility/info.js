// discord implements
const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('info')
        .setDescription('Mostra informações do bot!'),
    async execute(interaction) {
        // bot info
        const totalUsers = interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const totalChannels = interaction.client.channels.cache.size;
        const totalGuilds = interaction.client.guilds.cache.size;

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${interaction.user.displayAvatarURL()}`,
                name: `@${interaction.user.username}`
            })
            .setTitle('**🤖 Bot Information**')
            .setThumbnail(`${interaction.client.user.displayAvatarURL()}`)
            .addFields({
                name: `👑 Nome e Id: **${interaction.client.user.tag}** | **${interaction.client.user.id}**`,
                value: `⏳ Uptime: **${Math.floor(interaction.client.uptime / 1000)} seconds**\n📡 Ping: **${interaction.client.ws.ping}ms**`
            },
                {
                    name: `🏠 Servidores: **${totalGuilds}**`,
                    value: `📚 Canais: **${totalChannels}**\n👥 Usuários: **${totalUsers}**`
                })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // set the main message to be send
        const response = await interaction.reply({
            embeds: [embed]
        });
    }
};