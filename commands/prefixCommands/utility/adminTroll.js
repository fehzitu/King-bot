// discord implements
const Discord = require('discord.js');

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'admin',
    async execute(ctx) {
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
                name: '**TU ACHOU MESMO QUE TERIA ISSO LIVREMENTE ASSIM?!**',
                value: 'KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK'
            }])
            .setImage('https://wallpapers.com/images/high/troll-face-typing-gif-fb3m9a4czeu0d36a.webp')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create some buttons inside a row
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:menu:home:${user.id}`)
                .setLabel('🏠')
                .setStyle('PRIMARY')
        );

        // set the main message to be send
        await ctx.reply({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};