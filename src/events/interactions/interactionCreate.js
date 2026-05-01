const constants = require('../../config/constants');

// log
function log(type, message) {
    const colors = constants.LOG_COLORS || {};
    const emojis = constants.EMOJIS || {};

    const key = type.toUpperCase();

    const color = colors[key] || '';
    const reset = colors.RESET || '\x1b[0m';
    const emoji = emojis[key] || '⚪';

    console.log(`${color}[${emoji}] ${message}${reset}`);
}

// safe execution
async function safeExecute(handler, interaction) {
    try {
        return await handler.execute(interaction);
    } catch (error) {
        log('ERROR', `Error in interaction: ${error.message}`);

        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: 'Error while executing interaction.',
                ephemeral: true
            });
        }
    }
}

module.exports = {
    name: 'interactionCreate',

    async execute(client, interaction) {
        const userTag = interaction.user.tag;

        // buttons
        if (interaction.isButton()) {
            const id = interaction.customId.split(':')[0];
            const button = client.interactions.get(id);

            if (!button) {
                log('WARNING', `Button not found: ${interaction.customId}`);
                return;
            }

            log('INFO', `Button: ${id} used by ${userTag}`);

            return safeExecute(button, interaction);
        }

        // select menus
        if (interaction.isSelectMenu()) {
            const id = interaction.customId.split(':')[0];
            const select = client.interactions.get(id);

            if (!select) {
                log('WARNING', `Select not found: ${interaction.customId}`);
                return;
            }

            log('INFO', `Select: ${id} used by ${userTag}`);

            return safeExecute(select, interaction);
        }

        // modals
        if (interaction.isModalSubmit()) {
            const id = interaction.customId.split(':')[0];
            const modal = client.interactions.get(id);

            if (!modal) {
                log('WARNING', `Modal not found: ${interaction.customId}`);
                return;
            }

            log('INFO', `Modal: ${id} submitted by ${userTag}`);

            return safeExecute(modal, interaction);
        }

        // slash commands
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            log('ERROR', `Command not found: ${interaction.commandName}`);
            return;
        }

        const guild = interaction.guild ? interaction.guild.name : 'DM';
        const channel = interaction.guild ? interaction.channel.name : 'DM';

        log(
            'INFO',
            `/${interaction.commandName} by ${userTag} in ${guild} #${channel}`
        );

        try {
            await command.execute(interaction);
        } catch (error) {
            log('ERROR', `Command error (${interaction.commandName}): ${error.message}`);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'Error while executing command.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: 'Error while executing command.',
                    ephemeral: true
                });
            }
        }
    }
};