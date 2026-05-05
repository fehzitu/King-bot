// button
const { MessageButton } = require('discord.js');

module.exports = function createButton(options = {}) {
    const {
        customId = 'defaultButton',
        label = '\u200b',
        style = 'PRIMARY',
        user
    } = options;

    const button = new MessageButton()
        .setLabel(label)
        .setStyle(style);

    // if user exists → enable and restrict
    if (user?.id) {
        button
            .setCustomId(`${customId}:${user.id}`)
            .setDisabled(false);
    } else {
        // no user → disabled
        button
            .setCustomId(customId)
            .setDisabled(true);
    };

    return button;
};