import React, { PureComponent as Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


const SERVER_URL = 'http://localhost:3333/flights.json'; // Replace with url.json from heroku after deployment. The api should return flight info (origin, date, destination and plane) - plane is currently empty because we haven't fixed the backend to allow us to assign a plane to a flight

class FlightSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        origin: '',
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
  this.props.onSubmit( this.state.origin, this.state.destination ) // Parent houses this function but child is running it and passing up the origin and destination info
}

  render() {
    return (
      <form className="searchForm" onSubmit={ this._handleSubmit }>
        <h2>Find Flights</h2>

        <div className="originDropdown">
          <label className="originLabel">from</label>
          <select value={this.state.origin} onChange = {this._handleOriginChange} className="select-origin">
            <option value="" disabled>Choose a city...</option>
            <option value="Sydney">Sydney</option>
            <option value="Tucson">Tucson</option>
          </select>
        </div>
        <div className="destinationDropdown">
          <label className="destinationLabel">to</label><select value={this.state.destination} onChange = {this._handleDestinationChange} className="select-destination">
            <option value="" disabled>Choose a city...</option>
            <option value="Sydney">Sydney</option>
            <option value="Tucson">Tucson</option>
          </select>
        </div>
        <input type="submit" value="Search" id="searchButton" style={{
            "background": "#1c4a7d",
            "color":  "white",
            "fontSize":  "1.2em",
            "marginTop":  "10px",
            "fontFamily": "'Nunito', sans-serif",
            "padding": "5px 15px 5px 15px",
            "border": "none"
        }}/>
      </form>
    )
  }



}

FlightSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

class FlightDisplay extends Component { // Like your gallery
  render () {
    return (
      <div className="FlightDisplay"><h2>Available Flights</h2>
      </div>
    ) // TODO show available flights here after AJAX implemented
  }
}

class FlightBooker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      flights: [],
      flight_id: ""
    }; // We want to keep track of the available flights, and the chosen flight

    const fetchFlights = () => { // Need to pass the origin and destination in
    // console.log('preparing to fetch');  // Why does this line appear all the time

    axios.get(SERVER_URL).then( results => this.setState( {flights: results }) )
     // .then(console.log(results));
     // Can't console log the returned object - says results is undefined. probably the get request failed?
    }
    fetchFlights();
  }

  render() {
    return (
      <div>
      <div className="search">
        <FlightSearchForm onSubmit={() => this.fetchFlights}/>
      </div>
      <FlightDisplay />
      </div>
    );

    }
}


export default
  FlightBooker;
