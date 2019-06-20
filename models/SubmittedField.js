const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')

const lengthValidator = [
    validate({
        validator: 'isLength',
        arguments: [100, 2000],
        message: 'field cannot be empty'
    })
]

const emailValidator = [
    validate({
        validator: 'matches',
        arguments: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        message: 'Name must be at least 3 characters, max 40, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
]

const SubmittedFieldSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uid: {type:String, required:true},
    dateId: {type:String, required:true},
    date: {type:String, required:true},
    field:{type:String, required:true},
    text:{type:String, required:true, unique:true, validate:emailValidator}
})


module.exports = mongoose.model('SubmittedField', SubmittedFieldSchema)