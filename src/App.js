import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import Nav from './components/Nav';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import { Route, Switch } from 'react-router-dom';
import "./components/styles.css";
import PrivateRoute from './components/PrivateRoute';
import SuggestedSongs from './components/SuggestedSongs';
import Playlists from './components/Playlists';
import ActivePlaylist from './components/ActivePlaylist';
import PlaylistSelection from './components/PlaylistSelection';
import Graph from './components/Graph';

const App = (props) => {
  return (<>
    <Nav/>

    <Switch> 
      <Route exact path='/' component={SignIn} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/playlists' component={Playlists} />
      <PrivateRoute path='/playlist/:id' >
        <ActivePlaylist userPlaylists={props.playlistOnProps.usersPlaylists} />
      </PrivateRoute>
      <PrivateRoute path='/playlist/:id/:song' component={Graph} />
      <PrivateRoute path='/suggested-songs' component={SuggestedSongs} />
      <PrivateRoute path='/select-playlist' component={PlaylistSelection} />
    </Switch>
   
  </>);
}

const mapStateToProps = state => {
  return {
      playlistOnProps: state.playlistReducer,
      visualsOnProps: state.graphReducer


  }
}

export default connect(
  mapStateToProps,
  {}
)(App)


