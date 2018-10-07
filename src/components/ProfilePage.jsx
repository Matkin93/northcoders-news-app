import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = (props) => {
  if (typeof props.user === 'object') {
    const { user, logOut } = props;
    return (
      <div className="profile page">
        <div className="user-profile-container">
          <img src={user.avatar_url} alt="user-avatar" className="user-profile-avatar" />
          <h2 className="user-profile-username">{user.username}</h2>
          <p className="user-profiel-name">Hello {user.name}!</p>
          <button className="logout-button" onClick={logOut}><Link to={`/articles`}>
            Log Out</Link>
          </button>
        </div>
      </div>
    );
  } else {
    return <h2>Error: No User Information Found</h2>
  }
};

export default ProfilePage;