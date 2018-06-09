import React, { Component } from 'react';
import './App.css';

import {Route} from 'react-router';

import Appbar from './components/Appbar/Appbar';
import Main from './components/Main/Main';
import SignUp from "./components/SignUp";

import { withStyles } from '@material-ui/core/styles';

const styles = {
	root: {
		flexGrow: 1,
	},
};

class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Appbar />
        <Route path='/main' render={props => <Main />} />
        <Route path='/signup' render={props => <SignUp />} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
