// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'home',
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
                name: '**💫: Menu de interação**',
                value: '**👤: Perfil - ``Acessa os dados do perfil``\n📄: Comandos - ``Lista de comandos``\n🏆: Ranking - ``Lista de ranking``\n⚙️: Informações - ``Infos do client``\n❓: Suporte - ``Suporte do client``**'
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1491805989479907408/6D1510C7-334E-4562-BA2F-7AC458BE2AF2.gif?ex=69d90818&is=69d7b698&hm=8e7604a4bd1749852b4db89d18f742d1c7e4e8adc7b52d618922db55378d7240&')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create the row
        let row = null;

        // create some buttons inside a row
        row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`menu:page:profile:${user.id}`)
                .setLabel('👤')
                .setStyle('PRIMARY')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`menu:page:commands:${user.id}`)
                .setLabel('📄')
                .setStyle('PRIMARY')
                .setDisabled(true),
                
            new Discord.MessageButton()
                .setCustomId(`menu:page:ranking:${user.id}`)
                .setLabel('🏆')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`menu:page:info:${user.id}`)
                .setLabel('⚙️')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`menu:page:support:${user.id}`)
                .setLabel('❓')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};