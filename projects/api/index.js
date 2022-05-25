const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routeProducts = require('./routes/products');
const routeHashtag = require('./routes/hashtag');


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
app.use((req, res, next) => {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Header", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  
  if(req.method === "OPTIONS"){
    res.header('Acces-Control-Allow-Methods', "GET, POST, DELETE, PUT, PATCH");
    return res.status(200).send({});
  }

  next();
})

// Routes
app.use('/hashtag', routeHashtag);
app.use('/produtos', routeProducts);

// Error
app.use((req, res, next) => {
  const error = new Error('Não encontrado!');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      message: error.message
    }
  })
})



module.exports = app;