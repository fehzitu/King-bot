const Discord = require('discord.js');

module.exports = {
    name: 'ranking',
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
                name: '🏆 **Ranking**',
                value: '🥇 **#1 bellzitu**\n📈 **Lv10** | 💵 **R$100**'
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1492308028995928134/7C65091E-1577-4AE5-ABFB-31A55260A19D.gif?ex=69dadba7&is=69d98a27&hm=42efbc93ef98401702c281afd82e5ee7501499ee7ec6a435c7fc7428981a2ae0&')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create the row
        let row = null;

        // create some buttons inside a row
        row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`menu:page:home:${user.id}`)
                .setLabel('🏠')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};