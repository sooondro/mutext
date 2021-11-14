import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isFirstTime: {
    type: Boolean,
    required: true,
  },
  results: [
    {
      date: Date,
      difficulty: Number,
      mutatedWords: Number,
      numberOfMarkedWords: Number,
      wrongWords: Number,
    },
  ],
  solvedTexts: [String],
});

export default mongoose.model("User", userSchema);
