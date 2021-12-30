const mongoose = require('mongoose');

module.exports = mongoose.model(
  "automeme",
  new mongoose.Schema({
    channelID: String,
    guildID: String
  })
)