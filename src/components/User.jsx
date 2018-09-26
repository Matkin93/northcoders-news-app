import React, { Component } from 'react';
import * as api from '../api';
import PropTypes from 'prop-types';
import profileImg from '../assets/default-user.png'

class User extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    this.fetchUserByUsername(username)
  }

  render() {
    const { avatar_url, username, name } = this.state.user;
    console.log(avatar_url);
    return (
      <div className="user-profile-container">
        <img src={avatar_url} alt="user-avatar" className="user-profile-avatar" onError={(e) => { e.target.src = profileImg }} />
        <h2 className="user-profile-username">{username}</h2>
        <p className="user-profiel-name">Name: {name}</p>
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