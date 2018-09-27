import React, { Component } from 'react';
import * as api from '../api'

class VoteButtonComment extends Component {
  state = {
    voteChange: 0
  }
  render() {
    const { comment } = this.props;
    const { _id, votes } = comment;
    let numberColour = '';
    if (comment.votes < 0) numberColour = 'red'
    else if (comment.votes > 0) numberColour = 'rgb(0, 221, 0)'
    else numberColour = 'grey';
    return (
      <span className="vote-component">
        <button disabled={this.state.voteChange === 1} onClick={() => this.voteComment(_id, 'up')}>
          <i className="material-icons up-arrow" disabled={this.state.voteChange === 1}>arrow_upward</i>
        </button>
        <span style={{ color: numberColour }} className="vote-count">
          {votes + this.state.voteChange}
        </span>
        <button disabled={this.state.voteChange === -1} onClick={() => this.voteComment(_id, 'down')}>
          <i className="material-icons down-arrow" disabled={this.state.voteChange === -1}>arrow_downward</i>
        </button>
      </span>
    );
  }

  voteComment = (commentId, vote) => {
    api.voteComment(commentId, vote).then((res) => {
      let voteDirection = 0;
      if (vote === 'up') voteDirection++;
      else voteDirection--;
      this.setState({
        voteChange: voteDirection
      })
    })
  }
}

export default VoteButtonComment;