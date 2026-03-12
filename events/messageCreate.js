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
    name: 'messageCreate',
    async execute(message) {
        // check if an bot send the message
        if (message.author.bot) return;

        // get user name, id &, tag
        const userName = message.author.username;
        const userId = message.author.id;
        const userTag = message.author.tag;

        // load the database file
        const users = loadUser(filePath);

        // check if the users have a profile
        if (!users[userId]) {
            // create a new user data on the file
            users[userId] = {
                id: userId,
                name: userName,
                createdAt: new Date().toISOString(),
                rpg: {
                	money: 100,
                	level: 0,
                	xp: 0,
                	multiplier: 0.25,
                	xpToNextLevel: 25
                }
            };

            // save the data into a file
            saveUser(filePath, users);

            // log
            console.log(`🏆 Novo perfil criado para ${userTag}`);
        };

        // check the server and channel from the message
        const guildName = message.guild ? message.guild.name : "DM";
        const channelName = message.channel.type === "DM" ? "DM" : message.channel.name;

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
        };
    }
};