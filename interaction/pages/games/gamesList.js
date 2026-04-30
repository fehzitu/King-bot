// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'gamesList',
    execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // get the client
        const client = ctx.client;

        // load all the users
        const usersObject = client.usersData;

        // ensure user exists
        if (!usersObject[user.id]) {
            usersObject[user.id] = createDefaultUser();
        } else {
            // merge to prevent missing future fields
            usersObject[user.id] = {
                ...createDefaultUser(),
                ...usersObject[user.id]
            };
        };

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username} Lv.${rpgUser.rpg.level} ${rpgUser.rpg.medals}`
            })
            .addFields([{
                name: '**🎮 Lista completa dos jogos!**',
                value: '>>> 💸 **``Apostar no coinflip``**\n🧾 **``Apostar na roleta``**'
            }])
            .setImage('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJpN3hqM3kxaG5pZHRvZmNnd2psMjJvdXpoanQwOTJ2bHl2cHNidSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZEkQofMp9jWhvPHj8C/giphy.gif')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:games:coinflip:${user.id}`)
                .setLabel('💸')
                .setStyle('PRIMARY'),
                
            new Discord.MessageButton()
                .setCustomId(`page:games:roullete:${user.id}`)
                .setLabel('🧾')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:menu:home:${user.id}`)
                .setLabel('↩️')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};