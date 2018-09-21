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
      <div>
        <button className="vote-button-up" disabled={this.state.voteChange === 1} onClick={() => this.voteArticle(_id, 'up')}>
          <i className="material-icons">arrow_upward</i>
        </button>
        <div style={{ color: numberColour }}>
          {votes + this.state.voteChange}
        </div>
        <button className="vote-button-down" disabled={this.state.voteChange === -1} onClick={() => this.voteArticle(_id, 'down')}>
          <i className="material-icons">arrow_downward</i>
        </button>
      </div>
    );
  }

  voteArticle = (articleId, vote) => {
    api.voteArticle(articleId, vote).then((res) => {
      let voteDirection = 0;
      if (vote === 'up') voteDirection++;
      else voteDirection--;
      this.setState({
        voteChange: voteDirection
      }, () => { console.log(this.state) })
    })
  }
}

export default VoteButton;