const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = mongoose.Schema({
    quote:{
        type: String,
        required: true,
        trim: true
    },
    source:{
        type: String,
        required: true,
        trim: true
    }
})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote