// select
const { MessageSelectMenu } = require('discord.js');

module.exports = function createSelect(options = {}) {
    const {
        customId,
        placeholder = 'ℹ️ Selecione uma opção',
        optionsList = [{
                label: '1️⃣ Exemplo 1',
                description: '⁉️ Aqui realmente é só um exemplo',
                value: '🧾 exemplo 1'
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