// discord implements
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Recebe ajuda sobre nosso sistema!'),
    async execute(interaction) {
        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${interaction.user.displayAvatarURL()}`,
                name: `@${interaction.user.username}`
            })
            .setImage('https://cdn.discordapp.com/attachments/1478819111906705430/1491724642799583322/images.jpeg?ex=69d8bc55&is=69d76ad5&hm=20d6a24780e97cda50b1b41b0721d16a856c588b144551bd7c3e26dfb7b3fb14&')
            .addFields([{
                name: `👑 **Drakay**\n🔗 **https://discord.gg/Wpgu4qXWUk**`,
                value: "> __Utilize **k.menu** no chat❗__"
            }])
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // set the main message to be send
        await interaction.reply({
            embeds: [embed]
        });
    }
};