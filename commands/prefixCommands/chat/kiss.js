// discord implements
const Discord = require('discord.js');

// node file system
const path = require('path');

// importing custom functions
const {
    fallbackImage,
    getImg
} = require(path.join(__dirname, '../../../functions/waifuApi.js'));

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'beijo',
    async execute(message) {
        // define endpoint
        let endpoint = 'kiss';

        // check if an bot has send the message
        if (message.author.bot) return;

        // api anti-spam with 3 seconds
        if (!message.client.cooldowns) {
            message.client.cooldowns = new Set();
        };

        if (message.client.cooldowns.has(message.author.id)) return;

        message.client.cooldowns.add(message.author.id);

        setTimeout(() => {
            message.client.cooldowns.delete(message.author.id);
        }, 3000);

        // set the user to a mentioned (if we have)
        const user = message.mentions.users.first() || message.author;

        // create an successEmbed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .setDescription(`😡 **<@${message.author.id}> beijou <@${user.id}>**❗`)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // check if user mentioned itself
        if (message.author.id == user.id) {
            embed.setDescription(`🤔 **<@${user.id}> quer tanto assim um beijo**❓`);
            endpoint = 'cringe';
        };

        // create an waiting embed
        const waitingEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription('⏳ Pensando...')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // temporary message
        const msg = await message.reply({
            embeds: [waitingEmbed]
        });

        // get image
        let img = await getImg(endpoint);

        // final safety check (guarantee valid string)
        if (!img || typeof img !== 'string') {
            img = fallbackImage;
        };

        // set image
        embed.setImage(img);

        // edit immediately after ready
        msg.edit({
            embeds: [embed]
        });
    }
};