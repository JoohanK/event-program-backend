const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  eventID: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
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
});

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;
