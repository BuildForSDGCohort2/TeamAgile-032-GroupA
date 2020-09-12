const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const userController = require("../controller/user");
let { userLocation } = require("../controller/emergency-btn");

router.get("/users/:id/location", auth.verify, userController.getOneUserAdmin, userLocation.getOneUserAdminLocation);

module.exports = router;