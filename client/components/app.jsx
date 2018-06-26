import React, { Component } from 'react';
import axios from 'axios';

import Chart from './chart';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: 'Price',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
        ]
      }
    }
  }

  componentDidMount() {
    axios.get('/data')
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

  render() {
    let {
      data
    } = this.state;

    return (
      <div>
        <Chart data={data} />
      </div>
    )
  }
}

export default App;
