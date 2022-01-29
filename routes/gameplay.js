import express from "express";

import wordsController from "../controllers/gameplay.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

/**
 * @swagger
 * api/gameplay/words:
 *   get:
 *     description: Use to get logged in user results
 *     responses:
 *       '200':
 *         description: A successful response
 */

router.get("/words", wordsController.getWords);

/**
 * @swagger
 * api/gameplay/text:
 *   get:
 *     description: Use to get logged in user results
 *     responses:
 *       '200':
 *         description: A successful response
 */

router.get("/text", wordsController.getText);

/**
 * @swagger
 * api/gameplay/add-text:
 *   get:
 *     description: Use to get logged in user results
 *     responses:
 *       '200':
 *         description: A successful response
 */

router.post("/add-text", isAuth, wordsController.postText);

export default router;
