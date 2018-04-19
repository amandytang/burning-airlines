import React, { PureComponent as Component } from 'react';

const Login = ({user, onSignOut})=> { //stateless component

  return (
    <div>
    <h3 style={{ "display": "inline-block", "padding-right": "15px"}}>Welcome, {user.name}!</h3>
    <a href="javascript:;" onClick={onSignOut} style={{
        "background": "#1c4a7d",
        "color":  "white",
        "fontSize":  "1.2em",
        "marginTop":  "10px",
        "fontFamily": "'Nunito', sans-serif",
        "padding": "5px 15px 5px 15px",
        "border": "none",
        "display": "inline-block"
    }}>Sign out</a>
    </div>
  )
}

class LoginForm extends Component { // accessing DOM refs
  handleSignIn(e) {
    e.preventDefault()
    let name = this.refs.name.value
    this.props.onSignIn(name)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSignIn.bind(this)}>
          <input type="text" id="login" ref="name" placeholder="Username" />
          <input type="submit" value="Login" style={{
              "background": "#1c4a7d",
              "color":  "white",
              "fontSize":  "1.2em",
              "marginTop":  "10px",
              "fontFamily": "'Nunito', sans-serif",
              "padding": "5px 15px 5px 15px",
              "border": "none"
          }}/>
        </form>
      </div>
    )
  }}

class UserLogin extends Component {

  constructor(props) {
    super(props) // initial application state
    this.state = {
      user: null
    }
  }

  signIn(name) {
    // This is where you would call an API
    // calling setState will re-render the entire app
    this.setState({
      user: {
        name,
      }
    })
  }

  signOut() {
    this.setState({user: null})
  }

  render() {
    // Here we pass relevant state to our child components as props. functions are passed using bind to make sure we keep our scope to App
    return (
      <div className="LoginDisplay">
        {
          (this.state.user) ?
            <Login
             user={this.state.user}
             onSignOut={this.signOut.bind(this)}
            />
          :
            <LoginForm
             onSignIn={this.signIn.bind(this)}
            />
        }
      </div>
    )
  }
}

export default UserLogin;
