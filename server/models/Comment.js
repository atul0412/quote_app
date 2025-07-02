const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    quote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quote"
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Comment", commentSchema);
