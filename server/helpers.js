const axios = require('axios');
const moment = require('moment');

const baseURL = 'https://min-api.cryptocompare.com/data/'

const createPriceList = (prices) => prices.map((element) => {
  const closingPrice = element.close;
  return closingPrice;
});

const getPriceLastDay = (req, res) => {
  const coin = req.params.coin;

  axios.get(baseURL + `histominute?fsym=${coin}&tsym=USD&limit=1440`)
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
  const coin = req.params.coin;

  axios.get(baseURL + `histoday?fsym=${coin}&tsym=USD&limit=30`)
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
  const coin = req.params.coin;

  axios.get(baseURL + `histoday?fsym=${coin}&tsym=USD&limit=365`)
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

const calculateDateRange = (from, to) => {
  const numOfSecs = to - from;
  const numOfMins = Math.round(numOfSecs / 60)
  const numOfHours = Math.round(numOfMins / 60);
  const numOfDays = Math.round(numOfHours / 24);

  return numOfDays;
}

const getCustomDateRange = (req, res) => {
  const from = req.params.from;
  const to = req.params.to;
  const coin = req.params.coin;

  const datesFromToday = calculateDateRange(from, moment(new Date()).unix()) - 1;
  const totalDates = calculateDateRange(from, to);

  axios.get(baseURL + `histoday?fsym=${coin}&tsym=USD&limit=${datesFromToday}`)
  .then((response) => {
    const prices = response.data.Data;
    prices.splice(totalDates + 1);
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

module.exports = {
  getPriceLastDay, 
  getPriceLastMonth,
  getPriceLastYear,
  getCustomDateRange,
}