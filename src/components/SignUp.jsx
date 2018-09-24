import React, { Component } from 'react';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  render() {
    return (
      <div className="signup-box">
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
    );
  }
}

export default SignUp;