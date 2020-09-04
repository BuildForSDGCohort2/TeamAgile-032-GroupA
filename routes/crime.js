const express = require("express"),
  auth = require("../auth/auth"),
  crimeControler = require("../controller/crime"),
  multer = require("multer");

let storage = multer.memoryStorage();
let uploads = multer({ storage }).array("media", 5);
let { cloudConfig } = require("../controller/cloudinary");

let route = express.Router();

route.get("/", (req, res) => {
  console.log(req.ipInfo);
  res.send("Works");
});

route.post(
  "/crime/report",
  uploads,
  auth.verify,
  cloudConfig,
  crimeControler.report
);

module.exports = route;
