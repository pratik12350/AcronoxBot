const mongoose = require('mongoose');

module.exports = new mongoose.model(
  "logs",
  new mongoose.Schema({
    guildId: String,
    channelId: String,
  })
)