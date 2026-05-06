// button
const { MessageButton } = require('discord.js');

module.exports = function createButton(options = {}) {
    const {
        customId,
        label = 'ℹ️ Botão de exemplo',
        style = 'PRIMARY',
        user
    } = options;

    const button = new MessageButton()
        .setLabel(label)
        .setStyle(style);

    // case 1: has customId + user → normal restricted button
    if (customId && user?.id) {
        button
            .setCustomId(`${customId}:${user.id}`)
            .setDisabled(false);
    }

    // case 2: no user but has customId → disabled
    else if (!user) {
        button
            .setCustomId(customId || 'disabledButton')
            .setDisabled(true);
    }

    // case 3: no customId but has user → example button
    else {
        button
            .setCustomId(`defaultButton:${user.id}`)
            .setDisabled(false);
    };

    return button;
};