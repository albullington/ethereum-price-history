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
    const labels = prices.map((element) => {
      const time = element.time;
      return time;
    });
    // console.log(labels, 'labels');
    
    const data = prices.map((element) => {
      const closingPrice = element.close;
      return closingPrice;
    });
    // console.log(data, 'data');

    res.send({
      labels: labels, 
      data: data
    });
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
    }
  });
})

const port = 5001;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));