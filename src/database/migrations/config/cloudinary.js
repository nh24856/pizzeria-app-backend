const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dhoew2axt",
  api_key: "729177997934669",
  api_secret: "dPht94cTuQrz1bG8P9FuwKFzEcQ",
});

module.exports = cloudinary;
