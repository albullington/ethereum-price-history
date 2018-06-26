import React, { Component } from 'react';
import axios from 'axios';

import Chart from './chart';

class App extends Component {
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
    } = this.state;
    
    return (
      <div>
        <Chart prices={prices} />
      </div>
    )
  }
}

export default App;
