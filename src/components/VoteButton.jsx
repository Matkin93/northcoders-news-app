import React, { Component } from 'react';
import * as api from '../api';

class VoteButton extends Component {
  state = {
    voteChange: 0
  }
  render() {
    const { article } = this.props;
    const { _id, votes } = article;
    let numberColour = '';
    if (article.votes < 0) numberColour = 'red'
    else if (article.votes > 0) numberColour = 'rgb(0, 221, 0)'
    else numberColour = 'grey';
    return (
      <span className="vote-component">
        <button disabled={this.state.voteChange === 1} onClick={() => this.voteArticle(_id, 'up')} className="up-arrow">
          <i className="material-icons up" disabled={this.state.voteChange === 1}>arrow_upward</i>
        </button>
        <span style={{ color: numberColour }} className="vote-count">
          {votes + this.state.voteChange}
        </span>
        <button disabled={this.state.voteChange === -1} onClick={() => this.voteArticle(_id, 'down')} className="down-arrow">
          <i className="material-icons down" disabled={this.state.voteChange === -1}>arrow_downward</i>
        </button>
      </span>
    );
  }

  voteArticle = (articleId, vote) => {
    api.voteArticle(articleId, vote).then((res) => {
      let voteDirection = 0;
      if (vote === 'up') voteDirection++;
      else voteDirection--;
      this.setState({
        voteChange: voteDirection
      })
    })
  }
}

export default VoteButton;