// discord implements
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Mostra informações do bot!'),
    async execute(interaction) {
        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${interaction.user.displayAvatarURL()}`,
                name: `@${interaction.user.username}`
            })
            .setTitle('Title')
            .addFields([{
                name: `Name`,
                value: `Value`
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491764536322035802/yuliowo.gif?ex=69d8e17d&is=69d78ffd&hm=93ba3d94e4fa0d41eacb0ffc689604c26d884ee632a491e54c9c3e9b6cfd9e9f')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // set the main message to be send
        await interaction.reply({
            embeds: [embed]
        });
    }
};