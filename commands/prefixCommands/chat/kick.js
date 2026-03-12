// discord implements
const Discord = require('discord.js');

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'chute',
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // get the message content splitted and in lower case
        const content = message.content.toLowerCase().split(' ');

        // get the first mentioned user id in string (without <@ >)
        const firstMentionedUser = message.mentions.users.first();

        // function to get the api img
        const getImg = async (args) => {
            // get the image from an external API
            const fetchApi = await fetch(`https://api.waifu.pics/sfw/${args}`);
            return await fetchApi.json();
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
                    "value": "k.chute @[usuário]"
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
                successEmbed.setDescription(`🤔 **<@${message.author.id}> se odeia ao ponto de se chutar**❓`);
                successEmbed.setImage(img.url);
            } else {
                // get the img link
                img = await getImg('kick');

                // set the title of embed with mentioned username
                successEmbed.setDescription(`😡 **<@${message.author.id}> deu um chute em <@${firstMentionedUser.id}>**❗`);
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