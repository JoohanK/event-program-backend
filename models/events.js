const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event
