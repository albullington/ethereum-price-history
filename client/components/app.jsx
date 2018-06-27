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
            label: 'Price',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            pointRadius: 1,
            pointHitRadius: 10,
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            data: []
          }
        ]
      },
    }

    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleMonthClick(e) {
    e.preventDefault();
    this.displayLastMonth();
  }

  handleDayClick(e) {
    e.preventDefault();
    this.displayLastDay();
  }

  displayLastMonth() {
    axios.get('/month')
    .then((res) => {
      console.log(res.data, 'client side');
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

  displayLastDay() {
    axios.get('/day')
    .then((res) => {
      console.log(res.data, 'client side');
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

    return (
      <div>
        <Menu 
          onDayClick={this.handleDayClick} 
          onMonthClick={this.handleMonthClick} 
        />
        <Chart data={data} />
      </div>
    )
  }
}

export default App;
