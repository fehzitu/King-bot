const activities = require('../../config/activities');

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

        // status
        const interval = setInterval(updateStatus, 10000);

        client.user.setStatus('online');

        console.log(`👑 ${client.user.tag} logado com sucesso!`);

        // save ref (for hot reload)
        client.statusInterval = interval;
    }
};