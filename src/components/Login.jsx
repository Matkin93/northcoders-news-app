import React, { Component } from 'react';
import * as api from '../api';

class Login extends Component {
  state = {
    username: '',
    password: '',
    incorrectInput: false
  }
  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          <h2>Log In</h2>
          <div className="login-inputs">
            <form className="login-inputs" onSubmit={this.handleLogIn}>
              <label className="login-item">Username</label>
              <input type="text" placeholder="Username" className="login-item" onChange={this.handleUsername} value={this.state.username} />
              <label className="login-item">Password</label>
              <input type="password" placeholder="Password" className="login-item" onChange={this.handlePassword} value={this.state.password} />
              <button type="submit" className="login-button">Log In</button>
              {this.state.incorrectInput && <div className="invalid-username-password">Incorrect Username or Password</div>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleLogIn = (e) => {
    e.preventDefault();
    api.getUserByUsername(this.state.username).then(({ data }) => {
      this.props.logIn(data.userDoc);
    })
      .catch(err => {
        this.setState({
          username: '',
          password: '',
          incorrectInput: true
        })
      })
  }
}

export default Login;