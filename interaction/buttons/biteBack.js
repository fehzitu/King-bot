// discord implements
const Discord = require('discord.js');

// node file system
const path = require('path');

// importing custom functions
const {
    fallbackImage,
    getImg
} = require(path.join(__dirname, '../../../functions/waifuApi.js'));

module.exports = {
    customId: 'biteBack',
    async execute(interaction) {
        let endpoint = 'bite';

        if (!interaction.isButton()) return;

        await interaction.deferUpdate();

        // get data safely
        const [, userId] = interaction.customId.split(':');
        if (!userId) return;

        // 🔒 lock button to original user
        const authorId = interaction.message.interaction?.user?.id;
        if (authorId && interaction.user.id !== authorId) {
            return interaction.followUp({
                content: '❌ Você não pode usar esse botão.',
                ephemeral: true
            });
        };

        // get user safely
        let user = interaction.client.users.cache.get(userId);
        if (!user) {
            user = await interaction.client.users.fetch(userId).catch(() => null);
        };

        if (!user) {
            return interaction.followUp({
                content: '❌ Usuário não encontrado.',
                ephemeral: true
            });
        };

        // get image
        const img = (await getImg(endpoint)) || fallbackImage;

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .setDescription(`😡 **<@${interaction.user.id}> mordeu <@${user.id}> de volta**❗`)
            .setImage(img)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        await interaction.message.edit({
            embeds: [embed],
            components: interaction.message.components
        });
    }
};