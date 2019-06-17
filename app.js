const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

require('dotenv').config()

const app = express
const port = process.env.PORT || 5000

app.use(function (req, res, next) {
    res.removeHeader("x-powered-by");
    next();
  });
  app.use(helmet({
    dnsPrefetchControl: false
  }))
app.use(bodyParser.json())
app.use(compression())
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
