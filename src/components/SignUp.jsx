import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  render() {
    if (this.props.user.username) return <Redirect to={{
      pathname: "/articles",
      state: {
        sendTo: `/articles`
      }
    }} />;
    else return (
      <div className="login-page">
        <div className="login-box">
          <h2>Sign Up</h2>
          <div className="signup-inputs">
            <form className="signup-inputs">
              <label className="signup-item">Username</label>
              <input type="text" placeholder="Username" className="signup-item" />
              <label className="signup-item">Password</label>
              <input type="password" placeholder="Password" className="signup-item" />
              <label className="signup-item">Confirm Password</label>
              <input type="password" placeholder="Confirm Password" className="signup-item" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;