const mongoose = require("mongoose");

module.exports = new mongoose.model(
  "profile",
  new mongoose.Schema({
    userID: String,
  //  hugs: Number,
    bio: String,
    pronoun: String,
    image: String,
    age: Number,
    hobbies: String,
    socials: {
      youtube: String,
      instagram: String,
      facebook: String,
      tiktok: String
    }
  })
)