// discord implements
const Discord = require('discord.js');

// node file system
const path = require('path');

// importing custom functions from other file
const {
    defaultUser
} = require(path.join(__dirname, '../../../functions/levelSystem.js'));

module.exports = {
    name: 'face',
    async execute(ctx) {
        // responds silently to the interaction.
        if (!ctx.deferred && !ctx.replied) {
            await ctx.deferUpdate();
        };

        //get the user
        const user = ctx.user || ctx.author;

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // get all the users
        const users = ctx.client.usersData;

        if (!users[user.id]) {
            users[user.id] = defaultUser;
        };

        // get the user from all the others
        const profile = users[user.id];

        // insuficient money
        if (profile.rpg.money < 50) {
            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor({
                    iconURL: user.displayAvatarURL(),
                    name: `@${user.username}`
                })
                .setDescription('❌ Saldo insuficiente!')
                .setTimestamp()
                .setFooter({ text: 'Atualizado' });

            return ctx.reply({ embeds: [embed] });
        };

        // game logic
        const randomValue = Math.floor(Math.random() * 2);

        // embed itens
        const titles = [
            '> 👨 **Caiu __cara__ você ganhou R$100**\n> 🟢 ``Você apostou R$50 (-R$50)!``\n> 👍 ``Lucro: R$100``',
            '> 👑 **Caiu __coroa__ você perdeu R$50**\n> 🔴 ``Você apostou R$50 (-R$50)!``\n> 👎 ``Lucro: R$0``'
        ];

        const imgs = ['https://cdn.discordapp.com/attachments/1477290272638632068/1497067466361143326/2026-04-24-ganhou.gif?ex=69ec2c3a&is=69eadaba&hm=c5e0bcd210aaec5e246f9ee0ee0cad59a9841791ffab4d7f8054230a71219e8d&', 'https://cdn.discordapp.com/attachments/1477290272638632068/1497067466654879834/2026-04-24-perdeu.gif?ex=69ec2c3a&is=69eadaba&hm=078a35700ee10c5a714a8d58ab51991710cf3773de73bce50f9bac2b2c9dc305&'];

        const color = ['GREEN', 'RED'];
        const btnColor = ['SUCCESS', 'DANGER'];
        const btnSymbol = ['✔️', '❌'];

        // pay
        profile.rpg.money -= 50;

        // catch if win
        if (randomValue === 0) profile.rpg.money += 100;

        // temp embed
        const loadingEmbed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .setDescription('👍 **Jogando a moeda...**')
            //.setImage('')
            .setTimestamp();

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor(color[randomValue])
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields([{
                name: '**💸 Resultado**',
                value: titles[randomValue]
            }])
            .setImage(imgs[randomValue])
            .setTimestamp()
            .setFooter({ text: 'Atualizado' });

        const row = new Discord.MessageActionRow().addComponents(
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

        // edit the first message from button
        await ctx.message.edit({
            embeds: [loadingEmbed],
            components: []
        });

        // fake delay
        await new Promise(res => setTimeout(res, 1500));

        // edit the final message
        await ctx.message.edit({
            embeds: [embed],
            components: [row]
        });
    }
};