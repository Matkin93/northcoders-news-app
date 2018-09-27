import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VoteButtonComment from './VoteButtonComment';
import moment from 'moment';

class CommentCard extends Component {
  render() {
    const { comment, user, deleteComment } = this.props;
    return (
      <div className="comment-card-container">
        <div className="comment-card">
          <div className="comment-card-username-delete"><div>{comment.created_by.username}</div>{user === comment.created_by._id && <button className="comment-card-delete " onClick={() => deleteComment(comment._id)}>Delete</button>}</div>
          <div className="comment-card-body">{comment.body}</div>
          <div className="comment-card-vote"><VoteButtonComment comment={comment} /></div>
          <div className="comment-card-date">{moment(comment.created_at).format("MMM Do YYYY")}</div>
        </div>
      </div>
    );
  }
}

export default CommentCard;