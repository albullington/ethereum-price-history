const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { 
  getPriceLastDay, 
  getPriceLastMonth, 
  getPriceLastYear, 
  getCustomDateRange,
 } = require('./helpers');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello, client'));

app.get('/day/:coin', (req, res) => {
  getPriceLastDay(req, res);
})

app.get('/month/:coin', (req, res) => {
  getPriceLastMonth(req, res);
})

app.get('/year/:coin', (req, res) => {
  getPriceLastYear(req, res);
})

app.get('/custom/:from/:to/:coin', (req, res) => {
  getCustomDateRange(req, res);
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));