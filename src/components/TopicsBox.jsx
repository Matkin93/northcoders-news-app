import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';

class TopicsBox extends Component {
  state = {
    topics: []
  }

  componentDidMount() {
    this.fectchTopics();
  }

  render() {
    return (
      <div>
        <li key='all'>
          <Link to={`/articles`}>
            All
            </Link>
        </li>
        {this.state.topics.map(topic => {
          return <li key={topic._id}>
            <Link to={`/articles/topics/${topic.slug}`}>
              {topic.title}
            </Link>
          </li>
        })}
      </div>
    );
  }

  fectchTopics = () => {
    api.getTopics().then(topics => {
      const { topicDocs } = topics.data;
      this.setState({ topics: topicDocs })
    })
  }
}

export default TopicsBox;