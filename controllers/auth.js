import bcrypt from "bcrypt";
import expressValidator from "express-validator";
import jwt from "jsonwebtoken";

const { validationResult } = expressValidator;

import User from "../models/user.js";

const postRegisterUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    return next(error);
  }

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      username: username,
      password: hashedPassword,
      isFirstTime: true,
      results: [],
      solvedTexts: [],
    });
    user.save();
    res.status(200).json({
      confirmation: "success",
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    loadedUser = await User.findOne({ email: email });
    if (!loadedUser) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, loadedUser.password);
    if (!isEqual) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "sljivicajesupersecrettajna",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      confirmation: "Success",
      message: "JWT created",
      data: {
        token: token,
        userId: loadedUser._id.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  postRegisterUser,
  postLogin,
};
