import React, { Component } from 'react';
import * as api from '../api';

class CreateArticle extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
    topics: []
  }

  componentDidMount() {
    api.getTopics().then(({ data }) => {
      this.setState({
        topics: data.topicDocs
      }, () => console.log(this.state))
    })
  }

  render() {
    const { title, body, topic, topics } = this.state;
    return (
      <div className="create-article">
        <form onSubmit={this.addArticle} className="create-article-input">
          <select className="topics-select" name="create-article-topic" id="create-article-topic">
            <option value="choose">Choose a topic...</option>
            {topics.map(topic => <option value={topic.slug} key={topic._id}>{topic.title}</option>)}
          </select>
          <textarea onChange={this.handleTitle} value={title} className="post-article-title" placeholder="Your Title..." maxLength="100"></textarea>
          <textarea onChange={this.handleBody} value={body} className="post-article-body" placeholder="Your Text..."></textarea>
          <button type="submit" className="post-button" >Post</button>
        </form>
      </div>
    );
  }

  handleBody = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  handleTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleTopic = (e) => {
    console.log(e)
    this.setState({
      topic: e.target.value
    })
  }

  addArticle = (e) => {
    e.preventDefault();
    console.log(e);
    const { _id } = this.props.user;
    const { title, body, topic } = this.state;

    const article = {
      created_by: _id,
      title: title,
      body: body
    }
    api.postArticle(article, topic)
      .then(res => console.log(res))
  }
}

export default CreateArticle;