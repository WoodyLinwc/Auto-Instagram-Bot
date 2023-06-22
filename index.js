require("dotenv").config();

const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const CronJob = require("cron").CronJob;
const fs = require("fs");

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
const postToInsta = async () => {
  const ig = new IgApiClient();
  const sharp = require('sharp');
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  
  // read the uris.json file and randomly choose a image
  const uris = JSON.parse(fs.readFileSync("uris.json", "utf8"));
  const randomIndex = Math.floor(Math.random() * uris.length);
  const uri = uris[randomIndex];

  const imageBuffer = await get({
      url: uri,
      encoding: null, 
  });

  // convert the image to acceptable format
  const jpegBuffer = await sharp(imageBuffer).jpeg().toBuffer();

  await ig.publish.photo({
      file: jpegBuffer,
      caption: "#GIDLE #여자아이들",
  });
};

postToInsta();

// const cronInsta = new CronJob("* */4 * * *", async () => {
//     postToInsta();
// });

// cronInsta.start();