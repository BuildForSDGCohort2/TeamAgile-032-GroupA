const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const userController = require("../controller/user");
let emergencyComtroller = require("../controller/emergency");

router.post(
  "/emergency/report",
  auth.verify,
  emergencyComtroller.emergencyReport
);
router.get("/emergency/:id", auth.verify, emergencyComtroller.getOne);

router.get("/emergency/all", auth.verify, emergencyComtroller.getAll);

router.put("/emergency/:id/upload", auth.verify, emergencyComtroller.getOne, emergencyComtroller.update);

module.exports = router;
