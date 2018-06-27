const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { getPriceLastDay, getPriceLastMonth, getPriceLastYear } = require('./helpers');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello, client'));

app.get('/day', (req, res) => {
  getPriceLastDay(req, res);
})

app.get('/month', (req, res) => {
  getPriceLastMonth(req, res);
})

app.get('/year', (req, res) => {
  getPriceLastYear(req, res);
})

const port = 5001;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));