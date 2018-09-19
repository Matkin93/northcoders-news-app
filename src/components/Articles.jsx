import React, { Component } from 'react';
import * as api from '../api';
import { Link } from 'react-router-dom';

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
    return (
      <div>
        <ul>
          {this.state.articles.map((article, i) => {
            return <div key={article._id}>
              <li>
                <Link to={`/articles/${article._id}`}>
                  {article.title}
                </Link>
              </li>
              {article.comment_count} Comments
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