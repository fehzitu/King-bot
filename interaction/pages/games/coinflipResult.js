// discord implements
const Discord = require('discord.js');

// node file system
const path = require('path');

// importing custom functions from other file
const {
    createDefaultUser
} = require(path.join(__dirname, '../../../functions/levelSystem.js'));

module.exports = {
    name: 'coinflipResult',
    execute(ctx) {
        // get the user
        const user = ctx.user || ctx.author;

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // get the client
        const client = ctx.client;
        
        // load users database once
        const users = client.usersData;

        // ensure user exists
        if (!users[user.id]) {
            users[user.id] = createDefaultUser();
        } else {
            users[user.id] = {
                ...createDefaultUser(),
                ...users[user.id]
            };
        };

        // get the user
        const rpgUser = users[user.id];

        // get the button custom id values
        const [system, category, pageName, userId, value] = ctx.customId.split(':');

        // convert value (string -> number)
        const betValue = Number(value);

        // embed itens
        const titles = [
            `>>> 👨 **Caiu __cara__ você ganhou R$${betValue * 2}**\n🟢 Você apostou R$${betValue} (-R$${betValue})!\n👍 Lucro: R$${betValue}`,
            `>>> 👑 **Caiu __coroa__ você perdeu R$${betValue}**\n🔴 Você apostou R$${betValue} (-R$${betValue})!\n👎 Lucro: R$0`
        ];

        const imgs = [
            'https://cdn.discordapp.com/attachments/1477290272638632068/1497067466361143326/2026-04-24-ganhou.gif',
            'https://cdn.discordapp.com/attachments/1477290272638632068/1497067466654879834/2026-04-24-perdeu.gif'
        ];

        const color = ['GREEN', 'RED'];

        // button itens
        const btnColor = ['SUCCESS', 'DANGER'];
        const btnSymbol = ['✔️', '❌'];

        // Returns either 0 or 1 (0 = win, 1 = lose)
        const randomValue = Math.floor(Math.random() * 2);

        // check user money
        if (rpgUser.rpg.money < betValue) {
            let embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor({
                    iconURL: user.displayAvatarURL(),
                    name: `@${user.username} Lv.${rpgUser.rpg.level} ${rpgUser.rpg.medals}`
                })
                .setTitle('> ❌ **Saldo insuficiente!**')
                .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1497721785477759206/wallet-penacony.gif')
                .setTimestamp()
                .setFooter({
                    text: 'Atualizado'
                });

            let row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton()
                    .setCustomId(`page:games:coinflip:${user.id}`)
                    .setLabel('↩️')
                    .setStyle('PRIMARY')
            );

            return {
                embed,
                components: [row]
            };
        };

        // remove aposta
        rpgUser.rpg.money -= betValue;

        // win
        if (randomValue === 0) {
            rpgUser.rpg.money += betValue * 2;
        };

        // create an embed
        let embed = new Discord.MessageEmbed()
            .setColor(color[randomValue])
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username} Lv.${rpgUser.rpg.level} ${rpgUser.rpg.medals}`
            })
            .addFields([{
                name: '**💸 Resultado**',
                value: `${titles[randomValue]}`
            }])
            .setImage(imgs[randomValue])
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        let row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`${user.id}`)
                .setLabel(btnSymbol[randomValue])
                .setStyle(btnColor[randomValue])
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`page:games:coinflip:${user.id}`)
                .setLabel('↩️')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: [row]
        };
    }
};