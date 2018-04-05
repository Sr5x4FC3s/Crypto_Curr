import React from 'react';
import ReactDOM from 'react-dom';
import Symbol from './Legend.jsx';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      data: [],
      chart: null
    }
  }
  componentDidMount () {
    this.fetchData();
  }

  //create a function that handles a date range and converts to one entry and pushed into an array to be sent as a query

  fetchData() {
    const url = `http://localhost:3007`;
    console.log(`this shit working?`);
    axios.get(`/fetch/data`)
    .then((response) => {
      console.log(response);
      let data = response.data.bpi;

      this.setState({
        data: data
      });
      console.log(this.state);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  render() {
    return(
      <div>
        <h1>This is it breh</h1>
        <Symbol />
      </div>
    )
  }
}

