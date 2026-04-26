// func to check if karma is positive or negative
function setKarma(user) {
    if (user.karma.positive == user.karma.negative && user.karma.positive > 10 && user.karma.negative > 10) return user.rpg.karma = '🤍 Neutro';
    if (user.karma.positive > user.karma.negative && user.karma.positive > 25) return user.rpg.karma = '👼 Santo';
    if (user.karma.positive < user.karma.negative && user.karma.negative > 25) return user.rpg.karma = '👹 Demoníaco';
};

module.exports = {
    setKarma
};