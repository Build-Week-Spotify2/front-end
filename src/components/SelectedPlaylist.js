import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import styled from 'styled-components';

const SelectedPlaylist = (props) => {

    const [songId, setSongId] = useState()


useEffect(() => {
    axiosWithAuth()
    .post(`/playlist_songs/${props.playlist.id}/${songId}`)
        .then((res) => {
            console.log('added song to playlist', res)
        })
        .catch((res) => {
            console.log('failed to add song to playlist', res)
        })
}, [songId])

const addSong = () => {
    axiosWithAuth()
        .post('/songs', props.songToAdd)
            .then((res) => {
                console.log('add to database success', res)
                setSongId(res.data[0].id)
            })
            
            .catch((res) => {
                console.log('add to database failed', res)
            })
}

    return(<>
        <p>{props.playlist.title}</p>
        <div onClick={() => addSong()}>Add Song</div>
    </>)
}

const mapStateToProps = state => {
    return {
        playlistsOnProps: state.playlistReducer
    }
}

export default connect(
    mapStateToProps,
    {}
)(SelectedPlaylist)