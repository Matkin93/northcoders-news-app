import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';

class Users extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.fetchAllUsers()
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => {
            return <li key={user._id}>
              <Link to={`users/${user.username}`}>
                {user.username}
              </Link>
            </li>
          })}
        </ul>
      </div>
    );
  }

  fetchAllUsers = () => {
    api.getAllUsers().then((users) => {
      const { userDocs } = users.data;
      if (userDocs) {
        this.setState({
          users: userDocs
        })
      }
    })
  }
}

export default Users;