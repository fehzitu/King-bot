// discord implements
const Discord = require('discord.js');

// import factory
const { createDefaultUser } = require('../../../functions/levelSystem.js');

module.exports = {
    name: 'admin',
    async execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // error log (ANTES de usar user)
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

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

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username} Lv.${rpgUser.rpg.level} ${rpgUser.rpg.medals}`
            })
            .addFields([{
                name: '**TU ACHOU MESMO QUE TERIA ISSO LIVREMENTE ASSIM?!**',
                value: 'KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK'
            }])
            .setImage('https://wallpapers.com/images/high/troll-face-typing-gif-fb3m9a4czeu0d36a.webp')
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

        await ctx.reply({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};