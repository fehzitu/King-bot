// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'coinflip',
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
                name: '**💸 Deseja apostar R$50?**',
                value: '> 👨 **Apostar em cara ``taxa de sucesso 50%``**\n> 👑 **Apostar em coroa ``taxa de sucesso 50%``**'
            }])
            .setImage('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHgzem04dHE5aTFhbnp4eGhhc3Y2bnoxaW0xcW55b3dnYW9pcWRkbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SABvdsgeZrcu4SbdA6/giphy.gif')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:games:face:${user.id}`)
                .setLabel('👨')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:games:crown:${user.id}`)
                .setLabel('👑')
                .setStyle('PRIMARY')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`page:games:gamesList:${user.id}`)
                .setLabel('↩️')
                .setStyle('PRIMARY'),

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