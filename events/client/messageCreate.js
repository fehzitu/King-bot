const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');

// database json file
const filePath = path.join(__dirname, '../../users.json');

// importing custom functions
const { loadJson } = require(path.join(__dirname, '../../functions/loadJson.js'));
const { saveJson } = require(path.join(__dirname, '../../functions/saveJson.js'));
const { checkLevelUp } = require('../../functions/levelSystem.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        // ignore bot messages
        if (message.author.bot) return;

        // get user id and tag
        const userId = message.author.id;
        const userTag = message.author.tag;
        
        // load users database once
        const users = message.client.usersData;

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

        // increase message counter
        profile.stats.messages++;

        // XP system with cooldown (30 seconds)
        const now = Date.now();

        if (now - profile.cooldowns.xp > 30000) {

            // random xp between 5 and 10
            const xpGain = Math.floor(Math.random() * 6) + 5;
            
            // add xp
            profile.rpg.xp += xpGain;
            
            // check xp
            const result = checkLevelUp(profile);
            
            // check xp result
            if (result.leveledUp) {
            	message.channel.send(`🎉 ${message.author} subiu para o **nível ${result.level}**!`
            	);
            };

            // update cooldown
            profile.cooldowns.xp = now;
        };

        // log message info
        const guildName = message.guild ? message.guild.name : "DM";
        const channelName = message.guild ? message.channel.name : "DM";

        console.log(`[${new Date().toLocaleTimeString()}] @${userTag} ${guildName} ${channelName}: ${message.content}`);

        // commands prefix
        const prefix = "k.";

        // set message content to lower case
        const content = message.content.toLowerCase();

        // check if message starts with prefix
        if (!content.startsWith(prefix)) return;

        // get args from message
        const args = content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift();

        // get command from collection
        const command = message.client.prefixCommands.get(commandName);
        if (!command) return;

        // increase command counter
        profile.stats.commands++;

        // execute command
        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
        };
    }
};