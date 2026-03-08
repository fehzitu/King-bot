const fs = require("fs");

// queue system, previne crash
const writeQueue = new Map();

// function to load and return all json file data
function loadJSON(path, defaultData = {}) {
    // try to create file if dont exist
    try {
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify(defaultData, null, 2));
            return defaultData;
        };

        // get the file data and return
        const rawData = fs.readFileSync(path, "utf8");
        return JSON.parse(rawData);

        // catch error and return the original data
    } catch (err) {
        console.error("Erro ao carregar JSON:", err);
        return defaultData;
    };
};

// function to create a json file
function saveJSON(path, data) {
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

module.exports = {
    loadJSON,
    saveJSON
};