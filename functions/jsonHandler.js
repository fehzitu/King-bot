// node imports
const fs = require("fs");

// queue system, prevents multiple writes at the same time
const writeQueue = new Map();

// function to load and return json file data
function loadJson(path, defaultData = {}) {
    try {
        // check if file exists, if not create it with default data
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify(defaultData, null, 4));
            return defaultData;
        };

        // read file content
        const rawData = fs.readFileSync(path, "utf8");

        // convert json string to object and return
        return JSON.parse(rawData);

    } catch (err) {
        // log error
        console.error("Error loading JSON:", err);

        // rewrite file with default data if corrupted
        try {
            fs.writeFileSync(path, JSON.stringify(defaultData, null, 4));
        } catch (writeErr) {
            console.error("Error rewriting JSON file:", writeErr);
        };

        // return default data
        return defaultData;
    }
};

// function to safely save json data
function saveJson(path, data) {
    // convert object to formatted json string
    const json = JSON.stringify(data, null, 4);

    // get previous write promise for this path (or empty promise)
    const previous = writeQueue.get(path) || Promise.resolve();

    // wait previous write finish before writing again
    const next = previous
        .then(() => fs.promises.writeFile(path, json))
        .catch(console.error); // catch possible errors

    // store the new promise in the queue
    writeQueue.set(path, next);

    // after finishing, remove from queue if still the same promise
    next.finally(() => {
        if (writeQueue.get(path) === next) {
            writeQueue.delete(path);
        }
    });

    // return promise so other parts can await if needed
    return next;
};

module.exports = { loadJson, saveJson };