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
                name: `**Menu interativo📜**`, value: '**📦: Inventário 📄: Comandos ⚙️: Suporte**'
            })
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1477308406774632459/20260228_081056.jpg?ex=69d11d2b&is=69cfcbab&hm=3479091cb8f66f9b607e5bdd2eda0b0203cb6aebd3c4f7b4d7b3143c1bcd0828')
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
            .setLabel('📄')
            .setStyle('PRIMARY')
            .setDisabled(true);

        // support menu button
        const supportMenuBtn = new Discord.MessageButton()
            .setCustomId(`supportMenuBtn:${message.author.id}`)
            .setLabel('⚙️')
            .setStyle('PRIMARY')
            .setDisabled(true);

        // add itens on this row
        let row = new Discord.MessageActionRow().addComponents(inventoryMenuBtn, commandsMenuBtn, supportMenuBtn);

        // send response
        await message.reply({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};