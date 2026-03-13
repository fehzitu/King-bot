const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');

// database json file
const filePath = path.join(__dirname, '../../users.json');

// importing custom functions
const { loadJson } = require(path.join(__dirname, '../../functions/loadJson.js'));
const { saveJson } = require(path.join(__dirname, '../../functions/saveJson.js'));

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
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
        
        // load users database once
        const users = interaction.client.users;

        // check if the user has a profile
        if (!users[userId]) {
            // create new profile
            users[userId] = {
                profileCreatedAt: new Date().toISOString(),
                rpg: {
                    money: 100,
                    level: 0,
                    xp: 0,
                    multiplier: 0.25
                },
                stats: {
                    messages: 0,
                    commands: 0
                },
                cooldowns: {
                    xp: 0
                }
            };

            // save database
            saveJson(filePath, users);

            // log
            console.log(`🏆 New profile created for ${userTag}`);
        };

        // get user profile
        const profile = users[userId];

        // increase command counter
        profile.stats.commands++;

        // log command execution
        const guildName = interaction.guild ? interaction.guild.name : "DM";
        const channelName = interaction.guild ? interaction.channel.name : "DM";
        console.log(
            `[${new Date().toLocaleTimeString()}] @${userTag} ${guildName} ${channelName}: /${command.data.name}`
        );

        // execute command
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            // check if interaction already replied or deferred
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '[🔴] Command already replied or deferred [🔴]',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '[🔴] Command took too long to respond or defer [🔴]',
                    ephemeral: true
                });
            };
        }
    }
};