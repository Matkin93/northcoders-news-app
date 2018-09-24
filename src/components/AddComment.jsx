import React, { Component } from 'react';
import * as api from '../api';
import PropTypes from 'prop-types';

class AddComment extends Component {
  state = {
    input: '',
    loadingComment: false
  }
  render() {
    console.log(this.props.articleId)
    return (
      <div>
        <form onSubmit={this.addComment} className="add-comment-form">
          {/* <textarea value={this.state.input} onChange={this.handleInput} className="comment-input" placeholder="Add your comment here!"></textarea>
          <button type="submit" className="comment-button">Comment</button> */}
          <input type="text" value={this.state.input} onChange={this.handleInput} className="comment-input" placeholder="Add your comment here!" style={{ align: 'top' }} />
        </form>
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