import User from "../models/user.js";
import Result from "../models/result.js";

const getUserById = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      throw error;
    }
    res.status(200).json({
      confirmation: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const postAddNewResult = async (req, res, next) => {
  const userId = req.userId;
  const textId = req.body.textId;
  const date = req.body.date;
  const difficulty = req.body.difficulty;
  const mutatedWords = req.body.mutatedWords;
  const numberOfMarkedWords = req.body.numberOfMarkedWords;
  const wrongWords = req.body.wrongWords;

  try {
    await User.findByIdAndUpdate(userId, {
      $push: {
        solvedTexts: textId,
      },
    });
    const result = new Result({
      date: date,
      difficulty: difficulty,
      mutatedWords: mutatedWords,
      numberOfMarkedWords: numberOfMarkedWords,
      wrongWords: wrongWords,
      userId: userId,
    });
    await result.save();
    res.json({ confirmation: "success", message: "Result saved" });
  } catch (error) {
    next(error);
  }
};

const getUserResults = async (req, res, next) => {
  const userId = req.userId;

  try {
    const results = await Result.find(
      { userId: userId },
      "date difficulty mutatedWords numberOfMarkedWords wrongWords"
    ).exec();
    if (!results) {
      const error = new Error("No results found for logged in user");
      throw error;
    }
    res.status(200).json({
      confirmation: "success",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const updateFirstTime = async (req, res, next) => {
  const userId = req.userId;

  try {
    await User.findByIdAndUpdate(userId, { isFirstTime: false }).exec();
  } catch (error) {
    return next(error);
  }
  res
    .status(200)
    .json({ confirmation: "success", message: "First time updated to false" });
};

export default {
  getUserById,
  postAddNewResult,
  getUserResults,
  updateFirstTime,
};
