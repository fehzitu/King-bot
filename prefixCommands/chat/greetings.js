// discord implements
const Discord = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        // content
        const content = message.content.toLowerCase();

        // itens
        let day = 'bom dia';
        let midDay = 'boa tarde';
        let night = 'boa noite';

        // responses
        let greeting = [[
            "Que manhã deliciosa para começar algo novo!",
            "O sol brilha e a vida sorri. Bom dia!",
            "Um café e esse céu azul: combinação perfeita.",
            "Hoje é um ótimo dia para espalhar sorrisos!",
            "Que dia lindo para caminhar sem pressa.",
            "A luz de hoje tem gosto de esperança.",
            "Nada como um céu claro para clarear a alma.",
            "Dia perfeito para abrir as janelas e agradecer.",
            "Que beleza de manhã para recomeçar!",
            "Hoje o dia acordou com cheiro de poesia.",
            "Bom dia! Que tal um pouco de natureza?",
            "Dia ensolarado, coração iluminado.",
            "Mais um dia lindo para ser feliz!",
            "Que manhã perfeita para um bom livro no parque.",
            "Hoje é daqueles dias que já começam sorrindo.",
            "O céu azul convida para sonhar alto.",
            "Sol, brisa e paz — bom dia completo.",
            "Um novo dia, cheio de promessas de sol.",
            "Que tal aproveitar esse dia incrível ao ar livre?",
            "Acordar com o canto dos pássaros é um presente.",
            "O dia mal começou e já está maravilhoso.",
            "Bom dia com gosto de férias!",
            "Que alegria começar o dia assim: com luz e calma.",
            "Hoje é dia de deixar a alma tomar sol.",
            "Sinta a energia boa dessa manhã incrível!"
        ],
        [
            "Boa tarde! Que tal uma pausa com um café e o sol batendo na janela?",
            "A tarde chegou com calma e céu dourado.",
            "Hora perfeita para respirar fundo e continuar leve.",
            "Que tarde bonita para reorganizar os pensamentos.",
            "Sol suave, vento calmo... a tarde está sorrindo pra você.",
            "A energia da tarde pede tranquilidade e foco.",
            "Boa tarde! Que o resto do seu dia seja tão bom quanto esse céu.",
            "O dia segue com serenidade e uma luz que abraça.",
            "A tarde é o momento certo para recomeçar com gentileza.",
            "Luz de fim de tarde acende a alma.",
            "Que tarde gostosa para agradecer pelas pequenas coisas.",
            "Entre um gole de chá e um pensamento bom: boa tarde!",
            "O dia ainda guarda surpresas boas. Boa tarde!",
            "Que essa tarde traga leveza e inspiração.",
            "O sol das 15h tem gosto de calmaria.",
            "Boa tarde com brisa e boas ideias.",
            "Tarde boa é aquela que te abraça em silêncio.",
            "Que tal um descanso breve para renovar a mente?",
            "Sinta a suavidade dessa tarde como um carinho.",
            "Hora de desacelerar e cuidar de si.",
            "O sol se inclina, e o dia ganha cor de aconchego.",
            "Boa tarde! Que o tempo corra na medida certa.",
            "Essa luz da tarde é um convite à contemplação.",
            "Metade do dia já passou — que a outra metade seja doce.",
            "Boa tarde! Que cada instante tenha um pouco de paz."
        ],
        [
            "Boa noite! Que o silêncio traga descanso e sonhos bons.",
            "A noite chegou como um cobertor de estrelas.",
            "Hora de deixar o mundo lá fora e mergulhar na calma.",
            "Que a paz da noite embale o seu descanso.",
            "Luz baixa, coração tranquilo. Boa noite!",
            "Boa noite! Que os pensamentos desacelerem e o corpo repouse.",
            "O céu escuro também é beleza — olhe para cima.",
            "Desejo uma noite suave como um abraço silencioso.",
            "Feche os olhos com gratidão. O amanhã vai brilhar.",
            "Deixe o dia dormir e a alma respirar.",
            "A noite é feita para sonhar com o que há de bom.",
            "Silêncio é poesia noturna. Boa noite!",
            "Que seus sonhos sejam tão bonitos quanto a lua lá fora.",
            "Boa noite! Que cada estrela te leve um desejo de paz.",
            "Tempo de repouso, tempo de renascer em descanso.",
            "Apague a luz do dia, acenda a luz da esperança.",
            "A noite sussurra: tudo vai ficar bem.",
            "Deixe as preocupações com as estrelas. Elas sabem cuidar.",
            "Durma leve, sonhe bonito. Boa noite!",
            "A alma também precisa descansar. Boa noite!",
            "Mais um dia vencido com coragem. Agora, descanso.",
            "O universo acalma — confie e durma.",
            "Boa noite! Que o silêncio cure o que o dia cansou.",
            "Que o escuro da noite ilumine o seu interior.",
            "Durma com leveza, acorde com alegria."
        ]];

        // get an random number between 0 & the number of itens on greetings
        let random = await Math.floor(Math.random() * greeting.length);

        // set an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // checking
        if (content == day) {
            embed.addFields(
                {
                    name: '☀️ Bom dia!',
                    value: `${greeting[0][random]}`
                });

            await message.reply({
                embeds: [embed]
            });
        } else if (content == midDay) {
            embed.addFields(
                {
                    name: '⭐️ Boa tarde!',
                    value: `${greeting[1][random]}`
                });

            await message.reply({
                embeds: [embed]
            });
        } else if (content == night) {
            embed.addFields(
                {
                    name: '🌙 Boa noite!',
                    value: `${greeting[2][random]}`
                });

            // set the response
            await message.reply({
                embeds: [embed]
            });
        };
    }
};