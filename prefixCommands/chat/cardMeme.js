// discord implements
const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'complements/cardMeme.json');

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'cartao',
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

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
            .setTitle(data[0].title)
            .setThumbnail(`${message.client.user.displayAvatarURL()}`)
            .setDescription(data[0].description)
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