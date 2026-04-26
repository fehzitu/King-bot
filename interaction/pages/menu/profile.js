// discord implements
const Discord = require('discord.js');

// node normal importations
const path = require('node:path');

// database json file
const filePath = path.join(__dirname, '../../../users.json');

// importing custom functions
const {
    defaultUser
} = require(path.join(__dirname, '../../../functions/levelSystem.js'));
const {
    loadJson
} = require(path.join(__dirname, '../../../functions/jsonHandler.js'));

module.exports = {
    name: 'profile',
    execute(ctx) {
        // get the user and client
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
                name: `**👤Usuário ${user.globalName} __(${user.username})__**`,
                value: `>>> ⏳ **Lv.${rpgUser.rpg.level}『 ${rpgUser.rpg.xp}xp / ${Math.floor(100 * Math.pow(rpgUser.rpg.level + 1, 1.5))}xp 』**\n🧿 **Karma: ${rpgUser.rpg.karma}**\n💰 **Saldo: R$${rpgUser.rpg.money}**\n📚 **Mensagens: ${rpgUser.stats.messages}**\n📡 **Comandos: ${rpgUser.stats.commands}**\n💎 **Medalhas: ${rpgUser.rpg.medals}**`
            }])
            .setImage('https://i.pinimg.com/originals/fb/7d/25/fb7d25365c6f2deca04b86f35c8fee63.gif')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:menu:profile:${user.id}`)
                .setLabel('🔄')
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