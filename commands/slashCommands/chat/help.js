// discord implements
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// import factory
const { createDefaultUser } = require('../../../functions/levelSystem.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Recebe ajuda sobre nosso sistema!'),
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
                name: '🥀 Em **qualquer servidor que eu estiver** basta **você utilizar** meu comando base pra **abrir o menu e interagir comigo** no chat.',
                value: '**👉 comando base "k.menu"**'
            }])
            .setImage('https://cdn.discordapp.com/attachments/1478819111906705430/1491724642799583322/images.jpeg')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:menu:home:${user.id}`)
                .setLabel('🏠')
                .setStyle('PRIMARY')
        );

        // set the main message to be send
        await ctx.reply({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};