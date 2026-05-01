require('dotenv').config();

const fs = require('fs');
const path = require('path');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const log = require('../utils/logger');

// config
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;

// commands array
const commands = [];

// loader
function loadCommands(dir) {
    let loaded = 0;
    let invalid = [];

    function walk(currentDir) {
        if (!fs.existsSync(currentDir)) {
            log('WARNING', `Pasta não encontrada: ${currentDir}`);
            return;
        };

        const files = fs.readdirSync(currentDir);

        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                walk(filePath);
                continue;
            };

            if (!file.endsWith('.js')) continue;

            const command = require(filePath);

            if (!command.data) {
                invalid.push(path.basename(filePath));
                continue;
            };

            commands.push(command.data.toJSON());
            loaded++;
        }
    };

    log('INFO', 'Carregando comandos para deploy');

    walk(dir);

    log('SUCCESS', `Comandos carregados: ${loaded}`);

    if (invalid.length > 0) {
        log('ERROR', `Comandos inválidos: ${invalid.join(', ')}`);
    };
};

// load
loadCommands(path.join(__dirname, '../commands'));

// rest
const rest = new REST({ version: '9' }).setToken(TOKEN);

// deploy
(async () => {
    try {
        log('INFO', 'Iniciando deploy de comandos');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );

        log('SUCCESS', `${commands.length} comandos registrados com sucesso!`);
    } catch (error) {
        log('ERROR', `Erro ao registrar comandos: ${error.message}`);
    };
})();