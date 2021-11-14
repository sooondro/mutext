import express from "express";

import userController from "../controllers/user.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.post("/add-result", userController.postAddNewResult);

router.get("/get-user/:userId", userController.getUserById);

export default router;
