const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Channel: String,
    Guild: String,
})

module.exports = mongoose.model('suggestionChannel', Schema)