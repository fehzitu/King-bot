require('dotenv').config();

module.exports = {
    // bot core
    token: process.env.TOKEN,
    prefix: process.env.PREFIX || "k.",

    // environment
    isDev: process.env.NODE_ENV === "development",

    // database
    database: {
        usersPath: process.env.USERS_PATH || "./src/database/users.json"
    },

    // discord settings
    discord: {
        intents: [
            "GUILDS",
            "GUILD_MESSAGES",
            "GUILD_MEMBERS"
        ]
    }
};