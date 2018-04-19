import React, { PureComponent as Component } from 'react';
import FlightBooker from './FlightBooker';
import Login from './Login';
import SelectSeat from './SelectSeat';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div><Login /></div>
        <img className="header" src="https://i.imgur.com/w6NB0jx.png" alt="Hero" />
        <div><FlightBooker /></div>
      </div>

    );
  }
}

export default App;
