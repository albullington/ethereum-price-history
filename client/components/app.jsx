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
    }

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.handleYearClick = this.handleYearClick.bind(this);
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

  displayLastDay() {
    axios.get('/day')
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
      throw err;
    })
  }

  displayLastMonth() {
    axios.get('/month')
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
      throw err;
    })
  }

  displayLastYear() {
    axios.get('/year')
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
      throw err;
    })
  }

  componentDidMount() {
    this.displayLastDay()
  }

  render() {
    let {
      data
    } = this.state;

    data.datasets[0].label = 'Closing Price';
    data.datasets[0].fill = false;
    data.datasets[0].lineTension = 0.1;
    data.datasets[0].backgroundColor = 'rgba(75,192,192,0.4)';
    data.datasets[0].borderColor = 'rgba(75,192,192,1)';
    data.datasets[0].borderCapStyle = 'butt';
    data.datasets[0].pointRadius = 1;
    data.datasets[0].pointHitRadius = 10;
    data.datasets[0].borderDash = [];
    data.datasets[0].borderDashOffset = 0.0;
    data.datasets[0].borderJoinStyle = 'miter';
    data.datasets[0].pointBorderColor = 'rgba(75,192,192,1)';
    data.datasets[0].pointBackgroundColor = '#fff';
    data.datasets[0].pointBorderWidth = 1;
    data.datasets[0].pointHoverRadius = 5;
    data.datasets[0].pointHoverBackgroundColor = 'rgba(75,192,192,1)';
    data.datasets[0].pointHoverBorderColor = 'rgba(220,220,220,1)';
    data.datasets[0].pointHoverBorderWidth = 2;

    return (
      <div>
        <Menu 
          onDayClick={this.handleDayClick} 
          onMonthClick={this.handleMonthClick}
          onYearClick={this.handleYearClick}
        />
        <Chart data={data} />
      </div>
    )
  }
}

export default App;
