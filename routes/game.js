var express = require("express");
var router = express.Router();

// Require controllers
var gameController = require("../controllers/gameController");

// GET post listing page
router.get("/", gameController.index);

// POST request for creating a new post
router.post("/", gameController.create);

router.delete("/", gameController.delete);

module.exports = router;
