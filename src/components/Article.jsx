import React, { Component } from 'react';
import Comments from './Comments';
import VoteButton from './VoteButton';
import * as api from '../api'
import { Link } from 'react-router-dom';

class Article extends Component {
  state = {
    article: [],
    comments: []
  }

  componentDidMount() {
    const { article_id } = this.props.match.params;
    this.fetchArticle(article_id)
    this.fetchArticleComments(article_id)
  }

  render() {
    return (
      <div className="article-main">
        <h2>{this.state.article.title}</h2>
        <p>{this.state.article.body}</p>
        <h3>Comments:</h3>
        <ul>
          {this.state.comments.map(comment => {
            return <div key={comment._id}>
              <Link to={`users/${comment.created_by.username}`}>
                {comment.created_by.username}
              </Link>
              <li>
                {comment.body}
              </li>
            </div>
          })}
        </ul>
      </div>
    );
  }

  fetchArticle = (article_id) => {
    api.getArticleById(article_id)
      .then(article => {
        const { articleDoc } = article.data;
        this.setState({
          article: articleDoc
        })
      })
  }

  fetchArticleComments = (article_id) => {
    api.getArticleCommentsById(article_id)
      .then(comments => {
        const { commentDocs } = comments.data;
        this.setState({
          comments: commentDocs
        })
      })
  }
}

export default Article;