const Discord = require('discord.js');

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

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields([{
                name: '**💰: Top dinheiro**',
                value: '**__LIST[0]__**'
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