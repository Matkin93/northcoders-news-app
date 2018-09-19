import React, { Component } from 'react';
import * as api from '../api';

class User extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    this.fetchUserByUsername(username)
  }

  render() {
    console.log(this.state.user)
    return (
      <div>
        {this.state.user.name}
      </div>
    );
  }

  fetchUserByUsername = (username) => {
    api.getUserByUsername(username)
      .then(user => {
        const { userDoc } = user.data;
        this.setState({
          user: userDoc
        })
      })
  }
}

export default User;