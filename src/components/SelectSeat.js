import React, { PureComponent as Component} from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3001/flights/1.json'

// get the entire seatmap data from the server via axios .
// display the data in seatMap
// show which seats are taken and which are not live via polling
// onclick user can select seat id. show selected seat in the dom.
// when user clicks select seat. chosen seat id is sent to the database as not available anymore.

// need to get json from heroku for flight number x.
// filter seat number data and if seat number is present change the color
// to taken. and disable the click handle to no click.
//

class SeatMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      seats: Array.from({length: 40}, (x,i) => i+1),
      selectedSeat: ''}
    this._handleChange = this._handleChange.bind(this);
   }

   _handleChange(e){
    alert(e.currentTarget.id);
    this.setState({selectedSeat: e.currentTarget.id });
 }


    render() {
      return(
        <div className="seatMap">
            {this.state.seats.map((s) => <div onClick={this._handleChange} id={s} className="seat"><p>{s}</p></div>)}
        </div>
      );
    }

}



class SelectSeat extends Component {
  constructor(props){
    super(props);
    this.state = {seats: Array.from({length: 40}, (x,i) => i+1) };

  //   //Polling
  //   const fetchSecrets = () => { // fat arrow functions do not break the conenction to this
  //     axios.get(SERVER_URL).then(results => this.setState({secrets: results.data}))
  //     setTimeout(fetchSecrets, 4000); // recursion
  //   }
  //
  // fetchSecrets();
}

  render(){
    return(
      <div>
        <SeatMap seat={this.state.seats}/>
      </div>
    );
  }
}

export default SelectSeat;
