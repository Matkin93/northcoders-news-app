import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import TopicsBox from './components/TopicsBox';
import Articles from './components/Articles';
import Users from './components/Users';
import ProfilePage from './components/ProfilePage';
import Article from './components/Article';
import User from './components/User';

class App extends Component {
  state = {
    currentUser: {
      _id: "5b890d901c1c7c3d0a129e8d",
      username: "happyamy2016",
      name: "Amy Happy",
      avatar_url: "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
      __v: 0
    }
  }

  render() {
    return (
      <div className="App">
        <div className="header-unit">
          <h1 className="northcoders-news-title"> <img src="./resources/images/northcoders-logo.png" className="northcoders-logo" alt="Northcoders Logo" /><div className="news-outer">( <span className="news-inner">news</span> )</div></h1>
          {/* {Links to pages} */}
          <div className="top-links">
            <Link to="/users">Users</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/topics">Topics</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </div>
        </div>

        {/* {Routes for Links} */}
        <div className="main-content">
          <Route exact path="/" render={() => <Articles filter="all" />} />
          <Route exact path="/articles" render={() => <Articles filter="all" />} />
          <Route exact path="/articles/topics/:topic" render={({ match }) => <Articles match={match} filter="topic" />} />
          <Route exact path="/articles/:article_id" render={({ match }) => <Article match={match} />} />
          <Route exact path="/users" component={Users} />
          <Route path="*/users/:username" render={({ match }) => <User match={match} />} />
          <Route path="/topics" component={TopicsBox} />
          <Route path="/profile" render={() => <ProfilePage user={this.state.currentUser} />} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </div>
    );
  }
}

export default App;
