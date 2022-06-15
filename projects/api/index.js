const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Routes
const routeProducts = require('./routes/products');
const routeMusics = require('./routes/musics');

const app = express();
const cors = require("cors");



// Morgan
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"))

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
app.use(cors())

// Public

// Routes
app.use('/produtos', routeProducts);
app.use('/musicas', routeMusics);

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