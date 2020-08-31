import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    box-shadow: 2px 2px 5px 5px black;
    margin: 20px;
`
const Add = styled.div`
    color: white;
    text-align: center;
    width: 80px;
    padding: 5px 3px;
    border-radius: 20px;
    background-color: black;
    margin: 5px;

    &:hover {
        background-color: #1DB954;
        cursor: pointer;
        font-weight: 900;
    }
`

const Title = styled.h2`
    color: white;
`



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
        <PlaylistContainer>
        <Title>{props.playlist.title}</Title>
        <Add onClick={() => addSong()}>Add Song</Add>
        </PlaylistContainer>
        
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