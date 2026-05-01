const constants = require('../config/constants');

// log
function log(type, message) {
    const colors = constants.LOG_COLORS || {};
    const emojis = constants.EMOJIS || {};

    const key = type.toUpperCase();

    const color = colors[key] || '';
    const reset = colors.RESET || '\x1b[0m';
    const emoji = emojis[key] || '⚪';

    console.log(`${color}[${emoji}] ${message}${reset}`);
};

module.exports = log;