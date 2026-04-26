// discord implements
const Discord = require('discord.js');

// node normal importations
const fs = require('node:fs');
const path = require('node:path');

// database json file
const filePath = path.join(__dirname, '../../../users.json');

// importing custom functions
const {
    loadJson
} = require(path.join(__dirname, '../../../functions/jsonHandler.js'));
const {
    sortUsers
} = require(path.join(__dirname, '../../../functions/sortUsers.js'));

module.exports = {
    name: 'moneyRank',
    execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // get the client
        const client = ctx.client;

        // load all the users
        const usersObject = client.usersData;

        // get the user
        const rpgUser = usersObject[user.id] || defaultUser;

        // sort user list
        const sortedUsers = sortUsers(usersObject, 'rpg.money');

        // get only 5 users
        const topUsers = sortedUsers.slice(0, 5);

        // string list
        const list = topUsers.map(user => `**<@${user[0]}>** | R$**${user[1].rpg.money}**`).join('\n') || 'Nenhum usuário encontrado.';

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
                name: '**💰 Top dinheiro**',
                value: list
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1496295806339383440/Money_Cash_GIF_-_Money_Cash_-_Discover__Share_GIFs.gif?ex=69e95d90&is=69e80c10&hm=84a3b747a6df8f17103153c24412c45e46719532faac0cb1475c64688ce841c8&')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:ranking:moneyRank:${user.id}`)
                .setLabel('🔄')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:ranking:levelRank:${user.id}`)
                .setLabel('📈')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:ranking:messageRank:${user.id}`)
                .setLabel('💬')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:menu:ranking:${user.id}`)
                .setLabel('↩️')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};