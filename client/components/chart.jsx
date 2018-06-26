import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  render() {
    const {
      data
    } = this.props;
    
    return (
      <div id="price-chart">
        <Line
          data={data}
          options={
            {
              title: {
                display: true,
                text: 'Ethereum (USD) Price',
                fontSize: 32,
              },
              legend: {
                display: false,
                position: 'bottom',
              },
            }
          }
        />
      </div>
    )
  }
}

export default Chart;
