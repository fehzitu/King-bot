// command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

// import custom functions
const createEmbed = require('../utils/embed.js');
const createButton = require('../utils/button.js');

module.exports = {
    // slash data
    data: new SlashCommandBuilder()
        .setName('teste')
        .setDescription('Interações de teste'),

    // prefix name
    name: 'teste',

    // execute
    async execute(ctx, args) {
        // get user
        const user = ctx.user || ctx.author;

        // embed
        const embed = createEmbed({user});

        // button
        const button = createButton({
            customId: `testButton`,
            user
        });

        // button
        const row = new MessageActionRow().addComponents(button);

        // reply
        return ctx.reply({ 
            embeds: [embed],
            components: [row]
        });
    }
};