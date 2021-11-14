import express from "express";

import wordsController from "../controllers/words.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.get("/words", isAuth, wordsController.getWords);

export default router;