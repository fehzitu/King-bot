// discord implements
const Discord = require('discord.js');

// import default user factory
const { createDefaultUser } = require('../../../functions/levelSystem.js');

module.exports = {
    name: 'roullete',
    execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // error log
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
        } else {
            // merge to prevent missing future fields
            usersObject[user.id] = {
                ...createDefaultUser(),
                ...usersObject[user.id]
            };
        };

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
                name: '**💸 Deseja apostar na roleta?**',
                value: '>>> 🔵 **Lucro de: 2x do valor**\n⚫️ **Lucro de: 2x do valor**\n🟢 **Lucro de: 15x do valor**\n❌️ **Perca total do valor**'
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1498835458111570000/roulette-game.gif')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // helper to disable button if dont have money
        const canBet = (amount) => rpgUser.rpg.money >= amount;

        // row 1
        const row1 = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:games:roulleteResult:${user.id}:250:blue`)
                .setLabel('R$250')
                .setStyle('PRIMARY')
                .setDisabled(!canBet(250)),
                
            new Discord.MessageButton()
                .setCustomId(`page:games:roulleteResult:${user.id}:250:black`)
                .setLabel('R$250')
                .setStyle('SECONDARY')
                .setDisabled(!canBet(250)),
                
            new Discord.MessageButton()
                .setCustomId(`page:games:roulleteResult:${user.id}:250:green`)
                .setLabel('R$250')
                .setStyle('SUCCESS')
                .setDisabled(!canBet(250))
        );
        
        // row 2
        const row2 = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:games:roulleteResult:${user.id}:500:blue`)
                .setLabel('R$500')
                .setStyle('PRIMARY')
                .setDisabled(!canBet(500)),

            new Discord.MessageButton()
                .setCustomId(`page:games:roulleteResult:${user.id}:500:black`)
                .setLabel('R$500')
                .setStyle('SECONDARY')
                .setDisabled(!canBet(500)),
                
            new Discord.MessageButton()
                .setCustomId(`page:games:roulleteResult:${user.id}:500:green`)
                .setLabel('R$500')
                .setStyle('SUCCESS')
                .setDisabled(!canBet(500))
        );

        // row 3
        const row3 = new Discord.MessageActionRow().addComponents(
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
            components: [row1, row2, row3]
        };
    }
};