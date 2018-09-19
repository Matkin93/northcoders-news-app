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
    return (
      <div>
        <h2>{this.state.user.username}</h2>
        <p>Name: {this.state.user.name}</p>
        <img src={this.state.user.avatar_url} />
      </div>
    );
  }

  fetchUserByUsername = (username) => {
    api.getUserByUsername(username)
      .then(user => {
        const { userDoc } = user.data;
        this.setState({
          user: userDoc[0]
        })
      })
  }
}

export default User;