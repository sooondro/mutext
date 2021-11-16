import bcrypt from "bcrypt";
import expressValidator from "express-validator";
import jwt from "jsonwebtoken";

import authConfig from "../config/auth.config.js";
import User from "../models/user.js";
import RefreshToken from "../models/jwt-refresh-token.js";

const { validationResult } = expressValidator;

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
    await user.save();
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
      authConfig.secret,
      { expiresIn: authConfig.jwtExpiration }
    );

    let refreshToken = await RefreshToken.createToken(loadedUser);

    res.status(200).json({
      confirmation: "Success",
      message: "JWT created",
      data: {
        token: token,
        refreshToken: refreshToken,
        userId: loadedUser._id.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

const postRefreshToken = async (req, res, next) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    const err = new Error("Refresh Token is required!");
    err.statusCode = 403;
    return next(err);
  }
  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      const err = new Error("Refresh token is not in database!");
      err.statusCode = 403;
      return next(err);
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      const err = new Error(
        "Refresh token was expired. Please make a new signin request"
      );
      err.statusCode = 403;
      return next(err);
    }
    const newAccessToken = jwt.sign(
      { userId: refreshToken.user._id.toString() },
      authConfig.secret,
      {
        expiresIn: authConfig.jwtExpiration,
      }
    );

    return res.status(200).json({
      confirmation: "success",
      data: {
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  postRegisterUser,
  postLogin,
  postRefreshToken
};
