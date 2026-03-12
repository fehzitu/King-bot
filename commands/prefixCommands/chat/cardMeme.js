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

        // get a random number
        let random = await Math.floor(Math.random() * data.success.field.length);

        // create an errorEmbed
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .addFields(data.error)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create an successEmbed
        const successEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .addFields(data.success.field[random])
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // set the embed to a mentioned user
        if (content.length == 2 && firstMentionedUser) {
            // set the title of embed with mentioned username
            successEmbed.setTitle(`${data.success.title} __**${firstMentionedUser.username}**__`);

            // set mentioned user photo to embed thumbnail
            successEmbed.setThumbnail(`${firstMentionedUser.displayAvatarURL()}`);

            // response
            return await message.reply({
                embeds: [successEmbed]
            });
        } else {
            // response
            return await message.reply({
                embeds: [errorEmbed]
            });
        };
    }
};