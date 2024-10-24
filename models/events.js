const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: false,
  },
  timeZone: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  extraInfoAfterRegistration: {
    type: String,
    required: false,
  },
  maxParticipants: {
    type: Number,
    required: false,
  },
  images: {
    type: [String],
    required: false,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "createdByModel",
    required: true,
  },
  createdByModel: {
    type: String,
    required: true,
    enum: ["User", "Organisation"],
  },
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: false,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
