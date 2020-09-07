import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {corsAxiosWithAuth} from '../utils/corsAxiosWithAuth';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {removeFaves} from '../actions/favesActions';
import {setGraphData} from '../actions/graphActions';
import {deleteSongFromPlaylist} from '../actions/activePlaylistActions';

const SongContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`
const SongData = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
`
const Functionality = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: right:
    align-items: middle;
`
const SongImage = styled.div`
    width: 100px;
    height: 100px;
    margin-right: 10px;
`
const SongInfo = styled.div`
    color: white;
    line-height: .5em;
`
const RemoveSong = styled.div`
    color: white;
    text-align: center;
    width: 30px;
    padding: 5px 0px;
    border-radius: 20px;
    background-color: #1DB954;
    margin: 5px;

    &:hover {
        background-color: red;
        cursor: pointer;
        font-weight: 900;
        color: black;
    }
`

const SongOnPlaylist = (props) => {

    const deleteSongFromList = () => {
        axiosWithAuth()
        .delete(`/playlist_songs/${props.songData.id}`)
        .then((res) => {
            console.log('deleted from list', res)
        })
        
        .catch((res) => {
            console.log('failed deletion', res)
        })   
    }

    const deleteSongFromDb = () => {
        corsAxiosWithAuth()
        .delete(`/songs/${props.songData.id}`)
        .then((res) => {console.log('succesfully deleted from DB', res)})
        .catch((res) => {console.log('failed to delete from DB', res)})
    }

    const getVisual = () => {
        axios
        .get(`https://ds-bw-spotify.herokuapp.com/features/${encodeURI(props.songData.title)}`)
        .then((res) => {
            console.log('visuals', res)
            props.setGraphData(res.data.features)
        })
        .catch((res) => {
            console.log('failed visuals', res)
        })
    }
    
    return(<>

        <SongContainer>
            <SongData>
                <SongImage>
                <img src={props.songData.image_url} alt='Album Artwork'/>
                </SongImage>

                <SongInfo>
                    <p>Artist: {props.songData.artist}</p>
                    <p>Album: {props.songData.album}</p>
                    <p>Song: {props.songData.title}</p>
                </SongInfo>
            </SongData>
           
            <Functionality>
                <RemoveSong onClick={ () => {  deleteSongFromList(); deleteSongFromDb(); props.deleteSongFromPlaylist(props.songData);}}>
                    X
                </RemoveSong>
                <RemoveSong onClick={ () => {getVisual()}}>
                    <Link to={`/playlist/${props.playlistId}/${props.songData.spotify_id}`}>?</Link>
                </RemoveSong>
            </Functionality>
           
        </SongContainer>

    </>)
}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer,
        visualsOnProps: state.graphReducer,
        activePlaylistsOnProps: state.activePlaylistReducer
    }
}

export default connect(
    mapStateToProps,
    {removeFaves, setGraphData, deleteSongFromPlaylist}
)(SongOnPlaylist)