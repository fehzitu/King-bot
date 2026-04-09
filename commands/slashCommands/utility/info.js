// discord implements
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Mostra informações do bot!'),
    async execute(interaction) {
        // bot info
        const totalUsers = interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const totalChannels = interaction.client.channels.cache.size;
        const totalGuilds = interaction.client.guilds.cache.size;

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${interaction.user.displayAvatarURL()}`,
                name: `@${interaction.user.username}`
            })
            .setTitle('**🤖 Informações do bot**')
            .addFields([{
                name: `👑 Nome e Id: **${interaction.client.user.tag}** | **${interaction.client.user.id}**`,
                value: `⏳ Uptime: **${Math.floor(interaction.client.uptime / 1000)} seconds**\n📡 Ping: **${interaction.client.ws.ping}ms**`
            }])
            .setImage('https://cdn.discordapp.com/attachments/1478819111906705430/1491724642589736970/images_2.jpeg?ex=69d8bc55&is=69d76ad5&hm=c3251ef4c9365df3c11f34df64de6109064f4268a539c2e1a03cf5315d3b8098&')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // set the main message to be send
        await interaction.reply({
            embeds: [embed]
        });
    }
};