const Discord = require('discord.js');

function hasVisibleContent(data) {
    return Boolean(
        data.title ||
        data.description ||
        (data.fields && data.fields.length > 0) ||
        data.image ||
        data.thumbnail ||
        data.author ||
        data.footer
    );
};

function normalizeEmbeds(embeds = []) {
    return embeds.map(embed => {
        if (!embed) return embed;

        const data = embed instanceof Discord.MessageEmbed
            ? embed.toJSON()
            : embed;

        // remove empty description
        if (!data.description || data.description.trim() === '') {
            delete data.description;
        };

        // remove empty fields
        if (data.fields && data.fields.length === 0) {
            delete data.fields;
        };

        // if there is NO visible content → force description
        if (!hasVisibleContent(data)) {
            data.description = '\u200b';
        };

        // special case: fields without description (common Discord issue)
        if (data.fields && !data.description) {
            data.description = '\u200b';
        };

        return data;
    });
};