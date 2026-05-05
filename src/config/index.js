require('dotenv').config();

module.exports = {
    // bot core
    token: process.env.TOKEN,
    prefix: process.env.BOT_PREFIX || "!",

    // environment
    isDev: process.env.NODE_ENV === "development",

    // database
    database: {
        usersPath: process.env.USERS_PATH || "./users.json"
    },

    // discord settings
    discord: {
        intents: [
            "GUILDS",
            "GUILD_MESSAGES",
            "MESSAGE_CONTENT"
        ]
    }
};