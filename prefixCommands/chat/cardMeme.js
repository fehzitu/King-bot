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

        // get the message content splitted and in lower case
        const content = message.content.toLowerCase().split(' ');

        // get the first mentioned user id in string (without <@ >)
        const firstMentionedUser = message.mentions.users.first();

        // reading the file in real time
        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);

        // get all the users from json
        const users = data.users;

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .addFields(data.error)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // check if the user mentioned are on the list
        let isOnList = false;
        users.map((user) => {
            if (`<@${user}>` == content[1]) isOnList = true;
        });

        // set the embed to a mentioned user
        if (content.length == 2 && isOnList) {
            embed.setTitle('---');
            embed.setThumbnail(`${firstMentionedUser.displayAvatarURL()}`);
            embed.addFields({
                name: '---',
                value: '---'
            });
            embed.setDescription('---');
        };

        // response
        await message.reply({
            embeds: [embed]
        });
    }
};