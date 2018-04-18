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
  this.props.onSubmit( this.state.origin, this.state.destination )
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

// FlightSearchForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired
// }

function FlightDisplay (props) { // Like your gallery

    return (
      <div className="FlightDisplay"><h2>Available Flights</h2>
      <table>
      <tbody>
      <tr>
      <td><h3 className="tableHeading">Origin</h3></td>
      <td><h3 className="tableHeading">Destination</h3></td>
      <td><h3 className="tableHeading">Date</h3></td>
      <td><h3 className="tableHeading">Flight Number</h3></td>
      </tr>
      {props.flights.map((f) =>
      <tr>
      <td><p key={f.id}>{f.origin}</p></td>
      <td><p key={f.id}>{f.destination}</p></td>
      <td><p key={f.id}>{f.date}</p></td>
      <td><p key={f.id}>BA0{f.id}</p></td>

      </tr>
          )}
      </tbody>
      </table>

      </div>
    ) // TODO show available flights here after AJAX implemented
    // {props.flights.map((f) => <div>
    //   <p key={f.id}>{f.origin}</p><p key={f.id}>{f.destination}</p><p key={f.id}>{f.date}</p><p key={f.id}>{f.id}</p></div>
}

class FlightBooker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      flights: [],
      flight_id: '', // To pass to reservations later on
      origin: '',
      destination: ''
    }; // We want to keep track of the available flights, and the chosen flight
    this.fetchFlights = this.fetchFlights.bind(this);
    this.filterByOD = this.filterByOD.bind(this);
    // fetchFlights();
  }

  filterByOD(item) {
    if (item.origin === this.state.origin && item.destination === this.state.destination) {
      return true;
    }
  }

  fetchFlights () { // Need to pass the origin and destination in
    console.log('preparing to fetch');
     // console.log(this.state.origin);

    // axios.get(SERVER_URL).then( results => this.setState( {flights: results.data }))

     axios.get(SERVER_URL).then( results => console.log( results.data.filter(this.filterByOD)) )
     // axios.get(SERVER_URL).then( results => console.log( results.data.filter(isOrigin),  results.data.find(isDestination) ) )

// We need to access origin and destination (state) from child and put into variables to filter by


// function isDestination(d) {
//   return d.destination === 'Sydney';
// }

  // setTimeout(fetchFlights, 10000); // function works on timeout - how to make it bind to onSubmit
 }

  render() {
    return (
      <div>
        <div className="search">
          <FlightSearchForm onSubmit={this.fetchFlights}/>
        </div>
        <FlightDisplay flights={this.state.flights} />
      </div>
    );

    }
}


export default FlightBooker;
