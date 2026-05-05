const constants = require('../../config/constants.js');
const checkCooldown = require('../../utils/cooldown');
const createEmbed = require('../../utils/embed');
const log = require('../../utils/logger.js');

// safe execution
async function safeExecute(handler, interaction) {
    try {
        return await handler.execute(interaction);
    } catch (error) {
        log('ERROR', `Erro na interação: ${error.message}`);

        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: 'Erro ao executar interação',
                ephemeral: true
            });
        };
    }
};

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        const userTag = interaction.user.tag;

        // buttons
        if (interaction.isButton()) {
            const id = interaction.customId.split(':')[0];
            const button = client.interactions.get(id);

            if (!button) {
                log('WARNING', `Botão não encontrado: ${interaction.customId}`);
                return;
            };

            log('RESET', `Botão: ${id} usado por ${userTag}`);

            return safeExecute(button, interaction);
        };

        // select menus
        if (interaction.isSelectMenu()) {
            const id = interaction.customId.split(':')[0];
            const select = client.interactions.get(id);

            if (!select) {
                log('WARNING', `Seletor não encontrado: ${interaction.customId}`);
                return;
            };

            log('RESET', `Seletor: ${id} usado por ${userTag}`);

            return safeExecute(select, interaction);
        };

        // modals
        if (interaction.isModalSubmit()) {
            const id = interaction.customId.split(':')[0];
            const modal = client.interactions.get(id);

            if (!modal) {
                log('WARNING', `Modal não encontrado: ${interaction.customId}`);
                return;
            };

            log('RESET', `Modal: ${id} usado por ${userTag}`);

            return safeExecute(modal, interaction);
        };

        // slash commands
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            log('ERROR', `Comando não encontrado: ${interaction.commandName}`);
            return;
        };
        
        // cooldown
        const userId = interaction.user.id;
        const remaining = checkCooldown(userId, constants.COOLDOWNS.COMMAND);
        
        if (remaining > 0) {
            const seconds = (remaining / 1000).toFixed(1);
        
            const embed = createEmbed({ user: interaction.user });
        
            embed.setDescription(`⏳ Sem spam!\nEspere **${seconds}s** para usar novamente.`);
        
            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        };

        const guild = interaction.guild ? interaction.guild.name : 'DM';
        const channel = interaction.guild ? interaction.channel.name : 'DM';

        log(
            'RESET',
            `[${new Date().toLocaleDateString()}] [${new Date().toLocaleTimeString()}] [@${userTag}] [${guild}] [${channel}]: /${interaction.commandName}`
        );

        try {
            log('WARNING', `Comando /${interaction.commandName} usado por ${userTag}`);
            await command.execute(interaction);
        } catch (error) {
            log('ERROR', `Erro no comando (${interaction.commandName}): ${error.message}`);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'Erro ao executar comando.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: 'Erro ao executar comando.',
                    ephemeral: true
                });
            };
        };
    }
};