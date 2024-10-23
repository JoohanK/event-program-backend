const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  nameOrOrganisation: {
    type: String,
    required: true,
  },
  location: {
    physical: {
      type: String,
      required: true,
    },
    virtual: {
      type: String,
      required: false,
    },
  },

  registration: {
    requiresRegistration: {
      type: Boolean,
      required: false,
    },
    approvalRequired: {
      type: Boolean,
      required: false,
    },
    invitationRequired: {
      type: Boolean,
      required: false,
    },
    payment: {
      required: {
        type: Boolean,
        required: false,
      },
      paid: {
        type: Boolean,
        required: false,
      },
    },
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
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
