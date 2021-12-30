const mongoose = require("mongoose");

module.exports = new mongoose.model(
  "automod",
  new mongoose.Schema({
    guildId: String,
    antiswear: { type: Boolean, default: false },
    antilink: { type: Boolean, default: false },
  })
)