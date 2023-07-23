require("dotenv").config();

const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const CronJob = require("cron").CronJob;
const fs = require("fs");
const Jimp = require("jimp");

const postToInsta = async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  // read the uris.json file and randomly choose an image
  const uris = JSON.parse(fs.readFileSync("uris.json", "utf8"));
  const randomIndex = Math.floor(Math.random() * uris.length);
  const uri = uris[randomIndex];

  const imageBuffer = await get({
    url: uri,
    encoding: null,
  });

  // convert the image to an acceptable format using Jimp
  const jimpImage = await Jimp.read(imageBuffer);
  const jpegBuffer = await jimpImage.getBufferAsync(Jimp.MIME_JPEG);

  await ig.publish.photo({
    file: jpegBuffer,
    caption: "#GIDLE #여자아이들",
  });
};

// postToInsta();

const cronInsta = new CronJob("0 */6 * * *", async () => {
    postToInsta();
});
cronInsta.start();