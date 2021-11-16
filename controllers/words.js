import retrieveRandomWords from "../data/words.js";

import Text from "../models/text.js";
import User from "../models/user.js";

const getWords = (req, res, next) => {
  const numberOfWords = req.query.count;
  res.status(200).json({
    randomWords: retrieveRandomWords(numberOfWords),
  });
};

const getText = async (req, res, next) => {
  const difficulty = req.query.difficulty;
  const user = await User.findById(req.userId, "solvedTexts").exec();
  if (!user) {
    const error = new Error("User not found in database");
    return next(error);
  }
  const solvedTexts = user.solvedTexts;
  
  const textObject = await Text.findOne(
    { _id: { $nin: solvedTexts }, difficulty: difficulty }
  ).exec();
  if (!textObject) {
    const error = new Error("User not found in database");
    return next(error);
  }
  return res.status(200).json({
    confirmation: "success",
    text: textObject.text,
  });
};

const postText = async (req, res, next) => {
  const difficulty = req.body.difficulty;
  const text = req.body.text;

  try {
    const textObject = new Text({
      difficulty: difficulty,
      text: text,
    });
    await textObject.save();
    res.status(200).json({
      confirmation: "success",
      message: "Text saved to the database.",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getWords,
  getText,
  postText,
};
