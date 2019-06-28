const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const mongoose = require('mongoose')
const cors = require('cors')
const fetch = require('node-fetch');
const path = require('path');

require('dotenv').config()
global.fetch = require('node-fetch')

const app = express()
const port = process.env.PORT || 5000

const Schema = mongoose.Schema

app.use(function (req, res, next) {
    res.removeHeader("x-powered-by")
    next()
})
app.use(helmet({
  dnsPrefetchControl: false
}))
app.use(compression())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json()) 

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE')
    return res.status(200).json({})
  }
  next()
})


app.use('/api/unsplash', require('./routes/api/unsplash'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/diary', require('./routes/api/diary'))
app.use('/api/quotes', require('./routes/api/quotes'))

let MONGO_URI=process.env.MONGO_URI_SECRET

const db = mongoose.connect(MONGO_URI, {useNewUrlParser:true})
.then(
  ()=> {console.log("database is connected")},
  err => {console.log("cannot connect to database")}
)

app.listen(port, ()=> console.log(`server started on port ${port}`))