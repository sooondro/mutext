import User from "../models/user.js";

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid id format");
    return next(error);
  }
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
  const userId = req.body.userId;
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid id format");
    return next(error);
  }

  const textId = req.body.textId;

  try {
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          results: {
            date: req.body.date,
            difficulty: req.body.difficulty,
            mutatedWords: req.body.mutatedWords,
            numberOfMarkedWords: req.body.numberOfMarkedWords,
            wrongWords: req.body.wrongWords,
          },
          solvedTexts: textId,
        },
      }
    );
    res.json({ confirmation: "success" });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserById,
  postAddNewResult,
};
