
const mongoose = require("mongoose")
const Quote = require('../models/quotes')

exports.new_quote = async (req, res) =>{
    try{
        const quote = new Quote(req.body)
        await quote.save()
        res.status(201).json({quote})
    }
    catch(err){
        res.status(400).send(err)
    }
}

exports.get_random_quote = async (req, res) =>{
    try{
        
    }
    catch(err){
        res.status(400).send(err)
    }
}