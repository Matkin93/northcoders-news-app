import React, { Component } from 'react';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  render() {
    return (
      <div className="login-box">
        <h2>Log In</h2>
        <div className="login-inputs">
          <form className="login-inputs">
            <label className="login-item">Username</label>
            <input type="text" placeholder="Username" className="login-item" />
            <label className="login-item">Password</label>
            <input type="password" placeholder="Password" className="login-item" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;