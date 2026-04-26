// func to check if karma is positive or negative
function checkKarma(user) {
    if (user.karma.positive == user.karma.negative) {
        return '🤍';
    };
    return user.karma.positive > user.karma.negative ? '❤️' : '🖤';
};

module.exports = {
    checkKarma
};