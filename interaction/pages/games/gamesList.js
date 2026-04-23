// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'gamesList',
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
                name: '**⚙️ EM MANUTENÇÃO!**',
                value: '> seu pau na minha mão...'
            }])
            .setImage('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJpN3hqM3kxaG5pZHRvZmNnd2psMjJvdXpoanQwOTJ2bHl2cHNidSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZEkQofMp9jWhvPHj8C/giphy.gif')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`green:${user.id}`)
                .setLabel('🟢')
                .setStyle('SUCCESS')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`red:${user.id}`)
                .setLabel('🔴')
                .setStyle('DANGER')
                .setDisabled(true),

            new Discord.MessageButton()
                .setCustomId(`blue:${user.id}`)
                .setLabel('🔵')
                .setStyle('PRIMARY')
                .setDisabled(true),

            new Discord.MessageButton()
                .setLabel('⚫')
                .setStyle('LINK')
                .setURL('https://discord.gg/Wpgu4qXWUk')
                .setDisabled(true),

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