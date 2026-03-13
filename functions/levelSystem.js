// calculate XP needed for next level
function getXpNeeded(level, multiplier) {
    return Math.floor(25 * Math.pow(1 + multiplier, level));
};

// check and apply level ups
function checkLevelUp(profile) {
    let leveledUp = false;
    let xpNeeded = getXpNeeded(
        profile.rpg.level,
        profile.rpg.multiplier
    );

    // allow multiple level ups if enough XP
    while (profile.rpg.xp >= xpNeeded) {
        profile.rpg.xp -= xpNeeded;
        profile.rpg.level++;
        leveledUp = true;
        xpNeeded = getXpNeeded(
            profile.rpg.level,
            profile.rpg.multiplier
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
    getXpNeeded,
    checkLevelUp
};