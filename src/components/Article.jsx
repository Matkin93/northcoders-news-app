import React, { Component } from 'react';
import VoteButton from './VoteButton';
import * as api from '../api'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

class Article extends Component {
  state = {
    article: {},
    comments: [],
    err: null,
    loading: true
  }

  componentDidMount() {
    const { article_id } = this.props.match.params;
    this.fetchArticle(article_id)
    this.fetchArticleComments(article_id)
  }

  render() {
    const { err, article, comments, loading } = this.state;
    if (err) return <Redirect to={{
      pathname: "/404",
      state: {
        sendTo: `/articles`
      }
    }} />
    let upperCaseTopic = '';
    if (article.belongs_to) {
      let splitTopic = article.belongs_to.split('')
      splitTopic[0] = splitTopic[0].toUpperCase();
      upperCaseTopic = splitTopic.join('')
    }
    if (loading) return <div className="loading">Loading article...</div>
    else return (
      <div className="article-main-container">
        <div >
          <div className="article-main">
            {upperCaseTopic && <div>{upperCaseTopic}</div>}
            <h2 className="article-headline">{article.title}</h2>
            <p className="article-body">{article.body}</p>
            <VoteButton article={article} />
          </div>
          <h3>Comments:</h3>
          <ul>
            {comments.map(comment => {
              return <div key={comment._id} className="comment-container">
                <div className="comment-box">
                  <Link to={`users/${comment.created_by.username}`} className="comment-username">
                    {comment.created_by.username}
                  </Link>
                  <li className="comment-body">
                    {comment.body}
                  </li>
                </div>
              </div>
            })}
          </ul>
        </div>
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
      }).catch((err) => this.setState({ err }))
  }

  fetchArticleComments = (article_id) => {
    api.getArticleCommentsById(article_id)
      .then(comments => {
        const { commentDocs } = comments.data;
        this.setState({
          comments: commentDocs,
          loading: false
        })
      })
  }
}

export default Article;