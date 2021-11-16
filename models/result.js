import mongoose from "mongoose";

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  mutatedWords: {
    type: Number,
    required: true,
  },
  numberOfMarkedWords: {
    type: Number,
    required: true,
  },
  wrongWords: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model("Result", resultSchema);
