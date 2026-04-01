// discord implements
const Discord = require('discord.js');

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'cartao',
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // check if an bot has send the message
        if (message.author.bot) return;

        // api anti-spam with 3 seconds
        if (!message.client.cooldowns) {
            message.client.cooldowns = new Set();
        };

        if (message.client.cooldowns.has(message.author.id)) return;

        message.client.cooldowns.add(message.author.id);

        setTimeout(() => {
            message.client.cooldowns.delete(message.author.id);
        }, 3000);

        // set the user to a mentioned (if we have)
        const user = message.mentions.users.first() || message.author;

        // cards to use
        const cards = [
            {
                "name": "**Me consagro o maior e melhor mamador de homens maduros! Entrei pro livro dos recordes com o título de __REI DOS GAYS__ por dominar a arte de sentar fofo!**",
                "value": "**Obs:\n> __Eu curto um dildo de 35cm!__ 🥵**"
            },
            {
                "name": "**Estou te esperando aqui em casa meu amor! Estou a __5km de distância__, vai ser rapidinho chegar aqui!**",
                "value": "**Obs:\n> __Espero que goze comigo!__ 🥴**"
            },
            {
                "name": "**Adoro conhecer pik%!$@, digo, pessoas novas e estou disposta a tudo pra ser feliz! __Tudo mesmo__!**",
                "value": "**Obs:\n> __Dinheiro na mão? Calcinha no chão!__ 🤑**"
            },
            {
                "name": "**Sou um bruto incansável, sento forte e mamo sem parar. Tenho recordes de cama quebradas só na sentada e também sou viciado em fazer compras caras pra pagar com Xerecard!**",
                "value": "**Obs:\n> __Eu não sou a Cinderela mas sei encaixar!__ 😉**"
            }
        ];

        // get a random number
        let random = await Math.floor(Math.random() * cards.length);

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${user.displayAvatarURL()}`,
                name: `@${user.username}`
            })
            .setTitle(`👥 **Usuário mencionado**: ${user.username}`)
            .addFields(cards[random])
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create an waiting embed
        const waitingEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription('⏳ Pensando...')
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // temporary message
        const msg = await message.reply({
            embeds: [waitingEmbed]
        });

        // edit the message after 3 seconds
        setTimeout(() => {
            // final response
            msg.edit({
                embeds: [embed]
            });
        }, 3000);
    }
};