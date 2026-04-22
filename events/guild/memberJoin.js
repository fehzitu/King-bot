// discord implements
const Discord = require('discord.js');

module.exports = {
	// "name" will receive the value that will be the chat message that the bot captures as a command
	name: 'guildMemberAdd',
	async execute(member) {
		// get a channel to send the embed
		const channel = member.guild.systemChannel;

		// log if dont have a channel to send the embed
		if (!channel) {
			return console.log('🔴 Canal não encontrado!');
		};

		// create an embed
		const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('👥 **Novo membro!**')
		.setDescription(`📡 Salve **${member}**, tudo bom?`)
		.addFields([{
			name: `🛡 Tag:\n${member.user.tag}`,
			value: `👥 **Id:\n${member.id}**`
		}])
		.setThumbnail(member.user.displayAvatarURL())
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