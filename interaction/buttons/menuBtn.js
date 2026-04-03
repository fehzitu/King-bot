// discord implements
const Discord = require('discord.js');

module.exports = {
    customId: 'menuBtn',
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
                content: 'Apenas o alvo pode interagir. ❌',
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

        // create revenge embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: target.displayAvatarURL(),
                name: `@${target.username}`
            })
            .setDescription(`**<@${targetId}> clicou feito um otário**❗`)
            .setTimestamp()
            .setFooter({ text: 'Atualizado' });

        // remove the button after click
        await interaction.message.edit({
            embeds: [embed],
            components: []
        });
    }
};