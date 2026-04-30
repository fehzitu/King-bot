// discord implements
const Discord = require('discord.js');

// node file system
const path = require('path');

// importing custom functions from other file
const {
    defaultUser
} = require(path.join(__dirname, '../../../functions/levelSystem.js'));

module.exports = {
    name: 'roulleteResult',
    execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // get the client
        const client = ctx.client;
        
        // load users database once
        const users = ctx.client.usersData;

        // get the user
        const rpgUser = users[user.id] || defaultUser;

        // fix user
        if (!users[user.id]) {
            // create new profile
            users[user.id] = defaultUser;
        };

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // get the button custom id valules
        const [system, category, pageName, userId, value, entryColor] = ctx.customId.split(':');

        // embed itens
        const titles = ['>>> 🤑 Parabéns sua aposta rendeu!\nTivemos um sortudo aqui!', '>>> 😥 Que triste em...\nTivemos um pouco de azar nessa em!'];
        const imgs = ['https://cdn.discordapp.com/attachments/1477290272638632068/1497067466361143326/2026-04-24-ganhou.gif?ex=69ec2c3a&is=69eadaba&hm=c5e0bcd210aaec5e246f9ee0ee0cad59a9841791ffab4d7f8054230a71219e8d&', 'https://cdn.discordapp.com/attachments/1477290272638632068/1497067466654879834/2026-04-24-perdeu.gif?ex=69ec2c3a&is=69eadaba&hm=078a35700ee10c5a714a8d58ab51991710cf3773de73bce50f9bac2b2c9dc305&'];
        const color = ['GREEN', 'RED'];

        // button itens
        const btnColor = ['SUCCESS', 'DANGER'];
        const btnSymbol = ['✔️', '❌'];
        
        // Returns either 0 or 1 (0 = win, 1 = lose)
        const randomValue = Math.floor(Math.random() * 2);
        
        // create an embed
        let embed = new Discord.MessageEmbed()
            .setColor(`${color[randomValue]}`)
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username} Lv.${rpgUser.rpg.level} ${rpgUser.rpg.medals}`
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
        let row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`${user.id}`)
                .setLabel(`${btnSymbol[randomValue]}`)
                .setStyle(`${btnColor[randomValue]}`)
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`page:games:roullete:${user.id}`)
                .setLabel('↩️')
                .setStyle('PRIMARY')
        );

        // check user money
        if (rpgUser.rpg.money < value) {
            embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor({
                    iconURL: user.displayAvatarURL(),
                    name: `@${user.username} Lv.${rpgUser.rpg.level} ${rpgUser.rpg.medals}`
                })
                .setTitle('> ❌ **Saldo insuficiente!**')
                .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1497721785477759206/wallet-penacony.gif?ex=69ee8d9b&is=69ed3c1b&hm=d921d7b4b91f99be8cf03616695cbf495307ed674a5e6946e6e5fccaa4ea9a48')
                .setTimestamp()
                .setFooter({
                    text: 'Atualizado'
                });

            row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton()
                    .setCustomId(`page:games:roullete:${user.id}`)
                    .setLabel('↩️')
                    .setStyle('PRIMARY')
            );

            return {
                embed,
                components: [row]
            };
        };
        
        // get a random number (1 ~ 15) if they win
        const randomValue15 = Math.floor(Math.random() * 7) + 1;

        // user pay
        if (rpgUser.rpg.money >= value) rpgUser.rpg.money -= value;

        // pay to user
        if (randomValue == 0 && entryColor == 'green' && randomValue15 == 7) rpgUser.rpg.money += (value * 15);
        if (randomValue == 0 && !entryColor == 'green') rpgUser.rpg.money += (value * 2);

        return {
            embed,
            components: row ? [row] : []
        };
    }
};