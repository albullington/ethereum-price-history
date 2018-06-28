const axios = require('axios');
const moment = require('moment');

const baseURL = 'https://min-api.cryptocompare.com/data/'

const createPriceList = (prices) => prices.map((element) => {
  const closingPrice = element.close;
  return closingPrice;
});

const getPriceLastDay = (req, res) => {
  axios.get(baseURL + 'histominute?fsym=ETH&tsym=USD&limit=1440')
  .then((response) => {
    const prices = response.data.Data;
    const labels = prices.map((element) => {
      const time = element.time;
      return moment.unix(time).format('MMM Do, h:mm a');
    });
    
    const data = createPriceList(prices);

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
}

const getPriceLastMonth = (req, res) => {
  axios.get(baseURL + 'histoday?fsym=ETH&tsym=USD&limit=30')
  .then((response) => {
    const prices = response.data.Data;
    const labels = prices.map((element) => {
      const time = element.time;
      return moment.unix(time).format('MMM D');
    });
    
    const data = createPriceList(prices);

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
}

const getPriceLastYear = (req, res) => {
  axios.get(baseURL + 'histoday?fsym=ETH&tsym=USD&limit=365')
  .then((response) => {
    const prices = response.data.Data;
    const labels = prices.map((element) => {
      const time = element.time;
      return moment.unix(time).format('MMM YY');
    });
    
    const data = createPriceList(prices);

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
}

const getCustomDateRange = (req, res) => {
  const from = req.params.from;
  const to = req.params.to;

  console.log(from, 'from', to, 'to');

  axios.get(baseURL + 'histoday?fsym=ETH&tsym=USD&limit=365')
  .then((response) => {
    const prices = response.data.Data;
    const labels = prices.map((element) => {
      const time = element.time;
      return moment.unix(time).format('MMM YY');
    });
    
    const data = createPriceList(prices);

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
}

module.exports = {
  getPriceLastDay, 
  getPriceLastMonth,
  getPriceLastYear,
  getCustomDateRange,
}