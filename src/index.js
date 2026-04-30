require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Client, Intents, Collection } = require('discord.js');

const config = require('./config');
const constants = require('./config/constants');
const { loadJson, saveJson } = require('./utils/jsonHandler');

// client
const client = new Client({
    intents: config.discord.intents.map(i => Intents.FLAGS[i])
});

// collections
client.commands = new Collection();
client.interactions = new Collection();

// log system
function log(type, message) {
    const icon = constants.EMOJIS[type.toUpperCase()] || "⚪";
    console.log(`[${icon}] ${message}`);
};

// generic loader
function loadFiles(dir, callback) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            loadFiles(filePath, callback);
        } else if (file.endsWith('.js')) {
            callback(filePath);
        };
    }
};

// load commands
loadFiles(path.join(__dirname, 'commands'), (filePath) => {
    const command = require(filePath);

    if (!command.name || !command.execute) {
        return log('ERROR', `Comando inválido: ${filePath}`);
    };

    client.commands.set(command.name, command);
    log('SUCCESS', `Comando carregado: ${command.name}`);
});

// load interactions
loadFiles(path.join(__dirname, 'interactions'), (filePath) => {
    const interaction = require(filePath);

    if (!interaction.customId || !interaction.execute) {
        return log('ERROR', `Interaction inválida: ${filePath}`);
    };

    client.interactions.set(interaction.customId, interaction);
    log('SUCCESS', `Interaction carregada: ${interaction.customId}`);
});

// load events
loadFiles(path.join(__dirname, 'events'), (filePath) => {
    const event = require(filePath);

    if (!event.name || !event.execute) {
        return log('ERROR', `Evento inválido: ${filePath}`);
    };

    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    };

    log('INFO', `Evento carregado: ${event.name}`);
});

// bot db
const usersPath = config.database.usersPath;

client.usersData = loadJson(usersPath, {});

setInterval(() => {
    saveJson(usersPath, client.usersData)
        .then(() => log('INFO', 'Database salva automaticamente'))
        .catch(err => log('ERROR', err.message));
}, 60000);

// login
client.login(config.token);