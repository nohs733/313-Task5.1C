const express = require("express");
const homeRouter = express.Router();

const homeController = require("../controllers/homeController");

router.post("/register", homeController.register);
router.post("/", homeController.login);

module.exports = router