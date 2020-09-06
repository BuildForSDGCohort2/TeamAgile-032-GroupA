const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["super_admin", "user"],
      default: "user"
    },
    api_token: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
