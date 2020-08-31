import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {addPlaylist} from '../actions/playlistActions';
import SelectedPlaylist from './SelectedPlaylist';

const Back = styled.span`
    font-size: 25px;
    font-weight: 900;

    &:hover {
        background-color: #1DB954;
        border-radius: 10px;
        padding: 0px 5px;
        cursor: pointer;
        font-weight: 900;
        
    }
`

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
        <Back onClick={() => history.goBack()}>←</Back>
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