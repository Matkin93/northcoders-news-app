import React from 'react';

const ProfilePage = (props) => {
  const { user } = props;
  return (
    <div>
      <h2>Hello {user.name}</h2>
      <p>Username: {user.username}</p>
      <img src={user.avatar_url} className="profile-page-img" />
    </div>
  );
};

export default ProfilePage;