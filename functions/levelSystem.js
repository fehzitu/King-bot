// Default profile user
const defaultUser = {
    profileCreatedAt: new Date().toISOString(),
    rpg: {
        money: 100,
        level: 0,
        xp: 0
    },
    stats: {
        messages: 0,
        commands: 0
    },
    cooldowns: {
        xp: 0
    }
};

// calculate XP needed for next level
function getXpNeeded(level) {
    return level * 50;
};

// check and apply level ups
function checkLevelUp(profile) {
    let leveledUp = false;
    let xpNeeded = getXpNeeded(
        profile.rpg.level
    );

    // allow multiple level ups if enough XP
    while (profile.rpg.xp >= xpNeeded) {
        profile.rpg.xp -= xpNeeded;
        profile.rpg.level++;
        leveledUp = true;
        xpNeeded = getXpNeeded(
            profile.rpg.level
        );
    };

    return {
        leveledUp,
        level: profile.rpg.level,
        xp: profile.rpg.xp,
        xpNeeded
    };
};

module.exports = {
    defaultUser,
    getXpNeeded,
    checkLevelUp
};