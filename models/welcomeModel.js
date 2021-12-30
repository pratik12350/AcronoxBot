const mongoose = require('mongoose');

module.exports = mongoose.model(
  "welcome",
  new mongoose.Schema({
    channel: String,
    message: String,
    guild: String
  })
)