// discord implements
const Discord = require('discord.js');

module.exports = {
	name: 'tapa',
	async execute(message) {
		if (message.author.bot) return;

		const content = message.content.toLowerCase().split(' ');
		const firstMentionedUser = message.mentions.users.first();

		// function to get the api img
		const getImg = async (endpoint) => {
			try {
				const res = await fetch(`https://api.waifu.pics/sfw/${endpoint}`);
				const data = await res.json();

				return data.url;

			} catch (err) {
				console.error('Erro na API:', err);

				// fallback image if api fails
				return 'https://cdn.discordapp.com/attachments/1477290272638632068/1481950786308018187/people-question.gif?ex=69b52db8&is=69b3dc38&hm=a965b4c0c6a1fc8b4f518eb8b5b04ded9f631e8cf099eb609758e53142834555&';
			};
		};

		const errorEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setAuthor({
			iconURL: message.author.displayAvatarURL(),
			name: `@${message.author.username}`
		})
		.addFields([{
			name: '🔴 **Uso incorreto do comando**!',
			value: '(Faltou alguma marcação ou mais de 1 usuário foi marcado!)'
		},
			{
				name: '🟢 **Uso correto**:',
				value: 'k.tapa @[usuário]'
			}])
		.setTimestamp()
		.setFooter({
			text: 'Atualizado'
		});

		const successEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setAuthor({
			iconURL: message.author.displayAvatarURL(),
			name: `@${message.author.username}`
		})
		.setTimestamp()
		.setFooter({
			text: 'Atualizado'
		});

		let img;

		// check correct usage
		if (content.length === 2 && firstMentionedUser && message.mentions.users.size === 1) {

			if (message.author.id === firstMentionedUser.id) {

				// get the image
				img = await getImg('cringe');

				successEmbed.setDescription(
					`🤔 **<@${message.author.id}> se odeia ao ponto de se bater**❓`
				);
			} else {
				// get the image
				img = await getImg('slap');

				successEmbed.setDescription(
					`😡 **<@${message.author.id}> deu um tapa em <@${firstMentionedUser.id}>**❗`
				);
			};

			// set the image
			successEmbed.setImage(img);

			return message.reply({
				embeds: [successEmbed]
			});
		};

		return message.reply({
			embeds: [errorEmbed]
		});
	}
};