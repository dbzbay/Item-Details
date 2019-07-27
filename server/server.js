require('dotenv').config()
const express = require("express");
// const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require('cors');
var compression = require('compression');
const Product = require('../database/index');

// app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
// app.use(compression());

app.get("/item/:id", (req, res, next) => {
  const id = Number(req.params.id)
  if (isNaN(id)) next();
  else {
    return Product.get(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.send(500);
      });
  }
});

app.get('/*', (req, res) => {
  res.status(404).send({message: 'Can\'t find that, sorry.'})
})

module.exports = app;
