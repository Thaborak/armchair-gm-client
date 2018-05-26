import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import LandingPage from './landing-page';
import CheatSheet from './CheatSheet'
import { connect } from 'react-redux';
import './App.css'


export class App extends React.Component {

  render() {
    return (
      <div id="main" className="app">
        <Route exact path='/' component={LandingPage} />
        <Route exact path ="/dashboard" component={CheatSheet} />
      </div>
    );
  }
}


// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect()(App));
