import React, { Component } from 'react';
import axios from 'axios';

import Chart from './chart';
import Menu from './menu';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      },
      coin: 'ETH',
      color: 'rgba(75,192,192,1)',
    }

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.handleYearClick = this.handleYearClick.bind(this);
    this.handleCoinClick = this.handleCoinClick.bind(this);
    this.displayCustomDateRange = this.displayCustomDateRange.bind(this);
  }

  handleDayClick(e) {
    e.preventDefault();
    this.displayLastDay();
  }

  handleMonthClick(e) {
    e.preventDefault();
    this.displayLastMonth();
  }
  
  handleYearClick(e) {
    e.preventDefault();
    this.displayLastYear();
  }

  handleCoinClick(e) {
    const {
      coin,
    } = this.state;

    e.preventDefault();
    if (coin === 'ETH') {
      this.setState({
        coin: 'BTC',
        color: 'rgba(75,134,192,1)'
      });
    } else {
      this.setState({
        coin: 'ETH',
        color: 'rgba(75,192,192,1)',
      });
    }
    this.displayLastDay();
  }

  displayLastDay() {
    const {
      coin,
    } = this.state;

    axios.get(`/day/${coin}`)
    .then((res) => {
      this.setState({
        data: {
          labels: res.data.labels,
          datasets: [
            {
              data: res.data.data,
            }, 
          ]
        }
      })
    })
    .catch((err) => {
      if (err) throw err;
    })
  }

  displayLastMonth() {
    const {
      coin,
    } = this.state;

    axios.get(`/month/${coin}`)
    .then((res) => {
      this.setState({
        data: {
          labels: res.data.labels,
          datasets: [
            {
              data: res.data.data,
            }
          ]
        }
      })
    })
    .catch((err) => {
      if (err) throw err;
    })
  }

  displayLastYear() {
    const {
      coin,
    } = this.state;

    axios.get(`/year/${coin}`)
    .then((res) => {
      this.setState({
        data: {
          labels: res.data.labels,
          datasets: [
            {
              data: res.data.data,
            }, 
          ]
        }
      })
    })
    .catch((err) => {
      if (err) throw err;
    })
  }

  displayCustomDateRange(from, to) {
    const {
      coin,
    } = this.state;

    axios.get(`http://localhost:5001/custom/${from}/${to}/${coin}`)
      .then((res) => {
        this.setState({
          data: {
            labels: res.data.labels,
            datasets: [
              {
                data: res.data.data,
              }
            ],
          }
        })
      })
      .catch((err) => {
        if (err) throw err;
      })
  }

  componentDidMount() {
    this.displayLastDay();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      coin
    } = this.state;

    if (coin !== prevState.coin) {
      this.displayLastDay();
    }
  }

  render() {
    let {
      data, 
      coin,
      color,
    } = this.state;

    data.datasets[0].label = 'Closing Price';
    data.datasets[0].fill = false;
    data.datasets[0].lineTension = 0.1;
    data.datasets[0].backgroundColor = 'rgba(75,192,192,0.4)';
    data.datasets[0].borderColor = color;
    data.datasets[0].borderCapStyle = 'butt';
    data.datasets[0].pointRadius = 1;
    data.datasets[0].pointHitRadius = 10;
    data.datasets[0].borderDash = [];
    data.datasets[0].borderDashOffset = 0.0;
    data.datasets[0].borderJoinStyle = 'miter';
    data.datasets[0].pointBorderColor = color;
    data.datasets[0].pointBackgroundColor = '#fff';
    data.datasets[0].pointBorderWidth = 1;
    data.datasets[0].pointHoverRadius = 5;
    data.datasets[0].pointHoverBackgroundColor = color;
    data.datasets[0].pointHoverBorderColor = 'rgba(220,220,220,1)';
    data.datasets[0].pointHoverBorderWidth = 2;

    return (
      <div>
        <Menu 
          onDayClick={this.handleDayClick} 
          onMonthClick={this.handleMonthClick}
          onYearClick={this.handleYearClick}
          onCoinClick={this.handleCoinClick}
          displayCustomDateRange={this.displayCustomDateRange}
          coin={coin}
        />
        <Chart data={data} coin={coin} />
      </div>
    )
  }
}

export default App;
