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
				// timer controller
				const controller = new AbortController();
				// 3 timeout
				const timeout = setTimeout(() => controller.abort(), 3000);

				const res = await fetch(`https://api.waifu.pics/sfw/${endpoint}`, {
					signal: controller.signal
				});

				clearTimeout(timeout);

				const data = await res.json();

				return data.url;
			} catch (err) {
				console.error('Erro na API:', err);

				// fallback image if api fails
				return 'https://cdn.discordapp.com/attachments/1477290272638632068/1488963005625663630/broken-image.png?ex=69ceb05c&is=69cd5edc&hm=42b8b9f7d66fc4746487d72ef0ea845bf5e9e2f662937d336752a7635855f09d';
			}
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