// node implements
const path = require('path');

const home = require(path.join(__dirname, '../../../interaction/pages/menu/home.js'));

module.exports = {
    name: 'menu',
    async execute(ctx) {
        // get the user and client
        const user = ctx.user || ctx.author;
        const client = ctx.client;

        if (!user) {
            console.log('Erro no usuário:', ctx);
            return;
        };

        // return if bot
        if (user.bot) return;

        // cooldown
        if (!client.cooldowns) client.cooldowns = new Map();

        const cooldown = client.cooldowns.get('menu') || new Set();

        if (cooldown.has(user.id)) return;

        cooldown.add(user.id);
        client.cooldowns.set('menu', cooldown);

        setTimeout(() => cooldown.delete(user.id), 3000);

        // page
        const page = home.execute(ctx);
        if (!page) return;

        const { embed, components } = page;

        // response
        if (ctx.reply) {
            await ctx.reply({
                embeds: [embed],
                components
            });
        } else if (ctx.followUp) {
            await ctx.followUp({
                embeds: [embed],
                components
            });
        };
    }
};