const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');

// database json file
const filePath = path.join(__dirname, '../users.json');

// importint all custom functions
const { loadUser } = require(path.join(__dirname, '../functions/loadUser.js'));
const { saveUser } = require(path.join(__dirname, '../functions/saveUser.js'));

module.exports = {
    name: Discord.Events.InteractionCreate,
    async execute(interaction) {
        // check if the command is an chat interaction
        if (!interaction.isChatInputCommand()) return;

        // get the command name
        const command = interaction.client.slashCommands.get(interaction.commandName);
        if (!command) {
            console.error(`[🔴] Não foi encontrado um comando com o nome: "${interaction.commandName}"! [🔴]`);
            return;
        };
        
        // get user name, id &, tag
        const userName = interaction.user.username;
        const userId = interaction.user.id;
        const userTag = interaction.user.tag;

        // load the database file
        const users = loadUser(filePath);

        // check if the users have a profile
        if (!users[userId]) {
            // create a new user data on the file
            users[userId] = {
                id: userId,
                name: userName,
                money: 100,
                createdAt: new Date().toISOString(),
                level: 0,
                xp: 0
            };

            // save the data into a file
            saveUser(filePath, users);

            // log
            console.log(`🏆 Novo perfil criado para ${userTag}`);
        };

        // check the server and channel from the message
        const guildName = interaction.guild?.name ?? "DM";
        const channelName = interaction.channel?.name ?? "DM";

        // log
        console.log(`[${new Date().toLocaleTimeString()}] @${interaction.user.tag} ${guildName} ${channelName}: /${command.data.name} [${command.data.description}]`);

        // try execute command and handle every error
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            // check if it has already been answered / deferred
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '[🔴] Comando já respondido ou adiado [🔴]', flags: Discord.MessageFlags.Ephemeral
                });
            } else {
                // check if it not has already been answered / deferred
                await interaction.reply({
                    content: '[🔴] Nosso sistema demorou muito pra responde ou adiar a resposta [🔴]', flags: Discord.MessageFlags.Ephemeral
                });
            };
        };
    }
};