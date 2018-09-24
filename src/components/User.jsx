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
      <div className="user-profile-container">
        <img src={this.state.user.avatar_url} alt="user-avatar" className="user-profile-avatar" />
        <h2 className="user-profile-username">{this.state.user.username}</h2>
        <p className="user-profiel-name">Name: {this.state.user.name}</p>
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