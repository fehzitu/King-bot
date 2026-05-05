const [id, ownerId] = interaction.customId.split(':');

// if button has owner
if (ownerId && interaction.user.id !== ownerId) {
    const createEmbed = require('../../utils/embed');

    const embed = createEmbed({ user: interaction.user })
    .setDescription('❌ Isso não é pra você!');

    return interaction.reply({
        embeds: [embed],
        ephemeral: true
    });
};