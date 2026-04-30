const activities = require('../../config/activities');
const constants = require('../../config/constants');

function log(type, message) {
    const colors = constants.LOG_COLORS || {};
    const emojis = constants.EMOJIS || {};

    const key = type.toUpperCase();

    const color = colors[key] || '';
    const reset = colors.RESET || '\x1b[0m';
    const emoji = emojis[key] || '⚪';

    console.log(`${color}[${emoji}] ${message}${reset}`);
};

module.exports = {
    name: 'ready',
    once: true,

    execute(client) {
        let index = 0;

        const updateStatus = () => {
            client.user.setActivity(activities[index], {
                type: "PLAYING"
            });

            index = (index + 1) % activities.length;
        };

        // initial status
        updateStatus();

        // interval
        const interval = setInterval(updateStatus, 10000);

        client.user.setStatus('online');

        log('success', `${client.user.tag} logado com sucesso!`);

        // save ref (future use)
        client.statusInterval = interval;
    }
};