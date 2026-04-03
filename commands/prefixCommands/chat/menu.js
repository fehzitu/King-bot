// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'menu',
    async execute(message) {
        if (message.author.bot) return;

        // anti-spam (3s)
        if (!message.client.cooldowns) message.client.cooldowns = new Set();
        if (message.client.cooldowns.has(message.author.id)) return;

        message.client.cooldowns.add(message.author.id);
        setTimeout(() => message.client.cooldowns.delete(message.author.id), 3000);

        // base embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .addFields({
                name: `**Menu interativo📜**`, value: '📦**: Inventário**'
            })
            .setTimestamp()
            .setFooter({ text: 'Atualizado' });

        // inventory menu button
        const inventoryMenuBtn = new Discord.MessageButton()
            .setCustomId(`inventoryMenuBtn:${message.author.id}`)
            .setLabel('📦')
            .setStyle('PRIMARY')
            .setDisabled(true);

        // commands menu button
        const commandsMenuBtn = new Discord.MessageButton()
            .setCustomId(`commandsMenuBtn:${message.author.id}`)
            .setLabel('🕹️')
            .setStyle('PRIMARY')
            .setDisabled(true);

        // support menu button
        const supportMenuBtn = new Discord.MessageButton()
            .setCustomId(`supportMenuBtn:${message.author.id}`)
            .setLabel('⚙️')
            .setStyle('PRIMARY')
            .setDisabled(true);

        // add itens on this row
        let row = new Discord.MessageActionRow().addComponents(button);

        // send response
        await message.reply({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};