const express = require('express');
const path = require('path');
const axios = require('axios');

const { searchHourlyPrices } = require('./api');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.send('Hello, client'));

app.get('/data', (req, res) => {
  axios.get(`https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=10`)
  .then((data) => {
    res.sendStatus(200).send(data);
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
    }
  });
})

const port = 5001;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));