// function to get the api img
async function getImg(endpoint) {
    try {
        // timer controller
        const controller = new AbortController();
        // 3 seconds timeout
        const timeout = setTimeout(() => controller.abort(), 3000);

        // get all the api data
        const endpImg = await fetch(`https://api.waifu.pics/sfw/${endpoint}`, {
            signal: controller.signal
        });
        const data = await endpImg.json();

        // stop the timer
        clearTimeout(timeout);

        // return the image link
        return data.url;
    } catch (error) {
        // fallback error img
        return 'https://cdn.discordapp.com/attachments/1477290272638632068/1488963005625663630/broken-image.png?ex=69ceb05c&is=69cd5edc&hm=42b8b9f7d66fc4746487d72ef0ea845bf5e9e2f662937d336752a7635855f09d';
    };
};

module.exports = { getImg };