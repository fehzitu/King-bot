const activities = require('../../config/activities.js');
const constants = require('../../config/constants.js');
const log = require('../../utils/logger.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        let index = 0;

        const updateStatus = () => {
            client.user.setActivity(activities[index], {
                type: 'PLAYING'
            });

            index = (index + 1) % activities.length;
        };

        // initial status
        updateStatus();

        // interval
        const interval = setInterval(updateStatus, 5000);

        client.user.setStatus('online');

        log('SUCCESS', `${client.user.tag} logado com sucesso!`);

        // save ref (future use)
        client.statusInterval = interval;
    }
};