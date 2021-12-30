const mongoose = require("mongoose");

module.exports = new mongoose.model(
  "economy",
  new mongoose.Schema({
    coins: { type: Number },
    bank: { type: Number },
    userID: { type: String },
    started: { type: Boolean, default: false},
 //   guildID: { type: String }
  })
)