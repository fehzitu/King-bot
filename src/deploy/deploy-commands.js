require('dotenv').config();

const fs = require('fs');
const path = require('path');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const constants = require('../config/constants.js');
const log = require('../utils/logger.js');

// config
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;

// load commands
const commands = [];

function loadCommands(dir) {
    if (!fs.existsSync(dir)) {
        log('WARNING', `Pasta não encontrada: ${dir}`);
        return;
    };

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            loadCommands(filePath);
        } else if (file.endsWith('.js')) {
            const command = require(filePath);

            if (command.data) {
                commands.push(command.data.toJSON());
                log('INFO', `Comando carregado: ${command.data.name}`);
            } else {
                log('WARNING', `Comando sem "data": ${filePath}`);
            };
        };
    }
};

// path
loadCommands(path.join(__dirname, '../commands'));

// discord rest
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