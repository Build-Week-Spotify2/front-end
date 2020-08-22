import React from 'react';
import './App.css';
import Nav from './components/Nav';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import SavedSongs from './components/SavedSongs';
import Search from './components/Search';
import { Route, Switch } from 'react-router-dom';
import "./components/styles.css";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (<>
    <Nav/>

    <Switch> 
      <Route exact path='/' component={SignIn} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/saved-songs' component={SavedSongs} />
      <PrivateRoute path='/search-songs' component={Search} />
    </Switch>
   
  </>);
}

export default App;
