const fs = require('fs');
const path = require('path');

// load all pages
const pages = {};
const pagesPath = path.join(__dirname, '../pages');

// recursive function
function loadPages(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // access subfolders
            loadPages(fullPath);
        } else {
            if (!file.endsWith('.js')) continue;

            const page = require(fullPath);

            if (typeof page.execute === 'function') {
                // generate key based on path
                const relative = fullPath
                    .replace(pagesPath, '')
                    .replace(/\\/g, '/')
                    .replace('.js', '');

                const key = relative
                    .split('/')
                    .filter(Boolean)
                    .join(':');

                pages[key] = page;
            };
        };
    }
};

// load everything
loadPages(pagesPath);

module.exports = {
    name: 'page',
    async execute(interaction) {
        // pages system:<folder>:<file>:<user id>:value
        const [system, category, pageName, userId] = interaction.customId.split(':');

        // security
        if (interaction.user.id !== userId) {
            return interaction.reply({
                content: 'Isso não é pra você.',
                ephemeral: true
            });
        };

        // get the page
        const key = `${category}:${pageName}`;
        const page = pages[key];
        if (!page) return;

        // interaction ack
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferUpdate();
        };

        // execute the page
        const { embed, components } = page.execute(interaction);

        // load messagem
        return interaction.message.edit({
            embeds: [embed],
            components
        });
    }
};