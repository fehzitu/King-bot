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
        
        // get only 5 users
        const topUsers = sortedUsers.slice(0, 5);
        
        // string list
        const list = topUsers.map(user => `**<@${user[0]}>** | R$**${user[1].rpg.money}**`).join('\n') || 'Nenhum usuário encontrado.';

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields([{
                name: '**💰: Top dinheiro**',
                value: list
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1496007007562633331/mine-count.gif?ex=69e85099&is=69e6ff19&hm=aea942a8f1a39005d9ef604f42a5150503634b3caf2a2d0072494b6d7b2fe4ec&')
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