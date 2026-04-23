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

module.exports = {
    name: 'profile',
    execute(ctx) {
        // get the user and client
        const user = ctx.user || ctx.author;

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // load all the users
        const usersObject = loadJson(filePath);

        // get the user
        const rpgUser = usersObject[user.id] || {
            profileCreatedAt: new Date().toISOString(),
            rpg: {
                money: 100,
                level: 1,
                xp: 0
            },
            stats: {
                messages: 0,
                commands: 0
            }
        };

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields([{
                name: `**👤 ${user.globalName} (${user.username})**`,
                value: `**⏳ Lv.${rpgUser.rpg.level} 『 ${rpgUser.rpg.xp}xp / ${Math.floor(100 * Math.pow(rpgUser.rpg.level + 1, 1.5))}xp 』\n💰 Saldo: R$${rpgUser.rpg.money}\n📚 Msgs: ${rpgUser.stats.messages} Cmds: ${rpgUser.stats.commands}**`
            }])
            .setImage('https://i.pinimg.com/originals/fb/7d/25/fb7d25365c6f2deca04b86f35c8fee63.gif')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create the row
        let row = null;

        // create some buttons inside a row
        row = new Discord.MessageActionRow().addComponents(
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