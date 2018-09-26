import React from 'react';
import VoteButton from './VoteButton';
import { Link } from 'react-router-dom';
import moment from 'moment';

const FullArticleCard = (props) => {
  const { upperCaseTopic, article } = props;
  return (
    <div className="article-card-container-main">
      <div className="flex-item-title">{article.title}</div>
      <div className="flex-item-body">{article.body}</div>
      <div className="flex-item-vote-comments"><div className="flex-item-comments"><i className="material-icons comment">comment</i>{article.comment_count} Comments</div><VoteButton article={article} /></div>
      <div className="flex-item-topic-user"><Link to={`/articles/topics/${article.belongs_to}`}>{upperCaseTopic}</Link><div>Posted by: {article.created_by.username + " " + moment(article.created_at).format("MMM Do YYYY")} </div></div>
    </div>
  );
};

export default FullArticleCard;