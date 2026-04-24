// discord implements
const Discord = require('discord.js');

/*
// node file system
const path = require('path');

// database json file
const filePath = path.join(__dirname, '../../../users.json');

// importing custom functions from other file
const {
    defaultUser
} = require(path.join(__dirname, '../../../functions/levelSystem.js'));
const {
    loadJson,
    saveJson
} = require(path.join(__dirname, '../../../functions/jsonHandler.js'));
*/

module.exports = {
    name: 'face',
    execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // Returns either 0 or 1 (0 = win, 1 = lose)
        const randomValue = Math.floor(Math.random() * 2);

        // embed itens
        const titles = ['> 🟢 **Caiu __coroa__ você ganhou R$100**', '> 🔴 **Caiu __cara__ você perdeu R$100**'];
        const imgs = ['https://cdn.discordapp.com/attachments/1477290272638632068/1497067466361143326/2026-04-24-ganhou.gif?ex=69ec2c3a&is=69eadaba&hm=c5e0bcd210aaec5e246f9ee0ee0cad59a9841791ffab4d7f8054230a71219e8d&', 'https://cdn.discordapp.com/attachments/1477290272638632068/1497067466654879834/2026-04-24-perdeu.gif?ex=69ec2c3a&is=69eadaba&hm=078a35700ee10c5a714a8d58ab51991710cf3773de73bce50f9bac2b2c9dc305&'];
        const color = ['GREEN', 'RED'];

        // load users database once
        const users = ctx.client.usersData;

        // get user profile
        const profile = users[user.id];

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor(`${color[randomValue]}`)
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields([{
                name: '**💸 Resultado**',
                value: `${titles[randomValue]}`
            }])
            .setImage(`${imgs[randomValue]}`)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:games:coinflip:${user.id}`)
                .setLabel('↩️')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};