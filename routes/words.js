import express from "express";

import wordsController from "../controllers/words.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.get("/words", isAuth, wordsController.getWords);

router.get("/text", isAuth, wordsController.getText);

router.post("/add-text", wordsController.postText);

export default router;
