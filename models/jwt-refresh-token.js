import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

import authConfig from "../config/auth.config.js";

const Schema = mongoose.Schema;

const refreshTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
});

refreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(
    expiredAt.getSeconds() + authConfig.jwtRefreshExpiration
  );

  let token = uuidv4();

  let object = new this({
    token: token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });

  console.log(object);

  let refreshToken = await object.save();

  return refreshToken.token;
};

refreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

export default mongoose.model("RefreshToken", refreshTokenSchema);
