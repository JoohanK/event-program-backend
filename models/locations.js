const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
 city: {
  type: String,
  required: false,
 },
 street: {
  type: String, 
  required: false,
 },
 online: {
    type: String,
    required: false,
 }
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
