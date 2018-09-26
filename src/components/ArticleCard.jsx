import React from 'react';
import { Link } from 'react-router-dom';
import VoteButton from './VoteButton';
import moment from 'moment';

const ArticleCard = (props) => {
  const { article } = props;
  let upperCaseTopic = article.belongs_to.split('')
  upperCaseTopic[0] = upperCaseTopic[0].toUpperCase();
  return (
    <div className="article-card-container">
      <div className="flex-item-title"><Link to={`/articles/${article._id}`} className="article-card-title">{article.title}</Link></div>
      <div className="flex-item-body">{article.body.split('.')[0]}.{article.body.split('.')[1]}...</div>
      <div className="flex-item-vote-comments"><div className="flex-item-comments"><i className="material-icons comment">comment</i>{article.comment_count} Comments</div><VoteButton article={article} /></div>
      <div className="flex-item-topic-user"><Link to={`/articles/topics/${article.belongs_to}`}>{upperCaseTopic}</Link><div>Posted by: {article.created_by.username + " " + moment(article.created_at).fromNow()} </div></div>
    </div>
  );
};

export default ArticleCard;