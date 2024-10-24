const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  eventID: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },

  physicalLocation: {
    type: String,
    required: false,
  },
  online: {
    type: String,
    required: false,
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
