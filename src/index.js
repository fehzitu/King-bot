require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Client, Intents, Collection } = require('discord.js');

const config = require('./config');
const { loadJson, saveJson } = require('./utils/jsonHandler');
const log = require('./utils/logger');

// client
const client = new Client({
    intents: config.discord.intents.map(i => Intents.FLAGS[i])
});

// collections
client.commands = new Collection();
client.interactions = new Collection();

// generic recursive loader
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

// load commands
function loadCommands() {
    let loaded = 0;
    let invalid = [];

    log('RESET', 'Carregando comandos');

    loadFiles(path.join(__dirname, 'commands'), (filePath) => {
        const command = require(filePath);

        if (!command.name || !command.execute) {
            invalid.push(path.basename(filePath));
            return;
        };

        client.commands.set(command.name, command);
        loaded++;
    });

    log('WARNING', `Comandos carregados: ${loaded}`);

    if (invalid.length > 0) {
        log('ERROR', `Comandos inválidos: ${invalid.join(', ')}`);
    };
};

// load interactions
function loadInteractions() {
    let loaded = 0;
    let invalid = [];

    log('RESET', 'Carregando interações');

    loadFiles(path.join(__dirname, 'interactions'), (filePath) => {
        const interaction = require(filePath);

        if (!interaction.customId || !interaction.execute) {
            invalid.push(path.basename(filePath));
            return;
        };

        client.interactions.set(interaction.customId, interaction);
        loaded++;
    });

    log('WARNING', `Interações carregadas: ${loaded}`);

    if (invalid.length > 0) {
        log('ERROR', `Interações inválidas: ${invalid.join(', ')}`);
    };
};

// load events
function loadEvents() {
    let loaded = 0;
    let invalid = [];

    const eventsPath = path.join(__dirname, 'events');

    log('RESET', 'Carregando eventos');

    function walk(dir) {
        if (!fs.existsSync(dir)) {
            log('WARNING', 'Pasta de eventos não encontrada');
            return;
        };

        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                walk(filePath);
                continue;
            };

            if (!file.endsWith('.js')) continue;

            const event = require(filePath);

            if (!event.name || !event.execute) {
                invalid.push(path.basename(filePath));
                continue;
            };

            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            };

            loaded++;
        }
    };

    walk(eventsPath);

    log('WARNING', `Eventos carregados: ${loaded}`);

    if (invalid.length > 0) {
        log('ERROR', `Eventos inválidos: ${invalid.join(', ')}`);
    };
};

// load everything
loadCommands();
loadInteractions();
loadEvents();

// database
const usersPath = config.database.usersPath;

client.usersData = loadJson(usersPath, {});

// autosave
/*
setInterval(() => {
    saveJson(usersPath, client.usersData)
        .then(() => log('INFO', 'Database salva automaticamente'))
        .catch(err => log('ERROR', err.message));
}, 60000);
*/

// login
log('INFO', 'Iniciando login');

client.login(config.token).catch(err => {
    log('ERROR', `Erro no login: ${err.message}`);
});