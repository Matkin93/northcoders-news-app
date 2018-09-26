import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SideBox from './components/SideBox';
import Articles from './components/Articles';
import Users from './components/Users';
import ProfilePage from './components/ProfilePage';
import Article from './components/Article';
import User from './components/User';
import CreateArticle from './components/CreateArticle';

class App extends Component {
  state = {
    currentUser: {
      // _id: "5b890d901c1c7c3d0a129e8d",
      // username: "happyamy2016",
      // name: "Amy Happy",
      // avatar_url: "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
      // __v: 0
    }
  }

  render() {
    const { username, _id } = this.state.currentUser;
    const { currentUser } = this.state;
    return (
      <div className="App">
        <div className="header-unit">
          <div><div className="page-title"><Link to="/articles">Northcoders News</Link>
            <Link to="/post-article" className="create-link"><div className="create-box"><i class="material-icons create-icon">add</i>
              Create Post</div></Link></div>
            {_id ? <div className="header-link">
              <i className="material-icons">person_outline</i>
              <Link to="/profile">{username}</Link>
            </div> : <div className="header-links-container">
                <div className="header-link"><Link to="/login">Login</Link></div>
                <div className="header-link"><Link to="/signup">SignUp</Link></div>
              </div>
            }
          </div>
        </div>
        <div className="main-content">
          <Route exact path="/" render={() => <Articles filter="all" />} />
          <Route exact path="/articles" render={() => <Articles filter="all" />} />
          <Route exact path="/articles/topics/:topic" render={({ match }) => <Articles match={match} filter="topic" />} />
          <Route exact path="/articles/:article_id" render={({ match }) => <Article match={match} user={_id} username={username} />} />
          <Route exact path="/users" component={Users} />
          <Route path="*/users/:username" render={({ match }) => <User match={match} />} />
          <Route path="/profile" render={() => <ProfilePage user={this.state.currentUser} logOut={this.logOut} />} />
          <Route path="/login" render={!username ? () => <Login logIn={this.logIn} /> : () => <Articles filter="all" />} />
          <Route path="/signup" component={SignUp} />
          <Route path="/404" component={Error404} />
          <Route path="/post-article" render={() => <CreateArticle user={currentUser} />} />
        </div>
      </div>
    );
  }

  logIn = (user) => {
    this.setState({
      currentUser: user[0]
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
