// discord implements
const Discord = require('discord.js');

// node file system
const path = require('path');

// importing custom fallback
const { brokenImage } = require(path.join(__dirname, '../../../interaction/itens/fallbacks.js'));

// importing custom functions
const { getImg } = require(path.join(__dirname, '../../../functions/waifuApi.js'));

module.exports = {
    name: 'morder',
    async execute(message) {
        if (message.author.bot) return;

        // anti-spam (3s)
        if (!message.client.cooldowns) message.client.cooldowns = new Set();
        if (message.client.cooldowns.has(message.author.id)) return;

        message.client.cooldowns.add(message.author.id);
        setTimeout(() => message.client.cooldowns.delete(message.author.id), 3000);

        // target user
        const user = message.mentions.users.first() || message.author;
        const isSelf = message.author.id === user.id;

        // endpoint
        const endpoint = isSelf ? 'cringe' : 'bite';

        // base embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({ iconURL: user.displayAvatarURL(), name: `@${user.username}` })
            .setDescription(
                isSelf
                    ? `🤔 **<@${user.id}> quer se morder**❓`
                    : `😡 **<@${message.author.id}> mordeu <@${user.id}>**❗`
            )
            .setTimestamp()
            .setFooter({ text: 'Atualizado' });

        // create button only if not self-bite
        let row = null;
        if (!isSelf) {
            const button = new Discord.MessageButton()
                .setCustomId(`biteBack:${user.id}`)
                .setLabel('Morder de volta❓')
                .setStyle('PRIMARY');

            row = new Discord.MessageActionRow().addComponents(button);
        };

        // temporary waiting embed
        const waitingEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription('⏳ Pensando...')
            .setTimestamp()
            .setFooter({ text: 'Atualizado' });

        // send temporary message
        const msg = await message.reply({ embeds: [waitingEmbed] });

        // get image
        let img = await getImg(endpoint);
        if (!img || typeof img !== 'string') img = brokenImage;

        embed.setImage(img);

        // edit final message with button
        await msg.edit({
            embeds: [embed],
            components: row ? [row] : []
        });
    }
};