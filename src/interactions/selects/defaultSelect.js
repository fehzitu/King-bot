// select
module.exports = {
    customId: 'defaultSelect',

    async execute(interaction) {
        const [id, ownerId] = interaction.customId.split(':');

        if (ownerId && interaction.user.id !== ownerId) {
            return interaction.reply({
                content: '❌ Isso não é pra você!',
                ephemeral: true
            });
        };

        const value = interaction.values[0];

        return interaction.reply({
            content: `Você escolheu: ${value}`,
            ephemeral: true
        });
    }
};