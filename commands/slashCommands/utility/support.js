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
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491798798505082920/images_2.jpeg?ex=69d90165&is=69d7afe5&hm=03c7377c4333769a4dc11c52413d49aa3c3f6fdc3cbf5b3c006b42c11fbf30e3')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
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