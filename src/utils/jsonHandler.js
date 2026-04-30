const fs = require("fs");

// control file on a queue
const writeQueue = new Map();

// load json
function loadJson(filePath, defaultData = {}) {
    try {
        // create file if dont exist
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(
                filePath,
                JSON.stringify(defaultData, null, 4)
            );
            return defaultData;
        };

        const raw = fs.readFileSync(filePath, "utf8");

        return JSON.parse(raw);

    } catch (err) {
        console.error(`[JSON] Erro ao carregar: ${filePath}`, err);

        // try resolve file
        try {
            fs.writeFileSync(
                filePath,
                JSON.stringify(defaultData, null, 4)
            );
        } catch (writeErr) {
            console.error(`[JSON] Erro ao recriar: ${filePath}`, writeErr);
        };

        return defaultData;
    }
};

// secure save json
function saveJson(filePath, data) {
    const json = JSON.stringify(data, null, 4);
    const tempPath = filePath + ".tmp";

    const previous = writeQueue.get(filePath) || Promise.resolve();

    const next = previous
        .then(async () => {
            // atomic write
            await fs.promises.writeFile(tempPath, json);
            await fs.promises.rename(tempPath, filePath);
        })
        .catch(err => {
            console.error(`[JSON] Erro ao salvar: ${filePath}`, err);
        });

    writeQueue.set(filePath, next);

    next.finally(() => {
        if (writeQueue.get(filePath) === next) {
            writeQueue.delete(filePath);
        };
    });

    return next;
};

module.exports = {
    loadJson,
    saveJson
};