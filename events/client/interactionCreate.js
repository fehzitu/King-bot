const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');

// database json file
const filePath = path.join(__dirname, '../../users.json');

// importing custom functions
const {
	saveJson
} = require(path.join(__dirname, '../../functions/saveJson.js'));
const {
	checkLevelUp
} = require('../../functions/levelSystem.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		// check if the interaction is a slash command
		if (!interaction.isCommand()) return;

		// get the command
		const command = interaction.client.slashCommands.get(interaction.commandName);

		if (!command) {
			console.error(`[🔴] Command not found: "${interaction.commandName}"`);
			return;
		};

		// get user id and tag
		const userId = interaction.user.id;
		const userTag = interaction.user.tag;

		// load users database
		const users = interaction.client.usersData;

		// create profile if not exists
		if (!users[userId]) {
			users[userId] = {
				profileCreatedAt: new Date().toISOString(),
				rpg: {
					money: 100,
					level: 0,
					xp: 0,
					multiplier: 1.25
				},
				stats: {
					messages: 0,
					commands: 0
				},
				cooldowns: {
					xp: 0
				}
			};

			await saveJson(filePath, users);

			console.log(`🏆 New profile created for ${userTag}`);
		};

		// get profile
		const profile = users[userId];

		// increase command counter
		profile.stats.commands++;

		// log command execution
		const guildName = interaction.guild ? interaction.guild.name: "DM";
		const channelName = interaction.guild ? interaction.channel.name: "DM";

		console.log(
			`[${new Date().toLocaleTimeString()}] @${userTag} ${guildName} ${channelName}: /${command.data.name}`
		);

		try {
			// execute command
			await command.execute(interaction);

			// xp will be added to the user
			const xpGain = 15;
			
			// add xp
			profile.rpg.xp += xpGain;

			const result = checkLevelUp(profile);

			// level up message
			if (result.leveledUp) {

				const levelMsg = `🎉 **${interaction.user}** reached **level ${result.level}**!`;

				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: levelMsg
					});
				} else {
					await interaction.reply({
						content: levelMsg
					});
				};
			};
		} catch (error) {
			console.error(error);

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: '[🔴] Command execution error [🔴]',
					ephemeral: true
				});
			} else {
				await interaction.reply({
					content: '[🔴] Command execution error [🔴]',
					ephemeral: true
				});
			};
		};
	}
};