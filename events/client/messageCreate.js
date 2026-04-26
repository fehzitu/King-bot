// node file system
const path = require('path');

// database json file
const filePath = path.join(__dirname, '../../users.json');

// import default user and custom functions
const {
    defaultUser,
    checkLevelUp
} = require(path.join(__dirname, '../../functions/levelSystem.js'));

const {
    setKarma
} = require(path.join(__dirname, '../../functions/karmaSystem.js'));

const {
    saveJson
} = require(path.join(__dirname, '../../functions/jsonHandler.js'));

module.exports = {
    name: 'messageCreate',
    async execute(ctx) {
        // ignore bot messages
        if (ctx.author.bot) return;

        // get user id and tag
        const userId = ctx.author.id;
        const userTag = ctx.author.tag;

        // load users database once
        const users = ctx.client.usersData;

        // check if the user has a profile
        if (!users[userId]) {
            // create new profile
            users[userId] = defaultUser;

            // save database
            await saveJson(filePath, users);
            // await for consistency with async saving

            // log
            console.log(`🏆 Novo perfil criado para ${userTag}`);
        };

        // get user profile
        const profile = users[userId];
        
        // check the user karma
        setKarma(profile);

        // increase message counter
        profile.stats.messages++;

        // XP system with cooldown (30 seconds)
        const now = Date.now();

        if (now - profile.cooldowns.xp > 3000) {
            // add xp
            profile.rpg.xp += 50;

            // check xp
            const result = checkLevelUp(profile);

            // check xp result
            if (result.leveledUp) {
                if (ctx.channel) {
                    // safety check (future-proof for different channel types)
                    ctx.channel.send(`🎉 **${ctx.author} subiu para o nível ${result.level}**!`);
                };
            };

            // update cooldown
            profile.cooldowns.xp = now;
        };

        // log message info
        const guildName = ctx.guild ? ctx.guild.name : "DM";
        const channelName = ctx.guild ? ctx.channel.name : "DM";

        console.log(`[${new Date().toLocaleDateString()}] [${new Date().toLocaleTimeString()}] [@${userTag}] [${guildName}] [${channelName}] : ${ctx.content}`);

        // commands prefix
        const prefix = "k.";

        // set message content to lower case
        const content = ctx.content.toLowerCase();

        // check if message starts with prefix
        if (!content.startsWith(prefix)) return;

        // get args from message
        const args = content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift();

        // get command from collection
        const command = ctx.client.prefixCommands.get(commandName);
        if (!command) {
            console.log(`[🟡] Comando desconhecido: "${commandName}"`);
            return;
        };

        // increase command counter
        profile.stats.commands++;

        // execute command
        try {
            await command.execute(ctx, args);
        } catch (error) {
            console.error(error);
        };
    }
};