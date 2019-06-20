const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiaryEntrySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateId: {type:String, required:true},
    date: {type:String, required:true},
    submittedFields: {type:Array, default: []}
})

/*
const DiaryEntrySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {type:String, required:true},
    intention: {type:String},
    highlight: {type:String},
    gratitude: {type:String},
    love: {type:String}
})*/

module.exports = mongoose.model('DiaryEntry', DiaryEntrySchema)