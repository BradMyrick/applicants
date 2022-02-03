const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const axios = require('axios');
const cors = require('cors');
const { api_key, address } = require('../config.js');

app.use(cors());
app.use(express.static('client/dist'));
app.use(express.json());

app.get('/wallet', (req, res) => {
  axios({
    url: `https://api-testnet.snowtrace.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${api_key}`,
  })
  .then(result => {res.status(200).send(result.data.result)});
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})