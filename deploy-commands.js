// imports
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// commands map
const commands = [];
const foldersPath = path.join(__dirname, 'slashCommands');

// hardly filters pastes
if (!fs.existsSync(foldersPath)) {
    console.log('❌ Pasta "slashCommands" não encontrada.');
    process.exit(0);
}

const commandFolders = fs.readdirSync(foldersPath).filter(file =>
    fs.statSync(path.join(foldersPath, file)).isDirectory()
);

// log
console.log('🔄 Iniciando leitura dos comandos...\n');

// reading files
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);

    const commandFiles = fs.readdirSync(commandsPath)
        .filter(file => file.endsWith('.js'));

    // check empty folders
    if (commandFiles.length === 0) {
        console.log(`⚠ Pasta "${folder}" não possui comandos.`);
        continue;
    }

    let loadedInFolder = 0;

    // reading every file
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);

        try {
            const command = require(filePath);

            // check all commands
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
                loadedInFolder++;
            } else {
                // error log
                console.warn(`⚠ Comando inválido em: ${filePath} (Está faltando "data" ou "execute")`);
            }

        } catch (err) {
            console.error(`❌ Erro ao carregar: ${filePath}\n`, err);
        }
    }

    // log to valid commands
    console.log(`📁 ${folder}: ${loadedInFolder}/${commandFiles.length} comandos válidos carregados.`);
}

// log for ready commands
console.log(`📦 Total de comandos preparados: ${commands.length}`);

// discord API
const rest = new REST({ version: '10' }).setToken(token);

// commands deploy
(async () => {
    try {
        // strat log
        console.log('🚀 Iniciando deploy dos comandos...\n');

		// defines a route to save the comands in the bot database
        const data = await rest.put(
            Routes.applicationCommands(clientId, guildId),
            {
                body: commands
            }
        );

        // final log
        console.log(`📊 ${data.length}/${commands.length} comandos registrados.`);

    } catch (error) {
        // error on deploy commands
        console.error('❌ Erro durante o deploy dos comandos:\n', error);
    }
})();