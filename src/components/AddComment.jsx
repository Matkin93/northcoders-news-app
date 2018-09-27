import React, { Component } from 'react';
import * as api from '../api';
import PropTypes from 'prop-types';

class AddComment extends Component {
  state = {
    input: '',
    loadingComment: false
  }
  render() {
    return (
      <div className="add-comment-container">
        <div className="add-comment-title">Post comment as {this.props.username}</div>
        <textarea value={this.state.input} onChange={this.handleInput} className="add-comment-input" placeholder="Add your comment here!"></textarea>
        <div className="add-comment-bottom"><button type="submit" className="add-comment-button">Comment</button></div>
      </div>
    );
  }

  handleInput = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  addComment = (e) => {
    e.preventDefault();
    const { articleId, userId, addCommentToState } = this.props;
    api.addComment(articleId, {
      body: this.state.input,
      belongs_to: articleId,
      created_by: userId
    }).then((res) => {
      addCommentToState(res)
    })
    this.setState({
      input: ''
    })
  }
}

AddComment.propTypes = {
  articleId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

export default AddComment;