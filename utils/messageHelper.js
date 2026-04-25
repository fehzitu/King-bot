const Discord = require('discord.js');

function normalizeEmbeds(embeds = []) {
    return embeds.map(embed => {
        // if we have an valid embed
        if (embed instanceof Discord.MessageEmbed) {
            const data = embed.toJSON();

            // empty embed
            if (!data.description && !data.fields?.length && !data.title) {
                embed.setDescription('‎'); // invisible char
            };

            return embed;
        };

        return embed;
    });
};

async function safeEdit(ctx, options = {}) {
    const {
        embeds = [],
        components,
        content
    } = options;

    const payload = {
        embeds: normalizeEmbeds(embeds),
        content: content ?? undefined,
        components: components === undefined ? [] : components // safe empty components
    };

    // buttons
    if (ctx.isButton && ctx.isButton()) {
        if (!ctx.deferred && !ctx.replied) {
            await ctx.deferUpdate();
        };

        return ctx.message.edit(payload);
    };

    // slash components
    if (ctx.reply) {
        if (ctx.replied || ctx.deferred) {
            return ctx.followUp(payload);
        };

        return ctx.reply(payload);
    };

    // (prefix) commands
    return ctx.reply(payload);
};

module.exports = {
    safeEdit
};