// node normal importations
const fs = require('node:fs');
const path = require('node:path');

// database json file
const filePath = path.join(__dirname, './users.json');

// importing custom functions
const {
    loadJson,
    saveJson
} = require(path.join(__dirname, 'functions/jsonHandler.js'));

// discord importations
const Discord = require('discord.js');

// token importations
const Token = require('./config.json');

// import all intents
const {
    Client,
    Intents
} = require('discord.js');

// get all the bot intents once
const client = new Client({
    intents: Object.values(Intents.FLAGS)
});

// new client commands instance (BOT)
client.slashCommands = new Discord.Collection(); // store all slash commands interactions
client.prefixCommands = new Discord.Collection(); // store all prefix commands interactions

// new client interactions instance (BOT)
client.buttons = new Discord.Collection(); // store all button interactions
client.selects = new Discord.Collection(); // store all select menu interactions
client.modals = new Discord.Collection(); // store all modal interactions

// "commands" is the main folder to all the slash commands
const slashCommandsFoldersPath = path.join(__dirname, 'commands/slashCommands');
// define the "slashCommands" folder
if (fs.existsSync(slashCommandsFoldersPath)) {
    const slashCommandsFolders = fs.readdirSync(slashCommandsFoldersPath);

    for (const folder of slashCommandsFolders) {
        const slashCommandsPath = path.join(slashCommandsFoldersPath, folder);
        if (!fs.lstatSync(slashCommandsPath).isDirectory()) continue;

        const slashCommandsFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));
        for (const file of slashCommandsFiles) {
            const slashCommandsFilePath = path.join(slashCommandsPath, file);
            const command = require(slashCommandsFilePath);
            if ('data' in command && 'execute' in command) {
                client.slashCommands.set(command.data.name, command);
            } else {
                console.log(`[🔴] Comando em: [${slashCommandsFilePath}] está com os dados: "data" ou "execute" em falta! [🔴]`);
            };
        };
    };
};

// new client prefix commands instance (BOT)
const prefixCommandsFoldersPath = path.join(__dirname, 'commands/prefixCommands');
if (fs.existsSync(prefixCommandsFoldersPath)) {
    const prefixCommandsFolders = fs.readdirSync(prefixCommandsFoldersPath);

    for (const folder of prefixCommandsFolders) {
        const prefixCommandsPath = path.join(prefixCommandsFoldersPath, folder);
        if (!fs.lstatSync(prefixCommandsPath).isDirectory()) continue;

        const prefixCommandsFiles = fs.readdirSync(prefixCommandsPath).filter(file => file.endsWith('.js'));
        for (const file of prefixCommandsFiles) {
            const prefixCommandsFilePath = path.join(prefixCommandsPath, file);
            const command = require(prefixCommandsFilePath);
            if ('name' in command && 'execute' in command) {
                client.prefixCommands.set(command.name, command);
            } else {
                console.log(`[🔴] Comando em: [${prefixCommandsFilePath}] está com os dados: "name" ou "execute" em falta! [🔴]`);
            };
        };
    };
};

// "interaction" is the main folder to all the interactions like buttons
const interactionsFolderPath = path.join(__dirname, 'interaction');

if (fs.existsSync(interactionsFolderPath)) {
    const interactionFolders = fs.readdirSync(interactionsFolderPath);

    for (const folder of interactionFolders) {
        const interactionPath = path.join(interactionsFolderPath, folder);

        if (!fs.lstatSync(interactionPath).isDirectory()) continue;

        const interactionFiles = fs.readdirSync(interactionPath).filter(file => file.endsWith('.js'));

        for (const file of interactionFiles) {
            const interactionFilePath = path.join(interactionPath, file);
            const interaction = require(interactionFilePath);

            // folder buttons
            if (folder === 'buttons') {
                const buttonFiles = fs.readdirSync(interactionPath);

                for (const file of buttonFiles) {
                    const filePath = path.join(interactionPath, file);

                    if (fs.lstatSync(filePath).isDirectory()) continue;
                    if (!file.endsWith('.js')) continue;

                    const interaction = require(filePath);

                    if ('name' in interaction && 'execute' in interaction) {
                        client.buttons.set(interaction.name, interaction);
                    };
                };
            };

            // select menu
            if (folder === 'selects') {
                const selectFiles = fs.readdirSync(interactionPath);

                for (const file of selectFiles) {
                    const filePath = path.join(interactionPath, file);

                    if (fs.lstatSync(filePath).isDirectory()) continue;
                    if (!file.endsWith('.js')) continue;

                    const interaction = require(filePath);

                    if ('customId' in interaction && 'execute' in interaction) {
                        client.selects.set(interaction.customId, interaction);
                    };
                };
            };

            // modals
            if (folder === 'modals') {
                const modalFiles = fs.readdirSync(interactionPath);

                for (const file of modalFiles) {
                    const filePath = path.join(interactionPath, file);

                    if (fs.lstatSync(filePath).isDirectory()) continue;
                    if (!file.endsWith('.js')) continue;

                    const interaction = require(filePath);

                    if ('customId' in interaction && 'execute' in interaction) {
                        client.modals.set(interaction.customId, interaction);
                    };
                };
            };
        };
    };
};

// new client events instance (BOT)
client.events = new Discord.Collection();

const eventsFolder = path.join(__dirname, 'events');
const eventsPath = path.join(eventsFolder);

const eventFolders = fs.readdirSync(eventsPath);

for (const folder of eventFolders) {
    const folderPath = path.join(eventsPath, folder);

    if (!fs.lstatSync(folderPath).isDirectory()) continue;

    const eventsFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

    for (const file of eventsFiles) {
        const eventFilePath = path.join(folderPath, file);
        const event = require(eventFilePath);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        };
    };
};

// load users database once
client.usersData = loadJson(filePath, {});

// autosave users database every x seconds
setInterval(async () => {
    try {
        await saveJson(filePath, client.usersData);
    } catch (err) {
        console.error("👾 Erro ao salvar usuários:", err);
    };
}, 30000);

// login with bot data/info
client.login(Token.token);