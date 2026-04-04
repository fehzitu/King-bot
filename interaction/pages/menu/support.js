const Discord = require('discord.js');

module.exports = {
    name: 'support',
    execute(user) {
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .setTitle('🤖 **{ Ainda estou em desenvolvimento então pode ser que algo de errado ou inesperado aconteça. Se for o caso informe aos desenvolvedores bellzitu / dr3ssa }\n\n**')
            .addFields([
                {
                    name: '☕ Ajude a nossa equipe!',
                    value: '😉 Qualquer ajuda será bem vinda!'
                }
            ])
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