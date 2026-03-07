// function to get user from a json file
function getUser(users, id) {
	// check the user on user list to create if dont have
    if (!users[id]) {
        users[id] = {
            money: 0,
            xp: 0,
            level: 1
        };
    };
    
    // rerurn the result
    return users[id];
};

module.exports = getUser;