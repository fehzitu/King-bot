## 👑 King Bot

> Official bot of the **Drakay** Discord server.  
> Built to apply and improve JavaScript skills using Node.js and Discord.js.

## 📌 About The Project

King Bot is a fully custom Discord bot developed from scratch for the **Drakay** server.

The main goals of this project are:

- Practice real-world JavaScript
- Improve backend logic and architecture
- Learn event-driven systems
- Build scalable command handlers
- Structure projects professionally
- Experiment and evolve as a developer

This project focuses not only on features, but also on code quality, structure, and long-term scalability.

## 🚀 Technologies Used

- Node.js  
- Npm  
- Discord.js  
- Modular command & event architecture  

## 🧠 Current / Planned Features

- [x] Basic command handler
- [x] Event handler system
- [x] Slash commands
- [x] Prefix commands
- [x] Fun commands
- [x] Automatic logs
- [x] Leveling system
- [x] Economy system
- [ ] Persistent log
- [ ] Moderation system
- [ ] Database integration (future)

## 📂 Project Structure
```shell
📦 king-bot
┣ 📂 commands
┃ ┣ 📂 slashCommands (/ commands here)
┃ ┗ 📂 prefixCommands (prefix commands here)
┣ 📂 functions (some functions here)
┣ 📂 interaction
┃ ┣ 📂 buttons (buttons here)
┃ ┣ 📂 pages (pages to menus here)
┃ ┗ 📂 itens (some custom emoji/imgs here)
┣ 📂 events
┃ ┣ 📂 client
┃ ┃ ┣ 📜 interactionCreate.js
┃ ┃ ┣ 📜 messageCreate.js
┃ ┃ ┗ 📜 ready.js
┃ ┗ 📂 guild (guild events like "member join")
┣ 📜 users.json (all users profile data, will be created automatically)
┣ 📜 deploy-commands.js
┣ 📜 index.js
┣ 📜 config.json (bot token & id)
┗ 📜 package.json
```

Structured in a modular way to ensure scalability and easy maintenance.

## ⚙️ How To Run The Project

```js
1️⃣ Clone the repository:
- git clone [repo link]

2️⃣ Install dependencies:
- npm install

3️⃣ Configure your bot token in config.json:
{
    "clientId": "CLIENT ID",
    "token": "TOKEN ID"
}

4️⃣ Start the bot:
- npm start
```

## 🎯 Project Purpose
``King Bot represents``:
- **Practical JavaScript experience**
- **Clean architecture learning**
- **Real Discord API interaction**
- **A foundation for more advanced projects**
- **Continuous improvement as a developer**

## 🏗️ Future Plans
- **Web dashboard**
- **API integrations**
- **Structured database system**
- **Advanced community tools**
- **Production-ready deployment**

## 💭 To do:
- [ ] Finish profile system
- [ ] Finish karma system
- [ ] Finish some details on commands
- [ ] Add some menus with buttons and routes
- [ ] Add some components like: dropdown menus, buttons, links, etc.
- [ ] Refactor all base commands to add buttons and menus

## 👨‍💻 Developer

### ``fehzitu`` 💚
Developer focused on continuous growth and real-world experience
