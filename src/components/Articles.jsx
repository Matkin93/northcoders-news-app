import React, { Component } from 'react';
import * as api from '../api';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Articles extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    if (this.props.filter === "all") this.fetchAllArticles()
    else {
      this.fetchArticlesByTopic(this.props.match.params.topic)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchAllArticles()
    }
  }

  render() {
    const sortedArticleIndexes = this.state.articles.map(article => new Date(article.created_at).getTime());
    sortedArticleIndexes.sort((a, b) => b - a)
    const sortedArticles = [];
    this.state.articles.forEach(article => {
      sortedArticles[sortedArticleIndexes.indexOf(new Date(article.created_at).getTime())] = article
    })
    return (
      <div className="articles-list">
        <ul>
          {sortedArticles.map(article => {
            let upperCaseTopic = article.belongs_to.split('')
            upperCaseTopic[0] = upperCaseTopic[0].toUpperCase();

            return <div key={article._id} className="article-preview">
              <div className="belongs-to">{upperCaseTopic}</div>
              <li className="article-headline">
                <Link to={`/articles/${article._id}`}>
                  {article.title}
                </Link>
              </li>
              <div className="body-preview">
                {article.body.split('.')[0]}.{article.body.split('.')[1]}...
              </div>
              <div className="comments-count-created-by"><div className="comment-count">{article.comment_count} Comments </div><div className="created-by">Created by: {article.created_by.username}  ( <div className="posted-date"> {' '} {moment(article.created_at).fromNow()} </div> )</div></div>
            </div>
          })}
        </ul>
      </div>
    );
  }

  fetchAllArticles = () => {
    api.getAllArticles().then(articles => {
      const { articlesWithCommentCount } = articles.data;
      if (articlesWithCommentCount) {
        this.setState({
          articles: articlesWithCommentCount
        })
      }
    })
  }

  fetchArticlesByTopic = (topic) => {
    api.getArticlesByTopic(topic).then(articles => {
      const { articlesWithCommentCount } = articles.data;
      if (articlesWithCommentCount) {
        this.setState({
          articles: articlesWithCommentCount
        })
      }
    })
  }


}

export default Articles;