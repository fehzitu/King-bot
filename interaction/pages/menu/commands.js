// discord implements
const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');

// rules file
const filePath = path.join(__dirname, 'complements/commands.json');

module.exports = {
    name: 'commands',
    execute(ctx) {
        // get the user and client
        const user = ctx.user || ctx.author;

        // error log
        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // reading the file in real time
        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .addFields(data)
            .setImage('https://cdn.discordapp.com/attachments/1477290272638632068/1496841750462074880/1_Awi84KRY_5cFk9P0cIhtrw.gif?ex=69eb5a03&is=69ea0883&hm=a9504132fccc4380b23edea6bda87c84e09445b4ae7da996ddbfb743c55b31f9')
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