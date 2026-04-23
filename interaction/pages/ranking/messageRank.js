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
    name: 'messageRank',
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
        const sortedUsers = sortUsers(usersObject, 'stats.messages');
        
        // get only 5 users
        const topUsers = sortedUsers.slice(0, 5);
        
        // string list
        const list = topUsers.map(user => `**<@${user[0]}>** | Msg: **${user[1].stats.messages}** Cmd: **${user[1].stats.commands}**`).join('\n') || 'Nenhum usuário encontrado.';

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields([{
                name: '**💬: Top mensagens**',
                value: list
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1496256443790266398/Animacoes_Legais.gif?ex=69e938e7&is=69e7e767&hm=5587a339c9ec632888b5f0e14541e3bbe245740da38283b6973e26809e13a9d3&')
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
                .setLabel('📈')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:ranking:messageRank:${user.id}`)
                .setLabel('💬')
                .setStyle('PRIMARY')
                .setDisabled(true),
            
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