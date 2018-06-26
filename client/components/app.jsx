import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('/data')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    return (
      <div>
        <p>React is compiling correctly</p>
      </div>
    )
  }
}

export default App;
