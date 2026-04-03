// discord implements
const Discord = require('discord.js');

// node file system
const path = require('path');

// importing custom functions
const {
    fallbackImage,
    getImg
} = require(path.join(__dirname, '../../functions/waifuApi.js'));

module.exports = {
    customId: 'biteBack',
    async execute(interaction) {
        // check if this is a button
        if (!interaction.isButton()) return;

        await interaction.deferUpdate();

        // get id from the user thats click the button
        const [, targetId] = interaction.customId.split(':');
        console.log(interaction)
        if (!targetId) return;

        // only the original target (the person mentioned) can click
        if (interaction.user.id !== targetId) {
            return interaction.followUp({
                content: 'Apenas o alvo pode revidar. ❌',
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

        // get bite image
        const img = (await getImg('bite')) || fallbackImage;

        // create revenge embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: target.displayAvatarURL(),
                name: `@${target.username}`
            })
            .setDescription(`😡 **<@${target.id}> te mordeu de volta**❗`)
            .setImage(img)
            .setTimestamp()
            .setFooter({ text: 'Atualizado' });

        // remove the button after click
        await interaction.message.edit({
            embeds: [embed],
            components: []
        });
    }
};