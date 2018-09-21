import React, { Component } from 'react';
import * as api from '../api';
import { Link } from 'react-router-dom';
import moment from 'moment';
import VoteButton from './VoteButton';

class Articles extends Component {
  state = {
    articles: [],
    // downVotedArticles: [],
    // upVotedArticles: []
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
          {sortedArticles.map((article, i) => {

            let upperCaseTopic = article.belongs_to.split('')
            upperCaseTopic[0] = upperCaseTopic[0].toUpperCase();

            return <div key={article._id} className="article-box">
              <div className="article-preview" >
                <div className="belongs-to">{upperCaseTopic}</div>
                <li className="article-headline">
                  <Link to={`/articles/${article._id}`}>
                    {'{ ' + article.title + ' }'}
                  </Link>
                </li>
                <div className="body-preview">
                  {article.body.split('.')[0]}.{article.body.split('.')[1]}...
              </div>
                <div className="comments-count-created-by"><div className="comment-count">{article.comment_count} Comments </div><div className="created-by">Posted by: <Link to={`users/${article.created_by.username}`}>
                  {article.created_by.username} </Link> ( <div className="posted-date"> {moment(article.created_at).fromNow()} </div> )</div></div>
              </div>
              <div className="article-box-voting">
                <VoteButton article={article} />
              </div>
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

  voteArticle = (articleId, vote) => {
    api.voteArticle(articleId, vote).then((res) => {
      const updateDownVotedArticles = [...this.state.downVotedArticles];
      const updateUpVotedArticles = [...this.state.upVotedArticles];
      if (vote === 'up') updateUpVotedArticles.push(articleId);
      else updateDownVotedArticles.push(articleId);
      this.setState({
        upVotedArticles: updateUpVotedArticles,
        downVotedArticles: updateDownVotedArticles
      }, () => { console.log(this.state) })
    })
  }
}

export default Articles;