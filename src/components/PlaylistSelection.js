import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {addPlaylist} from '../actions/playlistActions';
import SelectedPlaylist from './SelectedPlaylist';

const PlaylistSelection = (props) => {

    let history = useHistory();

    useEffect(() => {
        fetchPlaylists();
      }, [])
  
      const fetchPlaylists = () => {
          axiosWithAuth()
          .get('/playlists/2')
          .then((res) => {
              console.log('users playlists', res)
              props.addPlaylist(res.data)
          })
          .catch((res) => {
              console.log('failed to retrieve playlists', res)
          })
      }

    return(<>
        <p>Playlist Editor</p>
        <div onClick={() => history.goBack()}>Back</div>
        {props.playlistsOnProps.usersPlaylists.map(list => (
            <SelectedPlaylist key={list.id} playlist={list} songToAdd={props.playlistsOnProps.songToAdd} />
        ))}
    </>)
}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer,
        visualsOnProps: state.graphReducer,
        playlistsOnProps: state.playlistReducer
    }
}

export default connect(
    mapStateToProps,
    {addPlaylist}
)(PlaylistSelection)