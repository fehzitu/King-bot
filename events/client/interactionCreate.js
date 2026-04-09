// node file system
const path = require('path');

// database json file
const filePath = path.join(__dirname, '../../users.json');

// import default user and custom functions
const {
    defaultUser,
    checkLevelUp
} = require(path.join(__dirname, '../../functions/levelSystem.js'));

// importing custom functions from other file
const {
    saveJson
} = require(path.join(__dirname, '../../functions/saveJson.js'));

// universal handler for components
async function safeExecute(handler, interaction) {
    try {
        await handler.execute(interaction);
    } catch (error) {
        console.error(error);

        // log if we got an error with this interaction
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: '❌ Erro ao executar interação.',
                ephemeral: true
            });
        }
    };
};

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // With this we can get the dynamic data, example "action:data"
        const [customId] = interaction.customId ? interaction.customId.split(':') : [];

        // button interaction
        if (interaction.isButton()) {
            // Get the button corresponding to this ID within the bot collection
            const button = interaction.client.buttons?.get(customId);

            // log if we got an erro with the interaction
            if (!button) {
                console.warn(`[🟡] Botão não encontrado: ${interaction.customId}`);
                return;
            };

            // handler
            await safeExecute(button, interaction);

            // stop execution here
            return;
        };

        // select menu interaction
        if (interaction.isSelectMenu()) {
            // Get the select menu corresponding to this ID within the bot collection
            const select = interaction.client.selects?.get(customId);

            // log if we got an erro with the interaction
            if (!select) {
                console.warn(`[🟡] Menu seletor não encontrado: ${interaction.customId}`);
                return;
            };

            // handler
            await safeExecute(select, interaction);

            // stop interaction here
            return;
        };

        // modal interaction
        if (interaction.isModalSubmit()) {
            // Get the modal corresponding to this ID within the bot collection
            const modal = interaction.client.modals?.get(customId);

            // log if we got an erro with the interaction
            if (!modal) {
                console.warn(`[🟡] Modal não encontrado: ${interaction.customId}`);
                return;
            };

            // handler
            await safeExecute(modal, interaction);

            // stop interaction
            return;
        };

        // check if the interaction is a slash command
        if (!interaction.isCommand()) return;

        // get the command
        const command = interaction.client.slashCommands.get(interaction.commandName);

        if (!command) {
            console.error(`[🔴] Comando não encontrado: "${interaction.commandName}"`);
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

            console.log(`🏆 Novo perfil criado para ${userTag}`);
        };

        // get profile
        const profile = users[userId];

        // increase command counter
        profile.stats.commands++;

        // log command execution
        const guildName = interaction.guild ? interaction.guild.name : "DM";
        const channelName = interaction.guild ? interaction.channel.name : "DM";

        console.log(`[${new Date().toLocaleDateString()}] [${new Date().toLocaleTimeString()}] [@${userTag}] [${guildName}] [${channelName}] : /${command.data.name}`
        );

        try {
            // execute command
            await command.execute(interaction);

            // xp will be added to the user
            const xpGain = 500;

            // add xp
            profile.rpg.xp += xpGain;

            const result = checkLevelUp(profile);

            // level up message
            if (result.leveledUp) {
                const levelMsg = `🎉 **${interaction.user} subiu para o nível ${result.level}**!`;

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: levelMsg
                    });
                    await interaction.channel.send('https://cdn.discordapp.com/attachments/1477290272638632068/1491805991048712232/930929516350693437.gif?ex=69d90818&is=69d7b698&hm=ae8680b87109b1952cf70d0ff32104f14fb7223f0ab1de35200466bc7dc71131&');
                } else {
                    await interaction.reply({
                        content: levelMsg
                    });
                    await interaction.channel.send('https://cdn.discordapp.com/attachments/1477290272638632068/1491805991048712232/930929516350693437.gif?ex=69d90818&is=69d7b698&hm=ae8680b87109b1952cf70d0ff32104f14fb7223f0ab1de35200466bc7dc71131&');
                };
            };
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '[🔴] Erro ao executar o comando! [🔴]',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '[🔴] Erro ao executar o comando! [🔴]',
                    ephemeral: true
                });
            };
        };
    }
};