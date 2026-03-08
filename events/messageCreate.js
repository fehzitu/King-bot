const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');

// database json file
const filePath = path.join(__dirname, '../database/users.json');

// importint all custom functions
const { loadJSON, saveJSON } = require(path.join(__dirname, '../functions/json.js'));

module.exports = {
    name: Discord.Events.MessageCreate,
    async execute(message) {
        // check if an bot send the message
        if (message.author.bot) return;

        // get user id
        const userId = message.author.id;

        // load the database file
        const users = loadJSON(filePath);

        // check if the users have a profile
        if (!users[userId]) {
            // create a new user data on the file
            users[userId] = {
                id: message.author.id,
                name: message.author.username,
                money: 100,
                createdAt: new Date().toISOString(),
                level: 0,
                xp: 0
            };

            // save the data into a file
            saveJSON(filePath, users);

            // log
            console.log(`🏆 Novo perfil criado para ${message.author.tag}`);
        };

        // check the server and channel from the message
        const guildName = message.guild?.name ?? "DM";
        const channelName = message.channel?.name ?? "DM";

        // log
        console.log(`[${new Date().toLocaleTimeString()}] @${message.author.tag} ${guildName} ${channelName}: ${message.content}`);

        // commands prefix
        const prefix = "k.";

        // set lower case
        const content = message.content.toLowerCase();
        if (!content.startsWith(prefix)) return;

        // get args from message content
        const args = content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift();

        // get the command by the name
        const command = message.client.prefixCommands.get(commandName);
        if (!command) return;

        // handle error
        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
        }
    }
};