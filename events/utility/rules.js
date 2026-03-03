// discord implements
const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'complements/rules.json');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // catch the message content and set to lower case
        const content = message.content.toLowerCase();

        // reading the file in real time
        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setThumbnail(`${message.client.user.displayAvatarURL()}`)
            .addFields(data.field)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // check if the message has "k.regras"
        if (content == 'k.regras') {
            const response = await message.reply({
                embeds: [embed]
            });
        };
    }
};