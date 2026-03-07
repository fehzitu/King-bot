// discord implements
const Discord = require('discord.js');

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'ping',
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setTitle('**🏓 Pong!**')
            .setThumbnail(`${message.client.user.displayAvatarURL()}`)
            .addFields({
                name: '📡 Ping',
                value: `**${message.client.ws.ping}ms**`
            })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // response
        await message.reply({
            embeds: [embed]
        });
    }
};