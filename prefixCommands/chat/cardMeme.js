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

        // reading the file in real time
        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);

        // get all the users from json
        const users = data.users;

        // get the user by the id
        const user = async (id) => {
            return await message.client.users.fetch(id);
        };

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setTitle(data.error.title)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .addFields(data.error.field)
            .setDescription(data.error.description)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // check if the user mentioned are on the list
        let isOnList = false;
        users.map((user) => {
            `<@${user}>` == content[1] ? isOnList = true : isOnList = false;
            console.log(`<@${user}>`, content[1], isOnList);
        });

        // response
        await message.reply({
            embeds: [embed]
        });
    }
};