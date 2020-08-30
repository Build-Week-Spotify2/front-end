import React, {useEffect} from 'react';
import axios from 'axios';
import {axiosWithAuth} from '../utils/axiosWithAuth'
import styled from 'styled-components';
import {connect} from 'react-redux';
import {removeFaves} from '../actions/favesActions';
import {setGraphData} from '../actions/graphActions';

const SavedSongContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 10px;

`

const SongImage = styled.div`
    width: 100px;
    height: 100px;
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

    &:hover {
        background-color: red;
        cursor: pointer;
        font-weight: 900;
        color: black;
    }
`


const SavedSong = (props) => {

    const deleteSong = () => {
        axiosWithAuth()
        .delete(`/songs/${props.songData.id}`)
        .then((res) => {
            console.log('succesfully deleted', res)
        })
        
        .catch((res) => {
            console.log('failed deletion', res)
        })
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
    
    <SavedSongContainer>
        <SongImage>
        <img src={props.songData.image_url} alt='Album Artwork'/>
        </SongImage>

        <SongInfo>
            <p>Artist: {props.songData.artist}</p>
            <p>Album: {props.songData.album}</p>
            <p>Song: {props.songData.title}</p>
        </SongInfo>

        <RemoveSong onClick={ () => {deleteSong()}}>
            X
        </RemoveSong>
        <RemoveSong onClick={ () => {getVisual()}}>
            ?
        </RemoveSong>
    </SavedSongContainer>
        
    </>)
}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer,
        visualsOnProps: state.graphReducer
    }
}

export default connect(
    mapStateToProps,
    {removeFaves, setGraphData}
)(SavedSong)