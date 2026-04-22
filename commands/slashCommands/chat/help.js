// discord implements
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Recebe ajuda sobre nosso sistema!'),
    async execute(interaction) {
        // get the user
        const user = interaction.user || interaction.author;

        // error log
        if (!user) {
            console.log('Erro no usuário:', interaction);
            return;
        };

        // create an embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                iconURL: `${interaction.user.displayAvatarURL()}`,
                name: `@${interaction.user.username}`
            })
            .setImage('https://cdn.discordapp.com/attachments/1478819111906705430/1491724642799583322/images.jpeg?ex=69d8bc55&is=69d76ad5&hm=20d6a24780e97cda50b1b41b0721d16a856c588b144551bd7c3e26dfb7b3fb14&')
            .addFields([{
                name: '🥀 Em **qualquer servidor que eu estiver** basta **você utilizar** meu comando base pra **abrir o menu e interagir comigo** no chat.',
                value: '**👉 comando base "k.menu"**'
            }])
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });
            
        // create the row
        let row = null;

        // create some buttons inside a row
        row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId(`page:menu:home:${user.id}`)
                .setLabel('🏠')
                .setStyle('PRIMARY')
        );

        // set the main message to be send
        await interaction.reply({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};