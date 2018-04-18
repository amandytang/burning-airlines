import React, { PureComponent as Component } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

const SERVER_URL = 'https://flaming-airlines.herokuapp.com/flights.json'; // Replace with url.json from heroku after deployment. The api should return flight info (origin, date, destination and plane) - plane is currently empty because we haven't fixed the backend to allow us to assign a plane to a flight

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

class FlightDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
        flights: [],
        flight_id: ""
    };
    this._handleSeat = this._handleSeat.bind(this);
}


_handleSeat (e) {
  e.preventDefault();
  let flight_id = e.target.getAttribute("id");
  console.log(flight_id);
  this.setState({ flight_id });
}
// we now have the flight_id in the flightdisplay component's state.
// send flight_id in ajax request to db to find the seatMap

render() {

    return ( //TODO conditional logic ot only display table headings if there are flights to display
      <div className="FlightDisplay"><h2>Available Flights</h2>
      <table>
      <tbody>
      <tr>
      <td><h3 className="tableHeading">Origin</h3></td>
      <td><h3 className="tableHeading">Destination</h3></td>
      <td><h3 className="tableHeading">Date</h3></td>
      <td><h3 className="tableHeading">Flight Number</h3></td>
      </tr>
      {this.props.flights.map((f) =>
      <tr>
      <td><p key={f.id}>{f.origin}</p></td>
      <td><p key={f.id}>{f.destination}</p></td>
      <td><p key={f.id}>{f.date}</p></td>
      <td><p key={f.id}>BA0{f.id}</p></td>
      <td><form className="seatFetcher" id={f.id} onSubmit={ this._handleSeat }><input type="submit" value="View" id="searchButton" style={{
          "background": "#1c4a7d",
          "color":  "white",
          "fontSize":  "1.2em",
          "marginTop":  "10px",
          "fontFamily": "'Nunito', sans-serif",
          "padding": "5px 15px 5px 15px",
          "border": "none"
      }}/>
    </form></td>
      </tr>
          )}
      </tbody>
      </table>
      </div>

    )
  }

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
    // this.filterByOD = this.filterByOD.bind(this);
    // fetchFlights();
  }
  //
  // filterByOD(item) {
  //   if (item.origin === 'Sydney' && item.destination === 'Tuscon') {
  //     return true;
  //   }
  // }

  fetchFlights (o,d) { // Need to pass the origin and destination in
    console.log('preparing to fetch');
     // console.log(this.state.origin);

    // axios.get(SERVER_URL).then( results => this.setState( {flights: results.data }))

     axios.get(SERVER_URL).then(function (results){
             let flightsArr = [];
             for (let i = 0; i<results.data.length;i++)
               if (results.data[i].origin === o && results.data[i].destination === d)
                 flightsArr.push(results.data[i]);
             this.setState({ flights:flightsArr });
           }.bind(this));

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
