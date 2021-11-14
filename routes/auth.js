import express from "express";
import expressValidator from "express-validator";

const { body } = expressValidator;

import authContoller from "../controllers/auth.js";
import User from "../models/user.js";

const router = express.Router();

router.post(
  "/register-user",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email adress already exists");
          }
        });
      }),
    body("password").trim(),
    body("username").trim().not().isEmpty(),
  ],
  authContoller.postRegisterUser
);

router.post("/login", authContoller.postLogin);

export default router;
