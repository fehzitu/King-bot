// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'coinflip',
    execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // get the client
        const client = ctx.client;

        // load all the users
        const usersObject = client.usersData;

        // get the user
        const rpgUser = usersObject[user.id] || defaultUser;

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
                name: '**💸 Deseja apostar na moeda?**',
                value: '>>> 👨 **Lucro de: 2x do valor ``taxa de sucesso 50%``**\n👑 **Perca total do valor ``taxa de sucesso 50%``**'
            }])
            .setImage('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHgzem04dHE5aTFhbnp4eGhhc3Y2bnoxaW0xcW55b3dnYW9pcWRkbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SABvdsgeZrcu4SbdA6/giphy.gif')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row1 = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:games:coinflipResult:${user.id}:50`)
                .setLabel('R$50')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:games:coinflipResult:${user.id}:100`)
                .setLabel('R$100')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:games:coinflipResult:${user.id}:500`)
                .setLabel('R$500')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:games:coinflipResult:${user.id}:1000`)
                .setLabel('R$1000')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:games:coinflipResult:${user.id}:5000`)
                .setLabel('R$5000')
                .setStyle('PRIMARY')
        );

        // create some buttons inside a row
        const row2 = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:games:gamesList:${user.id}`)
                .setLabel('↩️')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:menu:home:${user.id}`)
                .setLabel('🏠')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: [row1, row2]
        };
    }
};