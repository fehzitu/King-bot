// discord implements
const Discord = require('discord.js');

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'abraco',
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // get the message content splitted and in lower case
        const content = message.content.toLowerCase().split(' ');

        // get the first mentioned user id in string (without <@ >)
        const firstMentionedUser = message.mentions.users.first();

        // function to get the api img
        const getImg = async (endpoint) => {
            try {
                // timer controller
                const controller = new AbortController();
                // 3 timeout
                const timeout = setTimeout(() => controller.abort(), 3000);

                const res = await fetch(`https://api.waifu.pics/sfw/${endpoint}`, {
                    signal: controller.signal
                });

                clearTimeout(timeout);

                const data = await res.json();

                return data.url;
            } catch (err) {
                console.error('Erro na API:', err);

                // fallback image if api fails
                return 'https://cdn.discordapp.com/attachments/1477290272638632068/1488963005625663630/broken-image.png?ex=69ceb05c&is=69cd5edc&hm=42b8b9f7d66fc4746487d72ef0ea845bf5e9e2f662937d336752a7635855f09d';
            }
        };

        // create an errorEmbed
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .addFields([
                {
                    "name": "🔴 **Uso incorreto do comando**!",
                    "value": "(Faltou alguma marcação ou mais de 1 usuário foi marcado!)"
                },
                {
                    "name": "🟢 **Uso correto**:",
                    "value": "k.abraco @[usuário]"
                }
            ])
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create an successEmbed
        const successEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        let img = message.client.user.displayAvatarURL();

        // set the embed to a mentioned user
        if (content.length == 2 && firstMentionedUser) {
            // check if the user use the command on him self
            if (message.author.id == firstMentionedUser.id) {
                // get the img link
                img = await getImg('cringe');

                // set the title of embed with mentioned username
                successEmbed.setDescription(`🤔 **<@${message.author.id}> ta tão carente assim**❓`);
                successEmbed.setImage(img.url);
            } else {
                // get the img link
                img = await getImg('hug');

                // set the title of embed with mentioned username
                successEmbed.setDescription(`😡 **<@${message.author.id}> abraçou <@${firstMentionedUser.id}>**❗`);
                successEmbed.setImage(img.url);
            };

            // response
            return await message.reply({
                embeds: [successEmbed]
            });
        };

        // response
        return await message.reply({
            embeds: [errorEmbed]
        });
    }
};