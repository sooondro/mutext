import jwt from "jsonwebtoken";

import authConfig from "../config/auth.config.js";

const { TokenExpiredError } = jwt;

const catchError = (err, next) => {
  if (err instanceof TokenExpiredError) {
    return next(err);
  }

  next(err);
};

const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    return next(error);
  }

  console.log(authHeader);
  const token = authHeader.split(" ")[1];

  console.log(token);
  jwt.verify(token, authConfig.secret, (err, decodedToken) => {
    console.log(decodedToken, 'decodedToken');
    if (err) {
      console.log(err, 'Erorrcina');
      return catchError(err, next);
    }
    console.log(decodedToken.userId, 'isauth');
    req.userId = decodedToken.userId;
    next();
  });
};

export default isAuth;
