// discord implements
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suporte')
        .setDescription('Nosso servidor de suporte!'),
    async execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${user.displayAvatarURL()}`,
                name: `@${user.username}`
            })
            .addFields([{
                name: `👑 **Drakay**, nosso servidor de suporte!`,
                value: "🔗 **https://discord.gg/Wpgu4qXWUk**"
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491764536322035802/yuliowo.gif?ex=69d8e17d&is=69d78ffd&hm=93ba3d94e4fa0d41eacb0ffc689604c26d884ee632a491e54c9c3e9b6cfd9e9f')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });
            
        // create the row
        let row = null;

        // create some buttons inside a row
        row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:slash:help:${user.id}`)
                .setLabel('ℹ️')
                .setStyle('PRIMARY')
        );

        // set the main message to be send
        await ctx.reply({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};