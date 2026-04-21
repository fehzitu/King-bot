// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'support',
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
                name: '**🤖 Ainda estou em desenvolvimento então pode ser que algo de errado ou inesperado aconteça. Se for o caso informe aos desenvolvedores bellzitu / karyarky**',
                value: '**☕ Bora tomar um café?**'
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491798480216264824/93f04b4b1103cc4e6410bb4f831acb6c.gif?ex=69d90119&is=69d7af99&hm=ca14d33797d593d0914af41ff129a00fc1f87c8ab1ce3a564058456fc749bb34&')
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