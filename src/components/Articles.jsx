import React, { Component } from 'react';
import * as api from '../api';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import VoteButton from './VoteButton';
import SideBox from './SideBox';
import ArticleCard from './ArticleCard';

class Articles extends Component {
  state = {
    articles: [],
    topics: [],
    err: null,
    loadingArticles: true
  }

  componentDidMount() {
    this.fetchTopics();
    if (this.props.filter === "all") this.fetchAllArticles()
    else {
      this.fetchArticlesByTopic(this.props.match.params.topic)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (!this.props.match) this.fetchAllArticles();
      else this.fetchArticlesByTopic(this.props.match.params.topic);
    }
  }

  render() {
    const { articles, err, loadingArticles, topics } = this.state;
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
    if (loadingArticles) return <div className="loading">Loading articles...</div>
    else return (
      <div className="main-page-articles">
        <div className="article-page">
          <div className="articles-list">
            {sortedArticles.map((article, i) => {
              return <ArticleCard article={article} key={article._id} />
            })}
          </div>
          <SideBox topics={topics} />
        </div>
      </div>
    );
  }

  fetchAllArticles = () => {
    this.setState({
      loadingArticles: true
    }, () => {
      api.getAllArticles().then(articles => {
        const { articlesWithCommentCount } = articles.data;
        if (articlesWithCommentCount) {
          this.setState({
            articles: articlesWithCommentCount,
            loadingArticles: false
          })
        }
      })
    })
  }

  fetchArticlesByTopic = (topic) => {
    this.setState({
      loadingArticles: true
    }, () => {
      api.getArticlesByTopic(topic).then(articles => {
        const { articlesWithCommentCount } = articles.data;
        if (articlesWithCommentCount) {
          this.setState({
            articles: articlesWithCommentCount,
            loadingArticles: false
          })
        }
      }).catch((err) => this.setState({ err }))
    })
  }

  voteArticle = (articleId, vote) => {
    api.voteArticle(articleId, vote)
  }

  fetchTopics = () => {
    api.getTopics().then(topics => {
      const { topicDocs } = topics.data;
      this.setState({ topics: topicDocs })
    })
  }
}

export default Articles;