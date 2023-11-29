const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    type: { type: String, required: true },
    head: { type: String, required: true },
    body: { type: String },
    file: { type: String },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
