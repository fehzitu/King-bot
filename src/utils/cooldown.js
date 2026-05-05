// cooldown
const cooldowns = new Map();

module.exports = function checkCooldown(userId, cooldownTime) {
    const now = Date.now();

    if (!cooldowns.has(userId)) {
        cooldowns.set(userId, now);
        return 0;
    };

    const lastUse = cooldowns.get(userId);
    const remaining = cooldownTime - (now - lastUse);

    if (remaining > 0) {
        return remaining;
    };

    cooldowns.set(userId, now);
    return 0;
};