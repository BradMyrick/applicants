const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const userToken = require('../config.js').USER_ADDRESS;
const contractAddress = require('../config.js').CONTRACT_ADDRESS;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('client/dist'));

app.get('/getBalance', function (req, res) {
  axios.get(`https://api-testnet.snowtrace.io/api?module=account&action=balance&address=${userToken}&tag=latest&apikey=${contractAddress}`)
  .then((response) => {
    res.status(200).send(response.data.result);
  })
  .catch((err) => {
    console.log(err);
  })
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})