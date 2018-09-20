import React from 'react';

const ProfilePage = (props) => {
  if (typeof props.user === 'object') {
    const { user } = props;
    return (
      <div>
        <h2>Hello {user.name}</h2>
        <p>Username: {user.username}</p>
        <img src={user.avatar_url} alt="user-avatar" className="profile-page-img" />
      </div>
    );
  } else {
    return <h2>Error: No User Information Found</h2>
  }
};

export default ProfilePage;