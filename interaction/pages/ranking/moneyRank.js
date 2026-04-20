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

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };
        
        // load all the users
        const usersObject = loadJson(filePath);
        
        // sort user list
        const sortedUsers = sortUsers(usersObject, 'rpg.money');
        
        // get the first five users (if have)
        let topFive = sortedUsers;
        if (sortedUsers.length >= 5) topFive = sortedUsers.slice(0, 5);

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields([{
                name: '**💰: Top dinheiro**',
                value: `${sortedUsers}`
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1494993506924757002/closeup-hands-holding-cash.jpg?ex=69e4a0b3&is=69e34f33&hm=25bebce8d9efe31f3131e2cb7c9a5a309ad26a3c1b120ccdf1eeb1f7b2e1ad53&')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create the row
        let row = null;

        // create some buttons inside a row
        row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:ranking:moneyRank:${user.id}`)
                .setLabel('💰')
                .setStyle('PRIMARY')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`page:ranking:levelRank:${user.id}`)
                .setLabel('📈')
                .setStyle('PRIMARY')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`page:ranking:messageRank:${user.id}`)
                .setLabel('💬')
                .setStyle('PRIMARY')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`page:menu:home:${user.id}`)
                .setLabel('🏠')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};