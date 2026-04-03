// discord implements
const Discord = require('discord.js');

module.exports = {
    customId: 'backMenuBtn',
    async execute(interaction) {
        // check if this is a button
        if (!interaction.isButton()) return;

        await interaction.deferUpdate();

        // get id from the user thats click the button
        const [, targetId] = interaction.customId.split(':');
        if (!targetId) return;

        // only the original target (the person mentioned) can click
        if (interaction.user.id !== targetId) {
            return interaction.followUp({
                content: 'Apenas o usuário pode interagir. ❌',
                ephemeral: true
            });
        };

        // fetch original user
        let target = interaction.client.users.cache.get(targetId);
        if (!target) {
            target = await interaction.client.users.fetch(targetId).catch(() => null);
        };

        // check the message target
        if (!target) {
            return interaction.followUp({
                content: 'Usuário original não encontrado. ❌',
                ephemeral: true
            });
        };

        // base embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: target.displayAvatarURL(),
                name: `@${target.username}`
            })
            .addFields({
                name: `**Menu interativo📜**`, value: '**📦: Inventário 📄: Comandos ⚙️: Suporte**'
            })
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1489738513095196793/user-profile.png?ex=69d1829b&is=69d0311b&hm=ddea025af94a3ad22f5c3c702d6b056b5f5404a999a85c5ce1adb0895739ef54')
            .setTimestamp()
            .setFooter({ text: 'Atualizado' });

        // inventory menu button
        const inventoryMenuBtn = new Discord.MessageButton()
            .setCustomId(`inventoryMenuBtn:${targetId}`)
            .setLabel('📦')
            .setStyle('PRIMARY')
            .setDisabled(true);

        // commands menu button
        const commandsMenuBtn = new Discord.MessageButton()
            .setCustomId(`commandsMenuBtn:${targetId}`)
            .setLabel('📄')
            .setStyle('PRIMARY')
            .setDisabled(true);

        // support menu button
        const supportMenuBtn = new Discord.MessageButton()
            .setCustomId(`supportMenuBtn:${targetId}`)
            .setLabel('⚙️')
            .setStyle('PRIMARY');

        // add itens on this row
        let row = new Discord.MessageActionRow().addComponents(inventoryMenuBtn, commandsMenuBtn, supportMenuBtn);

        // remove the button after click
        await interaction.message.edit({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};