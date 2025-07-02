const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
    {
        text: String,
        quote: { type: ObjectId, ref: "Quote" },
        author: { type: ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
