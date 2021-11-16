import mongoose from "mongoose";

const Schema = mongoose.Schema;

const textSchema = new Schema({
  difficulty: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Text", textSchema);
