// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'home',
    execute(user) {
        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields([{
                name: `**Menu interativo📜**`,
                value: '```👤: Perfil\n┗ Abre seu perfil\n📦: Inventário\n┗ Navega pelo inventário\n📄: Comandos\n┗ Lista de comandos\n⚙️: Suporte\n┗ Tenha suporte\n❓: Informações\n┗ Informações sobre mim```'
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
                .setCustomId(`menu:page:inventory:${user.id}`)
                .setLabel('📦')
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
                .setDisabled(true)
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};