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

        // catch the message content and set to lower case
        const content = message.content.toLowerCase();

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
                value: `**${client.ws.ping}ms**`
            })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // check if the message has "k.ping"
        if (content == 'k.ping') {
            const response = await message.reply({
                embeds: [embed]
            });
        };
    }
};