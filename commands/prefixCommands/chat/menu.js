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
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1489750534926897282/list.png?ex=69d18dcd&is=69d03c4d&hm=6f5e1b560e61527b415802e6e901269f033e14ecd07f73aa725fbd130e297b96')
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
            .setStyle('PRIMARY');

        // add itens on this row
        let row = new Discord.MessageActionRow().addComponents(inventoryMenuBtn, commandsMenuBtn, supportMenuBtn);

        // send response
        await message.reply({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};