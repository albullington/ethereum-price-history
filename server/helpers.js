const axios = require('axios');
const moment = require('moment');

const getPriceByMinute = (req, res) => {
  axios.get('https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=USD&limit=1440')
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
}

module.exports.getPriceByMinute = getPriceByMinute;