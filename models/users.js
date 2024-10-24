const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  eventID: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
