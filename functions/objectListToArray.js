function objectListToArray(obj) {
    // return an array with all the object key as a array item
    const users = Object.entries(obj).map(([id, user]) => ({id,...user}));
    
    return users;
};

module.exports = { objectListToArray };