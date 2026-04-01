// discord implements
const Discord = require('discord.js');

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'abraco',
    async execute(message) {
        // define endpoint
        let endpoint = 'hug';

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

        // fallback image
        const fallbackImage = 'https://cdn.discordapp.com/attachments/1477290272638632068/1488963005625663630/broken-image.png?ex=69ceb05c&is=69cd5edc&hm=42b8b9f7d66fc4746487d72ef0ea845bf5e9e2f662937d336752a7635855f09d';

        // function to get the api img
        const getImg = async (endpoint) => {
            try {
                // timer controller
                const controller = new AbortController();
                // 3 seconds timeout
                const timeout = setTimeout(() => controller.abort(), 3000);

                // get all the api data
                const endpImg = await fetch(`https://api.waifu.pics/sfw/${endpoint}`, {
                    signal: controller.signal
                });
                const data = await endpImg.json();

                // stop the timer
                clearTimeout(timeout);

                // return the image link
                return data.url;
            } catch (error) {
                // fallback error img
                return fallbackImage;
            };
        };

        // create an successEmbed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: `@${user.username}`
            })
            .setDescription(`😡 **<@${message.author.id}> abraçou <@${user.id}>**❗`)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // check if user mentioned itself
        if (message.author.id == user.id) {
            embed.setDescription(`🤔 **<@${user.id}> ta carente de abraço**❓`);
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