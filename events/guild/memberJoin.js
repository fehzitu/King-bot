// discord implements
const Discord = require('discord.js');

module.exports = {
	// "name" will receive the value that will be the chat message that the bot captures as a command
	name: 'guildMemberAdd',
	async execute(ctx) {
		// get a channel to send the embed
		const channel = ctx.guild.systemChannel;

		// log if dont have a channel to send the embed
		if (!channel) {
			return console.log('🔴 Canal não encontrado!');
		};

		// create an embed
		const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('👥 **Novo membro!**')
		.setDescription(`📡 Salve **${ctx}**, tudo bom?`)
		.addFields([{
			name: `🛡 Tag:\n${ctx.user.tag}`,
			value: `👥 **Id:\n${ctx.id}**`
		}])
		.setThumbnail(ctx.user.displayAvatarURL())
		.setTimestamp()
		.setFooter({
			text: 'Atualizado'
		});

		// response
		channel.send({
			embeds: [embed]
		});
	}
};