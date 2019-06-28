const express = require('express')
const router = express.Router()

const QuoteController = require('../../controllers/quotes')

router.post("/new_quote", QuoteController.new_quote) 

module.exports = router