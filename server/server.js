const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello, client'));

app.get('/data', (req, res) => {
  axios.get('https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=USD&limit=1525600')
  .then((response) => {
    const prices = response.data.Data;
    const labels = prices.map((element) => {
      const time = element.time;
      return moment.unix(time).format('MMMM Do YYYY, h:mm a');
    });
    
    const data = prices.map((element) => {
      const closingPrice = element.close;
      return closingPrice;
    });

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