import React, { PureComponent as Component } from 'react';
import FlightBooker, { FlightSearchForm, FlightDisplay, FlightSearch } from './FlightBooker';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <img className="header" src="" alt="Hero" />
        <div><FlightSearch /></div>
        <div><FlightDisplay /></div>
      </div>
    );
  }
}

export default App;
