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
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1492176849478881481/6D1510C7-334E-4562-BA2F-7AC458BE2AF2.gif?ex=69dbb2fc&is=69da617c&hm=de7e998bd6a0ae9d05ec1cba4480b5f9faf69a1b3d5da212775d70d863302e3e&')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create the row
        let row = null;

        // create some buttons inside a row
        row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:menu:profile:${user.id}`)
                .setLabel('👤')
                .setStyle('PRIMARY')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`page:menu:message:${user.id}`)
                .setLabel('📄')
                .setStyle('PRIMARY')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`page:menu:ranking:${user.id}`)
                .setLabel('🏆')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:menu:info:${user.id}`)
                .setLabel('⚙️')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`page:menu:support:${user.id}`)
                .setLabel('❓')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};