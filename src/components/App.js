import React, { PureComponent as Component } from 'react';
import FlightSearchForm from './FlightBooker'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
          <img className="header" src="https://i.imgur.com/w6NB0jx.png" alt="Hero" />
          <div className="search"><FlightSearchForm /></div>
      </div>
    );
  }
}

export default App;
