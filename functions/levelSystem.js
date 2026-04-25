// Default profile user
const defaultUser = {
    profileCreatedAt: new Date().toISOString(),
    rpg: {
        level: 1,
        xp: 0,
        karma: '🤍',
        money: 100,
        medals: []
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
    // linear xp up
    return Math.floor(100 * Math.pow(level + 1, 1.5));
    /*
        1 = 25 XP
        2 = 25 × (2¹·⁵ ≈ 2.82) 70 XP
        3 = 25 × (3¹·⁵ ≈ 5.19) 129 XP
        5 = 25 × (5¹·⁵ ≈ 11.18) 279 XP
        10 = 25 × (10¹·⁵ ≈ 31.62) 790 XP
        20 = 25 × (20¹·⁵ ≈ 89.44) 2236 XP
    */
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