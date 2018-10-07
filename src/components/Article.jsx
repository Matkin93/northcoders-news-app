import React, { Component } from 'react';
import * as api from '../api'
import { Redirect } from 'react-router-dom'
import AddComment from './AddComment';
import CommentsList from './CommentsList';
import FullArticleCard from './FullArticleCard';

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
        <FullArticleCard upperCaseTopic={upperCaseTopic} article={this.state.article} />
        {loadingComments || loadingArticle ? <div className="loading">Loading Comments</div> : <div>
          <div>
            {this.props.user ? <AddComment articleId={article._id} userId={this.props.user} username={this.props.username} addCommentToState={this.addCommentToState} /> : <div>login to post a comment</div>}
          </div>
          <CommentsList sortedComments={sortedComments} deleteComment={this.deleteComment} user={this.props.user} />
        </div>
        }
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
    api.deleteComment(commentId)
  }
}

export default Article;