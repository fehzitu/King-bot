require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Client, Intents, Collection } = require('discord.js');

const config = require('./config');
const constants = require('./config/constants');
const { loadJson, saveJson } = require('./utils/jsonHandler');

// log system
function log(type, message) {
    const icons = constants.EMOJIS || {};

    const colors = constants.LOG_COLORS || {};

    const icon = icons[type.toUpperCase()] || '⚪';
    const color = colors[type.toUpperCase()] || colors.RESET;

    console.log(`${color}[${icon}] ${message}${colors.RESET}`);
};

// client
const client = new Client({
    intents: config.discord.intents.map(i => Intents.FLAGS[i])
});

// collections
client.commands = new Collection();
client.interactions = new Collection();

// generic loader
function loadFiles(dir, callback) {
    if (!fs.existsSync(dir)) {
        log('WARNING', `Diretório não encontrado: ${dir}`);
        return;
    };

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

// commands
loadFiles(path.join(__dirname, 'commands'), (filePath) => {
    const command = require(filePath);

    if (!command.name || !command.execute) {
        return log('ERROR', `Comando inválido: ${filePath}`);
    };

    log('WARNING', 'Carregando comandos');
    client.commands.set(command.name, command);
    log('SUCCESS', `Comandos carregados: ${command.name}`);
});

// interactions
loadFiles(path.join(__dirname, 'interactions'), (filePath) => {
    const interaction = require(filePath);

    if (!interaction.customId || !interaction.execute) {
        return log('ERROR', `Interação inválida: ${filePath}`);
    };

    log('WARNING', 'Carregando interações');
    client.interactions.set(interaction.customId, interaction);
    log('SUCCESS', `interações carregadas: ${interaction.customId}`);
});

// events
const eventsPath = path.join(__dirname, 'events');

function loadEvents(dir) {
    if (!fs.existsSync(dir)) {
        log('WARNING', 'Pasta de eventos não encontrada');
        return;
    };

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            loadEvents(filePath);
            continue;
        };

        if (!file.endsWith('.js')) continue;

        const event = require(filePath);

        if (!event.name || !event.execute) {
            log('ERROR', `evento inválido: ${filePath}`);
            continue;
        };

        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        };

        log('WARNING', 'Carregando eventos');
        log('SUCCESS', `Eventos carregados: ${event.name}`);
    };
};

loadEvents(eventsPath);

// bot db
const usersPath = config.database.usersPath;

client.usersData = loadJson(usersPath, {});

setInterval(() => {
    saveJson(usersPath, client.usersData)
        .then(() => log('SUCCESS', 'Database salva automaticamente'))
        .catch(err => log('ERROR', err.message));
}, 60000);

// login
client.login(config.token).then(() => {
    log('WARNING', 'Bot iniciando login');
}).catch(err => {
    log('ERROR', `Erro no login: ${err.message}`);
});