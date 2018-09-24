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
import logo from './assets/northcoders-logo.png';

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
    const { username, _id } = this.state.currentUser;
    return (
      <div className="App">
        <div className="header-unit">
          <h1 className="northcoders-news-title"> <Link to="/articles"><img src={logo} className="northcoders-logo" alt="Northcoders Logo" /></Link><div className="news-outer">( <span className="news-inner">news</span> )</div></h1>
          {/* {Links to pages} */}
          <div className="top-links">
            {username && <div className="header-link">
              <i className="material-icons">person_outline</i>
              {_id && <Link to="/profile">{username}</Link>}
            </div>}
            {!_id && <div className="header-link"><Link to="/login">Login</Link></div>}
            {!_id && <div className="header-link"><Link to="/signup">SignUp</Link></div>}
          </div>
        </div>
        {/* {Routes for Links} */}
        <div className="main-content">
          <Route exact path="/" render={() => <Articles filter="all" />} />
          <Route exact path="/articles" render={() => <Articles filter="all" />} />
          <Route exact path="/articles/topics/:topic" render={({ match }) => <Articles match={match} filter="topic" />} />
          <Route exact path="/articles/:article_id" render={({ match }) => <Article match={match} user={_id} />} />
          <Route exact path="/users" component={Users} />
          <Route path="*/users/:username" render={({ match }) => <User match={match} />} />
          <Route path="/topics" component={TopicsBox} />
          <Route path="/profile" render={() => <ProfilePage user={this.state.currentUser} logOut={this.logOut} />} />
          <Route path="/login" render={!this.state.currentUser.username ? () => <Login logIn={this.logIn} /> : () => <Articles filter="all" />} />
          {/* <Route path="/login" render={() => <Login logIn={this.logIn} />} /> */}
          <Route path="/signup" component={SignUp} />
          <Route path="/404" component={Error404} />
        </div>
      </div>
    );
  }

  logIn = (user) => {
    this.setState({
      currentUser: user[0]
    }, () => {


    })
  }

  logOut = () => {
    this.setState({
      currentUser: {}
    })
  }
}

function Error404(props) {
  return <div className="page404">
    <h1>404: Page Not Found</h1>
  </div>
}

export default App;
