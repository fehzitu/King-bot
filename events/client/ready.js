const Discord = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        // count
        let i = 0;

        // all the main status
        const activities = [
            'Olha pra tropa já joga a xereca',
            'Se eu declarar minha grana toda eu mudo o PIB do país',
            'Meus manos são da killa',
            'Eu só falo da lobelia',
            'Meu atirador é um black spy',
            'Puta se eu puxo o gatilho só bye-bye'
        ];

        // set first activity immediately
        client.user.setActivity(activities[i], {
            type: "PLAYING"
        });

        // switch status every x seconds
        setInterval(() => {
            i = (i + 1) % activities.length; // fix move increment before setting

            client.user.setActivity(activities[i], {
                type: "PLAYING"
            });
        }, 10000);

        // set online status explicitly
        client.user.setStatus('online');

        // log
        console.log(`👑 ${client.user.tag} logado com sucesso!`);
    }
};