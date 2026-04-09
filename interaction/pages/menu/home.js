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
                name: `**Menu interativo📜**`,
                value: '```👤: Perfil\n🏆: Ranking\n📄: Comandos\n⚙️: Suporte\n❓: Informações```'
            }])
            .setTimestamp()
            .setFooter({ text: 'Atualizado' });

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
                .setCustomId(`menu:page:ranking:${user.id}`)
                .setLabel('🏆')
                .setStyle('PRIMARY')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`menu:page:commands:${user.id}`)
                .setLabel('📄')
                .setStyle('PRIMARY')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`menu:page:support:${user.id}`)
                .setLabel('⚙️')
                .setStyle('PRIMARY'),

            new Discord.MessageButton()
                .setCustomId(`menu:page:info:${user.id}`)
                .setLabel('❓')
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};