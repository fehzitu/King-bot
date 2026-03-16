const fs = require("fs");

// function to load and return json file data
function loadJson(path, defaultData = {}) {
    try {
        // check if file exists, if not create it with default data
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify(defaultData, null, 2));
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
            fs.writeFileSync(path, JSON.stringify(defaultData, null, 2));
        } catch (writeErr) {
            console.error("Error rewriting JSON file:", writeErr);
        };

        // return default data
        return defaultData;
    }
};

module.exports = { loadJson };