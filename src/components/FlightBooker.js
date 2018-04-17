import React, { PureComponent as Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3333/flights.json'; // Replace with url.json from heroku. This returns flight info - origin, date, destination and plane (plane is currently empty because we haven't fixed the backend to allow us to assign a plane to a flight)

class FlightSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        origin: '', // we need to take both inputs to match up with a flight
        destination: ''
    };
    this._handleOriginChange = this._handleOriginChange.bind(this);
    this._handleDestinationChange = this._handleDestinationChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

_handleOriginChange (e) {
  this.setState({ origin: e.target.value });
}

_handleDestinationChange (e) {
  this.setState({ destination: e.target.value });
}

_handleSubmit (e) {
  e.preventDefault();
  this.props.onSubmit( this.state.origin, this.state.destination ) // Parent houses this function but  child is running it and passing up the origin and destination info
}

  render() {
    return (
      <form className="searchForm" onSubmit={ this._handleSubmit }>
        <input type="submit" value="Search" />
      </form>
    )
  }
}

export default FlightSearchForm;
