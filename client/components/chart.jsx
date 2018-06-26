import React, { Component } from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries
} from 'react-vis';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prices: [],
    }
  }

  componentDidMount() {
    axios.get('/data')
      .then((res) => {
        console.log(res.data, 'client side');
        this.setState({
          prices: res.data,
        })
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    let {
      prices
    } = this.props;

    return (
      <XYPlot
        width={300}
        height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <AreaSeries
          className="price-history-chart"
          curve="curveNatural"
          data={prices}/>
      </XYPlot>
    );
  }
}

export default Chart;
