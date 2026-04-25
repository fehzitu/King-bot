// node implements
const path = require('path');

const home = require(path.join(__dirname, '../../../interaction/pages/menu/home.js'));

module.exports = {
    name: 'menu',
    async execute(ctx) {
        const page = home.execute(ctx);
        if (!page) return;

        const { embed, components } = page;

        if (ctx.isButton && ctx.isButton()) {
            if (!ctx.deferred && !ctx.replied) {
                await ctx.deferUpdate();
            };

            await ctx.message.edit({
                embeds: [embed],
                components
            });

        } else {
            if (ctx.replied || ctx.deferred) {
                await ctx.followUp({
                    embeds: [embed],
                    components
                });
            } else {
                await ctx.reply({
                    embeds: [embed],
                    components
                });
            }
        };
    }
};