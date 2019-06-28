
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

exports.random_quote = async (req, res) =>{
    try{
        const query = {
            state:'OK'
        }
        let quotes = await Quote.aggregate(
            [{$sample:{size:1}}]
        )
        /*let randomNum = Math.random()
        let quotesLength = await quotes.length
        let randomIndex = Math.round(randomNum*quotesLength)
        let randomQuote = quotes[randomIndex]
        res.json({randomQuote})*/
        res.send(quotes[0])
    }
    catch(err){
        res.status(400).json({message:"request failed"})
    }
}