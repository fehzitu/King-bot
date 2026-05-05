// button
module.exports = {
    customId: 'defaultButton',

    async execute(interaction) {
        const [id, ownerId] = interaction.customId.split(':');

        if (interaction.user.id !== ownerId) {
            return interaction.reply({
                content: '❌ Isso não é pra você!',
                ephemeral: true
            });
        };

        return interaction.reply({
            content: '☕️ Esse botão é um exemplo apenas.',
            ephemeral: true
        });
    }
};