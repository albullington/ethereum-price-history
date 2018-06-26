const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello, client'));

app.get('/data', (req, res) => {
  axios.get('https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=10')
  .then((response) => {
    const prices = response.data.Data;
    // console.log(res.data.Data);
    res.send(prices);
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
    }
  });
})

const port = 5001;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));