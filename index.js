require("dotenv").config();

const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const CronJob = require("cron").CronJob;

const postToInsta = async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    const imageBuffer = await get({
        url: 'https://i.imgur.com/uLTHuSK.png',
        encoding: null, 
    });

    await ig.publish.photo({
        file: imageBuffer,
        caption: '(G)-IDLE in my area',
    });
}

postToInsta();

// const cronInsta = new CronJob("30 * * * * *", async () => {
//     postToInsta();
// });

// cronInsta.start();