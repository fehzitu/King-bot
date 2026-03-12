// node normal importations
const fs = require('node:fs');
const path = require('node:path');

// discord importations
const Discord = require('discord.js');
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
client.slashCommands = new Discord.Collection();
client.prefixCommands = new Discord.Collection();

// "commands" is the main folder to all the slash commands
const slashCommandsFoldersPath = path.join(__dirname, 'commands/slashCommands');
// define the "slashCommands" folder
if (fs.existsSync(slashCommandsFoldersPath)) {
	const slashCommandsFolders = fs.readdirSync(slashCommandsFoldersPath);

	// registering each folder within the main slash command folder
	for (const folder of slashCommandsFolders) {
		const slashCommandsPath = path.join(slashCommandsFoldersPath, folder);
		if (!fs.lstatSync(slashCommandsPath).isDirectory()) continue;
		// (slashCommandsPath) defines each folder as a path to a group of slash commands
		// (slashCommandsFiles) defines each file to be a command (.js file)
		const slashCommandsFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));
		for (const file of slashCommandsFiles) {
			// (slashCommandsFilePath) defining the path of each command
			const slashCommandsFilePath = path.join(slashCommandsPath, file);
			// (command) defining each command
			const command = require(slashCommandsFilePath);
			if ('data' in command && 'execute' in command) {
				client.slashCommands.set(command.data.name, command);
			} else {
				// log if error
				console.log(`[🔴] Comando em: [${slashCommandsFilePath}] está com os dados: "data" ou "execute" em falta! [🔴]`);
			};
		};
	};
};

// new client prefix commands instance (BOT)
const prefixCommandsFoldersPath = path.join(__dirname, 'commands/prefixCommands');
if (fs.existsSync(prefixCommandsFoldersPath)) {
	// define the folder to prefix commands
	const prefixCommandsFolders = fs.readdirSync(prefixCommandsFoldersPath);

	// get every file as a prefix command
	for (const folder of prefixCommandsFolders) {
		// get the folder as a path (prefixCommandsPath)
		const prefixCommandsPath = path.join(prefixCommandsFoldersPath, folder);
		if (!fs.lstatSync(prefixCommandsPath).isDirectory()) continue;

		// get every file as a command
		const prefixCommandsFiles = fs.readdirSync(prefixCommandsPath).filter(file => file.endsWith('.js'));
		// get the command from a file
		for (const file of prefixCommandsFiles) {
			const prefixCommandsFilePath = path.join(prefixCommandsPath, file);
			const command = require(prefixCommandsFilePath);
			if ('name' in command && 'execute' in command) {
				client.prefixCommands.set(command.name, command);
			} else {
				// log error
				console.log(`[🔴] Comando em: [${prefixCommandsFilePath}] está com os dados: "name" ou "execute" em falta! [🔴]`);
			};
		};
	};
};

// new client events instance (BOT)
client.events = new Discord.Collection();
// "events" is the main folder to all the events
const eventsFolder = path.join(__dirname, 'events');

// (eventsPath) defines the folder as a path to an events
const eventsPath = path.join(eventsFolder);

// read every folder inside events
const eventFolders = fs.readdirSync(eventsPath);

// get all subfolders
for (const folder of eventFolders) {
	const folderPath = path.join(eventsPath, folder);

	// check if have another folder
	if (!fs.lstatSync(folderPath).isDirectory()) continue;

	// (eventsFiles) defines each file to be an event (.js file)
	const eventsFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

	for (const file of eventsFiles) {
		// (filePath) defining the path of each event file
		const filePath = path.join(folderPath, file);
		// (event) defining each event
		const event = require(filePath);

		// active event
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		};
	};
};

// login with bot data/info
client.login(Token.token);