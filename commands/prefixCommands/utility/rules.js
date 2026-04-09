// discord implements
const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'complements/rules.json');

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'regras',
    async execute(message) {
        // get the user
        const user = message.author;

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
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // response
        await message.reply({
            embeds: [embed]
        });
    }
};