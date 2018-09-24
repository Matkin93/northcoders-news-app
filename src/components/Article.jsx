import React, { Component } from 'react';
import VoteButton from './VoteButton';
import * as api from '../api'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import AddComment from './AddComment';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    err: null,
    loadingArticle: true,
    loadingComments: true
  }

  componentDidMount() {
    const { article_id } = this.props.match.params;
    this.fetchArticle(article_id)
    this.fetchArticleComments(article_id)
  }

  render() {
    const sortedCommentIndexes = this.state.comments.map(comment => new Date(comment.created_at).getTime());
    sortedCommentIndexes.sort((a, b) => b - a)
    const sortedComments = [];
    this.state.comments.forEach(comment => {
      sortedComments[sortedCommentIndexes.indexOf(new Date(comment.created_at).getTime())] = comment
    })
    const { err, article, loadingArticle, loadingComments } = this.state;
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
    if (loadingArticle) return <div className="loading">Loading article...</div>
    else return (
      <div className="article-main-container">
        <div >
          <div className="article-main">
            {upperCaseTopic && <div>{upperCaseTopic}</div>}
            <h2 className="article-headline-single">{article.title}</h2>
            <p className="article-body">{article.body}</p>
            <div className="bottom-of-article">
              <div className="vote-buttons"><VoteButton article={article} /></div>
              <div className="article-username">Posted by: <Link to={`users/${this.state.article.created_by.username}`}>{" " + this.state.article.created_by.username}</Link></div>
            </div>
          </div>
          <h3>Comments:</h3>
          {loadingComments || loadingArticle ? <div className="loading">Loading Comments</div> : <div>
            <div>
              <AddComment articleId={article._id} userId={this.props.user} addCommentToState={this.addCommentToState} />
            </div>
            <ul>
              {sortedComments.map(comment => {
                return <div key={comment._id} className="comment-container">
                  <div className="comment-box">
                    <Link to={`users/${comment.created_by.username}`} className="comment-username">
                      {comment.created_by.username}
                    </Link>

                    <p className="comment-body">
                      {comment.body}
                    </p>
                    {this.props.user === comment.created_by._id && <button className="delete-comment-button" onClick={() => this.deleteComment(comment._id)}>Delete</button>}
                  </div>
                </div>
              })}
            </ul>
          </div>
          }
        </div>
      </div>
    );
  }

  fetchArticle = (article_id) => {
    api.getArticleById(article_id)
      .then(article => {
        const { articleDoc } = article.data;
        this.setState({
          article: articleDoc,
          loadingArticle: false
        })
      }).catch((err) => this.setState({ err }))
  }

  fetchArticleComments = (article_id) => {
    api.getArticleCommentsById(article_id)
      .then(comments => {
        const { commentDocs } = comments.data;
        this.setState({
          comments: commentDocs,
          loadingComments: false
        })
      })
  }

  addCommentToState = (comment) => {
    const comments = [...this.state.comments];
    comments.unshift(comment);
    this.setState({ comments })
  }

  deleteComment = (commentId) => {
    console.log(commentId)
    api.deleteComment(commentId).then(res => console.log(res))
  }
}

export default Article;