const { safeTerminal } = require("../utilities/terminal");
const { lightImageDetail } = require("../utilities/lightImageDetail");

exports.fetch = async (req, res) => {
  const images = await safeTerminal.formattedImages();
  const imagesArray = images
    .split("\n")
    .filter((image) => image !== "")
    .map((image) => JSON.parse(image));
  res.json(imagesArray);
};

exports.command = async (req, res, next) => {
  const imageID = req.query.image;
  const command = req.query.command;
  try {
    const cmdData = await safeTerminal.singleImage(command, imageID);
    res.json(cmdData.replace("\n", ""));
  } catch (error) {
    next(error);
  }
};

exports.pull = async (req, res) => {
  try {
    const images = await safeTerminal.pull(req.query.name);
    res.json(images.replace("\n", ""));
  } catch (error) {
    console.log(error)
  }

  // const imagesArray = images
  //   .split("\n")
  //   .filter((image) => image !== "")
  //   .map((image) => JSON.parse(image));
  // res.json(imagesArray);
};
