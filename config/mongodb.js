const mongoose = require("mongoose")
require("dotenv").config()

async function mongoDBConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION)
    console.log("MongoDB connected")
  } catch (error) {
    console.log(error)
  }
}

module.exports = mongoDBConnect
