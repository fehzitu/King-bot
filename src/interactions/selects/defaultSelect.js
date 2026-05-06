// select
module.exports = {
    customId: 'defaultSelect',

    async execute(interaction) {
        const [id, ownerId] = interaction.customId.split(':');

        // user restriction
        if (ownerId && interaction.user.id !== ownerId) {
            return interaction.reply({
                content: '❌ Isso não é pra você!',
                ephemeral: true
            });
        };

        const value = interaction.values?.[0];

        // safety check
        if (!value) {
            return interaction.reply({
                content: '⚠️ Nenhuma opção selecionada.',
                ephemeral: true
            });
        };

        return interaction.reply({
            content: `⚜️ Você escolheu: ${value}`,
            ephemeral: true
        });
    }
};