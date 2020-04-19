import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './store/actions/authAction';

import { Provider } from 'react-redux';
import store from './store/store';

import Landing from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './common/components/Navbar';
import Home from './components/home/Dashboard';

import './App.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Route exact path="/" component={ Landing } />
            <Route exact path="/register" component={ Register } />
            <Navbar />
              <Route exact path="/dashboard" component={ Home } />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;