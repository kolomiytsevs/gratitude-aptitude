const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiaryEntrySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uid: {type:String, required:true},
    dateId: {type:String, required:true},
    date: {type:String, required:true},
    entryDate: {type:String, required:true},
    submittedFields: {type:Array, required:true, default: []}
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