const Discord = require('discord.js');

function normalizeEmbeds(embeds = []) {
    return embeds.map(embed => {
        if (!embed) return embed;

        // transform to JSON
        const data = embed instanceof Discord.MessageEmbed
            ? embed.toJSON()
            : embed;

        // valid descriptions
        if (!data.description || data.description.trim() === '') {
            data.description = '\u200b';
        };

        // valids fields
        if (data.fields && data.fields.length === 0) {
            delete data.fields;
        };

        return data;
    });
};

async function safeEdit(ctx, options = {}) {
    let {
        embeds = [],
        components,
        content
    } = options;

    // clean components
    if (components === undefined) components = [];

    const payload = {
        embeds: normalizeEmbeds(embeds),
        components
    };

    // check if we have content to use
    if (typeof content === 'string' && content.trim() !== '') {
        payload.content = content;
    };

    // button
    if (ctx.isButton && ctx.isButton()) {
        if (!ctx.deferred && !ctx.replied) {
            await ctx.deferUpdate();
        };

        return ctx.message.edit(payload);
    };

    // interaction
    if (ctx.reply) {
        if (ctx.replied || ctx.deferred) {
            return ctx.followUp(payload);
        };

        return ctx.reply(payload);
    };

    // fallback
    return ctx.channel.send(payload);
};

module.exports = {
    safeEdit
};