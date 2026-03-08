const fs = require("fs");

// queue system, previne crash
const writeQueue = new Map();

// function to create a json file
function saveUser(path, data) {
    // format data to simple string
    const json = JSON.stringify(data, null, 2);

    // resolve queue
    const previous = writeQueue.get(path) || Promise.resolve();

    // wait finish and perform next
    const next = previous.then(() => {
        return fs.promises.writeFile(path, json);
    });

    // "continue" queue
    writeQueue.set(path, next);

    // finish
    return next;
};

module.exports = { saveUser };