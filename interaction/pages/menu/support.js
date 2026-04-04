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
            .setTitle('🤖 **{ Ainda estou em desenvolvimento então pode ser que algo de errado ou inesperado aconteça. Se for o caso informe aos desenvolvedores bellzitu / dr3ssa }**')
            .addFields([{
                    name: '☕ Ajude a nossa equipe!',
                    value: '😉 Qualquer ajuda será bem vinda!'
                }])
                .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1489902724681171154/headphones.png?ex=69d21b8a&is=69d0ca0a&hm=f2342087b7dad33e7357cd813d676f20957cd1cf69df4669eaaa76defa631fd0&')
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