const fs = require('fs');
const path = require('path');

// load all pages
const pages = {};
const pagesPath = path.join(__dirname, '../pages/menu');

const files = fs.readdirSync(pagesPath);

for (const file of files) {
    const page = require(path.join(__dirname, `../pages/menu/${file}`));
    pages[page.name] = page;
};

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
        const { embed, components } = page.execute(interaction.user);

        // load messagem
        return interaction.update({
            embeds: [embed],
            components
        });
    }
};