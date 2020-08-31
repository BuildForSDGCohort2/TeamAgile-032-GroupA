const express = require("express"),
  postController = require("../controller/posts"),
  auth = require("../auth/auth"),
  multer = require("multer");
let storage = multer.memoryStorage();
let uploads = multer({ storage }).array("media", 5);
let { cloudConfig } = require("../controller/cloudinary");

let router = express.Router();

router.post(
  "/posts/upload",
  uploads,
  auth.verify,
  cloudConfig,
  postController.upload
);

module.exports = router;
