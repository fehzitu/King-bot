// func to check if karma is positive or negative
function setKarma(user) {
    if (user.karma.positive == user.karma.negative) return user.rpg.karma = '🤍';
    if (user.karma.positive > user.karma.negative) return user.rpg.karma = '❤️';
    if (user.karma.positive < user.karma.negative) return user.rpg.karma = '🖤';
};

module.exports = {
    setKarma
};