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
    name: 'levelRank',
    execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // get the client
        const client = ctx.client;

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // load all the users
        const usersObject = client.usersData;

        // sort user list
        const sortedUsers = sortUsers(usersObject, 'rpg.level');

        // get only 5 users
        const topUsers = sortedUsers.slice(0, 5);

        // string list
        const list = topUsers.map(user => `**<@${user[0]}>** | Lv: **${user[1].rpg.level}** Xp: **${user[1].rpg.xp}**`).join('\n') || 'Nenhum usuário encontrado.';

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields([{
                name: '**📈 Top level**',
                value: list
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1496180164088958976/Animated_bar_chart.gif?ex=69e8f1dc&is=69e7a05c&hm=0ef944418ed41d4f37b90c3345a1da453a87ca4e1f7dccf1421cd37270f68493&')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:ranking:moneyRank:${user.id}`)
                .setLabel('💰')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:ranking:levelRank:${user.id}`)
                .setLabel('🔄')
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