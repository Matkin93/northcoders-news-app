import React from 'react';

const ProfilePage = (props) => {
  const { user } = props;
  return (
    <div>
      Hello {user.username}
      <img src={user.avatar_url} className="profile-page-img" />
    </div>
  );
};

export default ProfilePage;