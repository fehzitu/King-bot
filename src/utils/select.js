// select
const { MessageSelectMenu } = require('discord.js');

module.exports = function createSelect(options = {}) {
    const {
        customId,
        placeholder = 'Selecione uma opção',
        optionsList = [{
                label: '☕️ Café',
                description: 'Bora fazer a vibe com um cafézin?',
                value: 'cafezinho'
            }],
        user
    } = options;

    const select = new MessageSelectMenu()
        .setPlaceholder(placeholder);

    // case 1: customId + user → restricted select
    if (customId && user?.id) {
        select
            .setCustomId(`${customId}:${user.id}`)
            .setDisabled(false);
    }

    // case 2: customId without user → disabled
    else if (customId && !user) {
        select
            .setCustomId(customId)
            .setDisabled(true);
    }

    // case 3: user without customId → defaultSelect
    else if (!customId && user?.id) {
        select
            .setCustomId(`defaultSelect:${user.id}`)
            .setDisabled(false);
    };

    // add options
    if (Array.isArray(optionsList) && optionsList.length > 0) {
        select.addOptions(optionsList);
    };

    return select;
};