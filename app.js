const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const fetch = require('node-fetch');
const path = require('path');

require('dotenv').config()
global.fetch = require('node-fetch')

const app = express()
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


app.use('/api/unsplash', require('./routes/api/unsplash'));

app.listen(port, ()=> console.log(`server started on port ${port}`))