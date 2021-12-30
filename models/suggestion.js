const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    message: String,
    token: String,
    suggestion: String,
    user: String,
    guild: String,
})

module.exports = mongoose.model('Suggestion', Schema)