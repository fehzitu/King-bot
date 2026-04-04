// discord implements
const Discord = require('discord.js');

module.exports = {
    customId: 'support',
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

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: target.displayAvatarURL(),
                name: `@${target.username}`
            })
            .setTitle('🤖 **{ Ainda estou em desenvolvimento então pode ser que algo de errado ou inesperado aconteça. Se for o caso informe aos desenvolvedores bellzitu / dr3ssa }\n\n**')
            .addFields({
                name: '☕ **Ajude a nossa equipe!**',
                value: '😉 **Qualquer ajuda será bem vinda!**'
            })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // support menu button
        const backButton = new Discord.MessageButton()
            .setCustomId(`backMenuBtn:${targetId}`)
            .setLabel('↩️')
            .setStyle('PRIMARY')
            .setDisabled(true);

        // add itens on this row
        let row = new Discord.MessageActionRow().addComponents(backButton);

        // remove the button after click
        await interaction.message.edit({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};