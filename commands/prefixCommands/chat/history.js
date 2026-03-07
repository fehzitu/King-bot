// discord implements
const Discord = require('discord.js');

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'historia',
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // histories to use
        const histories = [
            `**${message.author.username} nasceu em uma noite chuvosa no estacionamento de um shopping abandonado. Desde pequeno demonstrava um talento incomum: sabia desbloquear celular só olhando pra tela. Aos 12 anos foi confundido com um NPC de tão estranho que andava. Hoje vive entre nós fingindo ser normal, mas ainda conversa com o microondas às 3 da manhã.**`,
            `**Dizem que ${message.author.username} não tem passado... porque ele simplesmente spawnou em 2017. A primeira coisa que falou foi "cadê o wi-fi?". Desde então acumula histórias suspeitas, como aquela vez que tentou vender curso de como respirar corretamente.**`,
            `**Antes de virar lenda urbana, ${message.author.username} era apenas uma criança comum. Tudo mudou quando comeu um pudim radioativo e ganhou o poder de falar besteira 200% mais rápido que qualquer ser humano. A ciência ainda estuda esse fenômeno.**`,
            `**${message.author.username} já foi confundido com celebridade internacional em um evento… mas era um evento de cosplay e ele estava vestido de erro 404. Até hoje ninguém sabe se foi fantasia ou apenas a aura natural dele.**`,
            `**Quando pequeno, ${message.author.username} tentou cavar um buraco até o Japão porque achava que era assim que funcionava intercâmbio. Parou quando encontrou um cano de água e declarou guerra contra a SABESP.**`,
            `**Reza a lenda que ${message.author.username} tem um primo em cada estado do Brasil. Ninguém nunca viu esses primos, mas eles sempre aparecem quando precisa de desculpa pra faltar compromisso.**`,
            `**${message.author.username} já tentou hackear a própria geladeira porque ela não liberava o refrigerante. Após três horas digitando no painel, descobriu que era só puxar a porta.**`,
            `**Existe um universo paralelo onde ${message.author.username} é extremamente normal. Felizmente, não é este.**`,
            `**${message.author.username} foi expulso de um grupo de estudo por explicar matemática usando teoria da conspiração. Até hoje defende que 2+2=5 depende do mindset.**`,
            `**Quando ${message.author.username} entra em uma call, o Discord automaticamente ativa o modo “sobrevivência”. Coincidência? A gente acha que não.**`,
            `**${message.author.username} já tentou ser vilão, mas esqueceu o plano do mal no bloco de notas e acabou virando anti-herói por acidente.**`,
            `**Há rumores de que ${message.author.username} não anda… ele dá pequenos teletransportes sociais quando a vergonha alheia fica forte demais.**`,
            `**${message.author.username} nasceu com um talento especial: sempre escolher a fila mais lenta do mercado. Cientistas chamam isso de “Síndrome do Protagonista Sofredor”.**`,
            `**Uma vez ${message.author.username} tentou impressionar alguém falando em latim. O problema é que ele estava lendo ingredientes do shampoo.**`,
            `**Se você olhar no espelho às 3:33 da manhã e disser o nome de ${message.author.username} três vezes, ele aparece perguntando se tem comida.**`
        ];

        // get an random number between 0 & the number of itens on histories
        let random = await Math.floor(Math.random() * histories.length);

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setThumbnail(`${message.client.user.displayAvatarURL()}`)
            .addFields({
                name: '💭 História!',
                value: `${histories[random]}\n> ❤️ Gostou?`
            })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // response
        await message.reply({
            embeds: [embed]
        });
    }
};