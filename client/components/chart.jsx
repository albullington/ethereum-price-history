import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  render() {
    const {
      data, 
      coin,
    } = this.props;

    const title = coin === 'ETH' ? 'Ethereum' : 'Bitcoin';
    
    return (
      <div id="price-chart">
        <Line
          data={data}
          options={
            {
              title: {
                display: true,
                text: `${title} (USD) Price`,
                fontSize: 22,
              },
              legend: {
                display: true,
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
