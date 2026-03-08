const fs = require("fs");

// function to load and return all json file data
function loadUser(path, defaultData = {}) {
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

module.exports = { loadUser };