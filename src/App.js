import React, { Component } from 'react';
import './App.css';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

import Card from './Components/Card/Card.jsx';
import Currency from './Components/Currency/Currency.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pair: null,
      price: null,
    }

    this.onSelectPair = this.onSelectPair.bind(this);
    this.initSocket = this.initSocket.bind(this);
  }

  initSocket(pair) {
    this.socket = new WebSocket(`wss://api.gemini.com/v1/marketdata/${pair}`);

    this.socket.onmessage = evt =>
      this.setState({
        price: JSON.parse(evt.data).events[0].price
      });
  }

  onSelectPair(selection) {
    if (this.state.pair !== selection.value) {
      this.socket && this.socket.close();
      this.setState({
        pair: selection.value,
        price: null,
      }, () => this.initSocket(selection.value));
    }
  }

  render() {
    const options = [
      { value: 'ethusd', label: 'ETH/USD' },
      { value: 'btcusd', label: 'BTC/USD' }
    ];


    return(
      <div className="App">
        <Card>
          <Select
            className="Select"
            clearable={false}
            placeholder="Select Pair..."
            name="form-field-name"
            onChange={this.onSelectPair}
            options={options}
            searchable={false}
            value={this.state.pair}
          />
          <Currency
            symbol="usd"
            value={this.state.price}
          />
        </Card>
      </div>
    );
  }
}

export default App;
