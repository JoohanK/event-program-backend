const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  physicalLocation: {
    type: String,
    required: true,
  },
  online: {
    type: String,
    required: false,
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
