require('dotenv').config();

const fs = require('fs');
const path = require('path');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// config
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;

// load commands
const commands = [];

function loadCommands(dir) {
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
            } else {
                console.log(`[⚠️] Comando sem "data": ${filePath}`);
            };
        }
    }
};

// path
loadCommands(path.join(__dirname, '../commands'));

// discord rest
const rest = new REST({ version: '9' }).setToken(TOKEN);

// deploy
(async () => {
    try {
        console.log('🔄 Iniciando deploy de comandos...');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );

        console.log(`🟢 ${commands.length} comandos registrados com sucesso!`);
    } catch (error) {
        console.error('🔴 Erro ao registrar comandos:', error);
    };
})();