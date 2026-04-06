const path = require('path');

// get the home page
const home = require(path.join(__dirname, '../../../interaction/pages/menu/home.js'));

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'menu',
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // cooldown system (scalable)
        if (!message.client.cooldowns) message.client.cooldowns = new Map();

        const cooldown = message.client.cooldowns.get('menu') || new Set();

        if (cooldown.has(message.author.id)) return;

        cooldown.add(message.author.id);
        message.client.cooldowns.set('menu', cooldown);

        setTimeout(() => cooldown.delete(message.author.id), 3000);

        // page
        const page = home.execute(message.author);
        if (!page) return;

        const { embed, components } = page;

        // response
        await message.reply({
            embeds: [embed],
            components
        });
    }
};