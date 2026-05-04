const { MessageEmbed } = require('discord.js');

// create embed
module.exports = function createEmbed({ user, color = 'RANDOM' } = {}) {
    const embed = new MessageEmbed()
        .setColor(color)
        .setTimestamp()
        .setFooter({ text: 'Atualizado' });

    if (user) {
        embed.setAuthor({
            name: `@${user.username}`,
            iconURL: user.displayAvatarURL({ dynamic: true })
        });
    };

    return embed;
};