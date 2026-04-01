// discord implements
const Discord = require('discord.js');

// node file system
const path = require('path');

// importing custom functions
const {
    fallbackImage
} = require(path.join(__dirname, '../../../functions/waifuApi.js'));
const {
    getImg
} = require('../../../functions/waifuApi.js');

module.exports = {
    // "customId" will receive the value that will be the id to use this interaction / this button
    customId: 'biteBack',
    async execute(interaction) {
        // define endpoint
        let endpoint = 'bite';

        // avoids old button error
        if (!interaction.isButton()) return;

        // loading
        await interaction.deferUpdate();

        // retrieves data from the button
        const userId = interaction.customId.split(':')[1];
        const user = await interaction.client.users.fetch(userId);

        // get image
        let img = await getImg(endpoint);

        if (!img || typeof img !== 'string') {
            img = fallbackImage;
        };

        // create embed
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

        // edit the original message
        await interaction.message.edit({
            embeds: [embed],
            components: interaction.message.components
        });
    }
};