const Discord = require('discord.js');

module.exports = {
    name: Discord.Events.ClientReady,
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

        // switch status every x seconds
        setInterval(() => {
            client.user.setActivity(activities[i], {
                type: Discord.ActivityType.Playing
            });

            i = (i + 1) % activities.length;

        }, 10000);

        // log
        console.log(`👑 ${client.user.tag} logado com sucesso!`);
    }
};