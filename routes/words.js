const express = require("express");

const wordsController = require("../controllers/words");

const router = express.Router();

router.get("/words", wordsController.getWords);

module.exports = router;
