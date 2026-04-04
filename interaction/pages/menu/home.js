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
                value: '**📦: Inventário 📄: Comandos ⚙️: Suporte**'
            }])
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1489750534926897282/list.png')
            .setTimestamp()
            .setFooter({ text: 'Atualizado' });

        // create the row
        let row = null;

        // create some buttons inside a row
        row = new Discord.MessageActionRow().addComponents(
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
                .setStyle('PRIMARY')
        );

        return {
            embed,
            components: row ? [row] : []
        };
    }
};