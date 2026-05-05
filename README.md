## 👑 Killua Bot

> Official bot of the **Drakay** Discord server.  
> Built to apply and improve JavaScript skills using Node.js and Discord.js.

## 📌 About The Project

Killua Bot is a fully custom Discord bot developed from scratch for the **Drakay** server.

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

- [ ] Automatic logs
- [ ] Persistent log
- [ ] Basic command handler
- [ ] Event handler system
- [ ] Slash commands
- [ ] Prefix commands
- [ ] Fun commands
- [ ] Leveling system
- [ ] Economy system
- [ ] Moderation system
- [ ] Database integration (future)

## 📂 Project Structure
```shell
📦 killua
┣ 📜 package.json (everything we use here)
┣ 📜 .env (your env)
┣ 📜 .env.example (how you will use .env)
┣ 📜 users.json (users db)
┗ 📂 src
  ┣ 📜 index.js (bot main core and login)
  ┣ 📂 config
  ┃ ┗ 📜 this files configure our bot
  ┣ 📂 deploy
  ┃ ┗ 📜 deploy-commands.js (deploy all commands)
  ┣ 📂 utils
  ┃ ┗ 📜 files to create UI, sys logic, helpers and other
  ┣ 📂 commands
  ┃ ┗ 📜 every .js file here is a command
  ┣ 📂 interactions
  ┃ ┗ 📂 buttons
  ┃   ┗ 📜 every button of the system here
  ┗ 📂 events
    ┣ 📂 client
    ┃ ┗ 📜 client events
    ┣ 📂 messages
    ┃ ┗ 📜 messages handler
    ┣ 📂 interactions
    ┃ ┗ 📜 interactions handler
    ┗ 📂 guild
      ┗ 📜 guild events
```

Structured in a modular way to ensure scalability and easy maintenance.

## 📜 Command Structure
```js
// imports

module.exports = {
    data: ...,   // slash command data
    name: ...,   // prefix command name

    async execute(ctx, args) {
        // detect command type
        // command logic
        // reply interaction
    }
};
```

## ⚙️ How To Run The Project

```shell
1️⃣ Clone the repository:
- git clone [repo link]

2️⃣ Install dependencies:
- npm install

3️⃣ Configure your bot token and id on .env:
TOKEN=token_here
CLIENT_ID=bot_id_here
PREFIX=prefix_here

4️⃣ Start the bot:
- npm run start
- npm run dev (auto reload)
```

## 🎯 Project Purpose
``Killua Bot represents``:
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

## 👨💻 Developer

### ``fehzitu`` 💚
Developer focused on continuous growth and real-world experience