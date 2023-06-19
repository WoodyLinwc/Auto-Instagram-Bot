require("dotenv").config();

const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const CronJob = require("cron").CronJob;

// const postToInsta = async () => {
//     const ig = new IgApiClient();
//     ig.state.generateDevice(process.env.IG_USERNAME);
//     await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

//     const imageBuffer = await get({
//         url: 'https://i.imgur.com/BZBHsauh.jpg',
//         encoding: null, 
//     });

//     await ig.publish.photo({
//         file: imageBuffer,
//         caption: 'Really nice photo from the internet!',
//     });
// }
const fs2 = require('fs');
const postToInsta = async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  // Read the uris.json file and parse its content
  const uris = JSON.parse(fs2.readFileSync('uris.json', 'utf8'));

  // Randomly select a link from the uris array
  const randomIndex = Math.floor(Math.random() * uris.length);
  const randomUri = uris[randomIndex];

  const imageBuffer = await get({
      url: randomUri,
      encoding: null, 
  });

  await ig.publish.photo({
      file: imageBuffer,
      caption: 'Really nice photo from the internet!',
  });
};


postToInsta();

// const cronInsta = new CronJob("30 5 * * *", async () => {
//     postToInsta();
// });

// cronInsta.start();