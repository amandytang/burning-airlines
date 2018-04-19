import React, { PureComponent as Component} from 'react';
import axios from 'axios';


// const SERVER_URL = 'http://localhost:3001/flight_users.json'
const SERVER_URL = 'http://flaming-airlines.herokuapp.com/flight_users.json'

// get the entire seatmap data from the server via axios .
// display the data in seatMap
// show which seats are taken and which are not live via polling
// onclick user can select seat id. show selected seat in the dom.
// when user clicks select seat. chosen seat id is sent to the database as not available anymore.


class SeatMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      seats: Array.from({length: 40}, (x,i) => i+1),
      selectedSeat: '',
      occupied: '',
      selected: false,
      flight_id: ''
    }
    this._handleChange = this._handleChange.bind(this);
    this.saveSeat = this.saveSeat.bind(this);
    this.showOccupied = this.showOccupied.bind(this);
    this.fetchSeats = this.fetchSeats.bind(this);

    //occupied seats Polling
    // const fetchSeats = () => { // fat arrow functions do not break the conenction to this
    //   axios.get(SERVER_URL).then(results => this.setState({occupied: results.data.map(item => item.seat)}))
    //   setTimeout(fetchSeats, 40000); // recursion chane this bac to 4seconds
    // }
    // fetchSeats();
   }

  fetchSeats(){ // fat arrow functions do not break the conenction to this
     axios.get(SERVER_URL).then(results => this.setState({occupied: results.data.map(item => item.seat)}))
     setTimeout(this.fetchSeats, 40000); // recursion chane this bac to 4seconds
   };


   _handleChange(e){
    alert(e.currentTarget.id);
    this.setState({selectedSeat: e.currentTarget.id });
    console.log(this.state.selectedSeat);
    // const newTransform = this.state.selected === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    this.setState({selected: !this.state.selected})

 };

   showOccupied(e){
     e.preventDefault();
     this.fetchSeats();
     console.log(this.state.occupied);


   }


  saveSeat(e){
     e.preventDefault();
     console.log('sending post');
     // this.state.secret.push(s); // Mutation never mutate arrays!!
     // this.setState({secrets: [...this.state.secrets,s]});
     axios.post(SERVER_URL, {
       seat: this.state.selectedSeat,
       user_id:5,
       flight_id: 1,
     }).then(response => {
      console.log(response)
     })
     .catch(error => {
         console.log(error.response)
     });
  };

    render() {
      return(
        <div>
          <div>
            <h2>Booking Form</h2>
            <form>
              <p>book this seat?</p>
              <button onClick={this.saveSeat}>submit</button>
              <button onClick={this.showOccupied}>show occupied</button>
            </form>
          </div>

          <div className="seatMap">
              {this.state.seats.map((s) => <div onClick={this._handleChange} id={s} key={s} className='seat'><p>{s}</p></div>)}
              {/* {this.state.seats.map((s) => <div onClick={this._handleChange} id={s} key={s} className={this.state.selected ? 'seatBlue seat' : 'seat'}><p>{s}</p></div>)} */}
          </div>
        </div>
      );
    }

}


class SelectSeat extends Component {
  constructor(props){
    super(props);
    this.state = {}
}

  render(){
    return(
      <div>
        <SeatMap />
      </div>
    );
  }
}

export default SelectSeat;
