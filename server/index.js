const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const insertData = require('../Database/mongoDB.js');

const PORT = 3007;

console.log(insertData.insertData);

//API address
const API = `https://api.coindesk.com`;

//dates 
const start = `2018-03-01`;
const end = `2018-03-29`;

//historial data endpoint
const ENDPOINT = `/v1/bpi/historical/close.json?start=${start}&end=${end}`; 

const app = express();

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('/fetch/data', (req, res) => {
  const url = `${API}${ENDPOINT}`;

  //if exists in db, res.send else send api request

  axios.get(url)
  .then((response) => {
    console.log(response.data.bpi);
    insertData.insertData(response.data.bpi);
    res.status(200).send(response.data);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  })
})

// app.use('/', express.static(path.join(__dirname, '../dist')));

app.listen(PORT, () =>  console.log(`server is live on port: ${PORT}`));