const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');

// database json file
const filePath = path.join(__dirname, '../../users.json');

// import default user
const {
    defaultUser
} = require(path.join(__dirname, '../../functions/levelSystem.js'));

// importing custom functions
const {
    saveJson
} = require(path.join(__dirname, '../../functions/saveJson.js'));
const {
    checkLevelUp
} = require('../../functions/levelSystem.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        // button interaction
        if (interaction.isButton()) {
            // With this we can get the dynamic data, example "action:data"
            const [buttonId] = interaction.customId.split(':');
            // Get the first part of the customId.
            const button = interaction.client.buttons?.get(buttonId);
            // Get the button corresponding to this ID within the bot collection

            // log if we got an erro with the interaction
            if (!button) {
                console.warn(`[⚠️] Botão não encontrado: ${interaction.customId}`);
                return;
            };

            try {
                await button.execute(interaction);
            } catch (error) {
                console.error(error);

                // log if we have error using an interaction
                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        content: '❌ Erro ao executar interação.',
                        ephemeral: true
                    });
                }
            };

            // stop execution here
            return;
        };

        // select menu interaction
        if (interaction.isSelectMenu()) {
            // With this we can get the dynamic data, example "action:data"
            const [selectId] = interaction.customId.split(':');
            // Get the first part of the customId.
            const select = interaction.client.selects?.get(selectId);
            // Get the select menu corresponding to this ID within the bot collection

            // log if we got an erro with the interaction
            if (!select) {
                console.warn(`[⚠️] Menu seletor não encontrado: ${interaction.customId}`);
                return;
            };

            try {
                await select.execute(interaction);
            } catch (error) {
                console.error(error);

                // log if we have error using an interaction
                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        content: '❌ Erro ao executar interação.',
                        ephemeral: true
                    });
                }
            };

            // stop interaction here
            return;
        };

        // modal interaction
        if (interaction.isModalSubmit()) {
            // With this we can get the dynamic data, example "action:data"
            const [modalId] = interaction.customId.split(':');
            // Get the first part of the customId.
            const modal = interaction.client.modals?.get(modalId);
            // Get the modal corresponding to this ID within the bot collection

            // log if we got an erro with the interaction
            if (!modal) {
                console.warn(`[⚠️] Modal não encontrado: ${interaction.customId}`);
                return;
            };

            try {
                await modal.execute(interaction);
            } catch (error) {
                console.error(error);

                // log if we have error using an interaction
                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        content: '❌ Erro ao executar interação.',
                        ephemeral: true
                    });
                }
            };

            // stop interaction
            return;
        };

        // check if the interaction is a slash command
        if (!interaction.isCommand()) return;

        // get the command
        const command = interaction.client.slashCommands.get(interaction.commandName);

        if (!command) {
            console.error(`[🔴] Command not found: "${interaction.commandName}"`);
            return;
        };

        // get user id and tag
        const userId = interaction.user.id;
        const userTag = interaction.user.tag;

        // load users database
        const users = interaction.client.usersData;

        // create profile if not exists
        if (!users[userId]) {
            users[userId] = defaultUser;

            await saveJson(filePath, users);

            console.log(`🏆 New profile created for ${userTag}`);
        };

        // get profile
        const profile = users[userId];

        // increase command counter
        profile.stats.commands++;

        // log command execution
        const guildName = interaction.guild ? interaction.guild.name : "DM";
        const channelName = interaction.guild ? interaction.channel.name : "DM";

        console.log(
            `[${new Date().toLocaleTimeString()}] @${userTag} ${guildName} ${channelName}: /${command.data.name}`
        );

        try {
            // execute command
            await command.execute(interaction);

            // xp will be added to the user
            const xpGain = 100;

            // add xp
            profile.rpg.xp += xpGain;

            const result = checkLevelUp(profile);

            // level up message
            if (result.leveledUp) {
                const levelMsg = `🎉 **${interaction.user}** reached **level ${result.level}**!`;

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: levelMsg
                    });
                } else {
                    await interaction.reply({
                        content: levelMsg
                    });
                };
            };
        } catch (error) {
            console.error(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '[🔴] Command execution error [🔴]',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '[🔴] Command execution error [🔴]',
                    ephemeral: true
                });
            };
        };
    }
};