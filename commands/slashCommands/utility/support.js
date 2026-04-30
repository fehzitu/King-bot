// discord implements
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// import factory
const { createDefaultUser } = require('../../../functions/levelSystem.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suporte')
        .setDescription('Nosso servidor de suporte!'),
    async execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // get the client
        const client = ctx.client;

        // load all the users
        const usersObject = client.usersData;

        // ensure user exists
        if (!usersObject[user.id]) {
            usersObject[user.id] = createDefaultUser();
        }

        // get the user
        const rpgUser = usersObject[user.id];

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
                name: `@${user.username} Lv.${rpgUser.rpg.level} ${rpgUser.rpg.medals}`
            })
            .addFields([{
                name: `👑 **Drakay**, nosso servidor de suporte!`,
                value: '🔗 **https://discord.gg/Wpgu4qXWUk**'
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491798798505082920/images_2.jpeg')
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