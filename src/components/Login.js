import React, { PureComponent as Component } from 'react';

const Login = ({user, onSignOut})=> { //stateless component

  return (
    <div>
    <h3>{user.name} you&#39;re ready to book!</h3>
    <a href="javascript:;" onClick={onSignOut}>Sign out</a>
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
        <h2>Start Here:</h2>
        <form onSubmit={this.handleSignIn.bind(this)}>
          <input type="text" ref="name" placeholder="Enter Your Name" />
          <input type="submit" value="Go" />
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
