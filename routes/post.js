const express = require("express"),
  postController = require("../controller/posts"),
  auth = require("../auth/auth");

let router = express.Router();

router.post("/posts/upload", auth.verify, postController.upload);

module.exports = router;
