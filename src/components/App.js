import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import LandingPage from './landing-page';
import CheatSheet from './CheatSheet'
import { connect } from 'react-redux';
import './App.css'


export class App extends React.Component {
  componpentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }
  render() {
    return (
      <div id="main" className="app">
        <Route exact path='/' component={LandingPage} />
        <Route exact path ="/dashboard" component={CheatSheet} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect()(App));
