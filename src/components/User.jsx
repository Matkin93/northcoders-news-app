import React, { Component } from 'react';
import * as api from '../api';
import PropTypes from 'prop-types';

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
        <img src={this.state.user.avatar_url} alt="user-avatar" />
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

User.propTypes = {
  match: PropTypes.object
}

export default User;