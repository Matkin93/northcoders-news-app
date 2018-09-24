import React, { Component } from 'react';
import * as api from '../api';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import VoteButton from './VoteButton';
import TopicsBox from './TopicsBox';

class Articles extends Component {
  state = {
    articles: [],
    err: null
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
    const { articles, err } = this.state;
    const sortedArticleIndexes = articles.map(article => new Date(article.created_at).getTime());
    sortedArticleIndexes.sort((a, b) => b - a)
    const sortedArticles = [];
    articles.forEach(article => {
      sortedArticles[sortedArticleIndexes.indexOf(new Date(article.created_at).getTime())] = article
    })
    if (err) return <Redirect to={{
      pathname: "/404",
      state: {
        sendTo: `/articles`
      }
    }} />
    return (
      <div className="articles-list">
        {/* <div>{this.props.filter}</div> */}
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
                  {` ` + article.created_by.username} </Link> ( <div className="posted-date"> {moment(article.created_at).fromNow()} </div> )</div></div>
              </div>
              <div className="article-box-voting">
                <VoteButton article={article} />
              </div>
            </div>
          })}
        </ul>
        <div className="side-box">
          <div>Topics</div>
          <TopicsBox />
        </div>
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
    }).catch((err) => this.setState({ err }))
  }

  voteArticle = (articleId, vote) => {
    api.voteArticle(articleId, vote)
  }
}

export default Articles;