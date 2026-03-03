// discord implements
const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'complements/yourself.json');

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

        // get a random number
        let random = await Math.floor(Math.random() * data.field.length);

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setTitle(`**🤡 { __${message.author.username}__ }**`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // check if the message has the member id mentions "<@830634043560296468>"
        const regex = new RegExp(`^<@${message.author.id}>$`);
        if (regex.test(content) && message.author.id != 830634043560296468) {
            embed.addFields([data.field[random]]);

            const response = await message.channel.send({
                embeds: [embed]
            });
        };
    }
};