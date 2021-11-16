import express from "express";

import userController from "../controllers/user.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.post("/add-result", isAuth, userController.postAddNewResult);

router.get("/profile", isAuth, userController.getUserById);

router.get("/results", isAuth, userController.getUserResults);

router.put("/first-time", isAuth, userController.updateFirstTime);

export default router;
