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

// universal handler for components
async function safeExecute(handler, ctx) {
    try {
        return await handler.execute(ctx);
    } catch (error) {
        console.error(error);

        // log if we got an error with this interaction
        if (!ctx.replied && !ctx.deferred) {
            await ctx.reply({
                content: '❌ Erro ao executar interação.',
                ephemeral: true
            });
        }
    };
};

module.exports = {
    name: 'interactionCreate',
    async execute(ctx) {
        // get user id and tag
        const userId = ctx.user.id;
        const userTag = ctx.user.tag;

        // load users database
        const users = ctx.client.usersData;

        // create profile if not exists
        if (!users[userId]) {
            users[userId] = defaultUser;

            await saveJson(filePath, users);

            console.log(`🏆 Novo perfil criado para ${userTag}`);
        };

        // get profile
        const profile = users[userId];
        
        // check the user karma
        setKarma(profile);

        // With this we can get the dynamic data, example "action:data"
        const [customId] = ctx.customId ? ctx.customId.split(':') : [];

        // button interaction
        if (ctx.isButton()) {
            // Get the button corresponding to this ID within the bot collection
            const button = ctx.client.buttons?.get(customId);

            // log if we got an erro with the interaction
            if (!button) {
                console.warn(`[🟡] Botão não encontrado: ${ctx.customId}`);
                return;
            };

            // handler
            const result = await safeExecute(button, ctx);
            if (!result) return;

            const { embeds = [], components = [], content } = result;

            // stop execution here
            return;
        };

        // select menu interaction
        if (ctx.isSelectMenu()) {
            // Get the select menu corresponding to this ID within the bot collection
            const select = ctx.client.selects?.get(customId);

            // log if we got an erro with the interaction
            if (!select) {
                console.warn(`[🟡] Menu seletor não encontrado: ${ctx.customId}`);
                return;
            };

            // handler
            const result = await safeExecute(select, ctx);
            if (!result) return;

            const { embeds = [], components = [], content } = result;

            // stop interaction here
            return;
        };

        // modal interaction
        if (ctx.isModalSubmit()) {
            // Get the modal corresponding to this ID within the bot collection
            const modal = ctx.client.modals?.get(customId);

            // log if we got an erro with the interaction
            if (!modal) {
                console.warn(`[🟡] Modal não encontrado: ${ctx.customId}`);
                return;
            };

            // handler
            const result = await safeExecute(modal, ctx);
            if (!result) return;

            const { embeds = [], components = [], content } = result;

            // stop interaction
            return;
        };

        // check if the interaction is a slash command
        if (!ctx.isCommand()) return;

        // get the command
        const command = ctx.client.slashCommands.get(ctx.commandName);

        if (!command) {
            console.error(`[🔴] Comando não encontrado: "${ctx.commandName}"`);
            return;
        };

        // increase command counter
        profile.stats.commands++;

        // log command execution
        const guildName = ctx.guild ? ctx.guild.name : "DM";
        const channelName = ctx.guild ? ctx.channel.name : "DM";

        console.log(`[${new Date().toLocaleDateString()}] [${new Date().toLocaleTimeString()}] [@${userTag}] [${guildName}] [${channelName}] : /${command.data.name}`
        );

        try {
            // execute command
            const result = await command.execute(ctx);

            if (result) {
                const { embeds = [], components = [], content } = result;
            };

            // add xp
            profile.rpg.xp += 100;

            const resultLevel = checkLevelUp(profile);

            // level up message
            if (resultLevel.leveledUp) {
                const levelMsg = `🎉 **${ctx.user} subiu para o nível ${resultLevel.level}**!`;

                if (ctx.replied || ctx.deferred) {
                    await ctx.followUp({
                        content: levelMsg
                    });
                } else {
                    await ctx.reply({
                        content: levelMsg
                    });
                };
            };
        } catch (error) {
            console.error(error);
            if (ctx.replied || ctx.deferred) {
                await ctx.followUp({
                    content: '[🔴] Erro ao executar o comando! [🔴]',
                    ephemeral: true
                });
            } else {
                await ctx.reply({
                    content: '[🔴] Erro ao executar o comando! [🔴]',
                    ephemeral: true
                });
            };
        };
    }
};