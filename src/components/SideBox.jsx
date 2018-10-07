import React from 'react';
import { Link } from 'react-router-dom';

const SideBox = (props) => {
  const { topics } = props;
  return (
    <div className="side-box">
      <li key='all'>
        <Link to={`/articles`}>
          All
          </Link>
      </li>
      {topics.map(topic => {
        return <li key={topic._id}>
          <Link to={`/articles/topics/${topic.slug}`}>
            {topic.title}
          </Link>
        </li>
      })}
    </div>
  );
};


export default SideBox;