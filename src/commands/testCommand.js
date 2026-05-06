// command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

// import custom functions
const createEmbed = require('../utils/embed.js');
const createButton = require('../utils/button.js');
const createSelect = require('../utils/select.js');

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
        const button = createButton({user});
        
        const select = createSelect({user});

        // row
        const row1 = new MessageActionRow().addComponents(button), row2 = new MessageActionRow().addComponents(select);

        // reply
        return ctx.reply({ 
            embeds: [embed],
            components: [row1, row2]
        });
    }
};