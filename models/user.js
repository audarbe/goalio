var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: String,
    avatar: String,
    goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
