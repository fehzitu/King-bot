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
            if (stat.isDirectory()) {
                loadPages(fullPath);
            } else if (file.endsWith('.js')) {
                const page = require(fullPath);
            
                if (page.name && typeof page.execute === 'function') {
                    pages[page.name] = page;
                };
            };
        };
    }
};

// load everything
loadPages(pagesPath);

module.exports = {
    name: 'menu',
    async execute(interaction) {
        const [category, type, pageName, userId] = interaction.customId.split(':');

        // security
        if (interaction.user.id !== userId) {
            return interaction.reply({
                content: 'Isso não é pra você.',
                ephemeral: true
            });
        };

        // get the page
        const page = pages[pageName];
        if (!page) return;

        // execute the page
        const { embed, components } = page.execute(interaction);

        // load messagem
        return interaction.update({
            embeds: [embed],
            components
        });
    }
};