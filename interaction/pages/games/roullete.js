// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'roullete',
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
                name: '**💸 Deseja apostar na roleta?**',
                value: '>>> ️🔵 **Lucro de: 1.5x do valor**\n⚫️ **Lucro de: 1.5x do valor**\n🟢 **Lucro de: 15x do valor**\n❌️ **Perca total do valor**'
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1498835458111570000/roulette-game.gif?ex=69f29acc&is=69f1494c&hm=8b8178e7949144954d7c9387f4f704f075bb3f2c964084ad11a7e49a71dcb670&')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row1 = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:games:roulleteResult:${user.id}:moneyCount:color`)
                .setLabel('---')
                .setStyle('PRIMARY')
                .setDisabled(true)
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