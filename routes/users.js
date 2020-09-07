const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const userController = require("../controller/user");

router.get("/users/all", auth.verify, userController.getAllUsers);

module.exports = router;
