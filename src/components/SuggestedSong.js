import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setGraphData} from '../actions/graphActions';
import {setSongToAdd} from '../actions/playlistActions';


const SuggestedSongContainer = styled.div`
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

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

const Functionality = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`
const FunctionButton = styled.div`
    color: white;
    text-align: center;
    width: 60px;
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
const SongData = styled.div`
    display: flex;
    justify-content: left
`


const SuggestedSong = (props) => {

    const [songInfo, setSongInfo] = useState()
    useEffect(() => {
        setSongInfo({
            title: props.songData.name,
            album: props.songData.album.name,
            artist: props.songData.artists[0].name,
            spotify_id: props.songData.id,
            image_url: props.songData.album.images[0].url
        })
    }, [])

    const getVisual = () => {
        axios 
        .get(`https://ds-bw-spotify.herokuapp.com/features/${encodeURI(props.songData.name)}`)
        .then((res) => {
            console.log('visuals', res)
            props.setGraphData(res.data.features)
        })
        .catch((res) => {
            console.log('failed visuals', res)
        })

    }

    return(<>
    
    <SuggestedSongContainer>
        <SongData>
            <SongImage>
            <img src={props.songData.album.images[0].url} alt='Album Artwork'/>
            </SongImage>

            <SongInfo>
                <p>Artist: {props.songData.artists[0].name}</p>
                <p>Album: {props.songData.album.name}</p>
                <p>Song: {props.songData.name}</p>
            </SongInfo>
        </SongData>
        

        <Functionality>
            <FunctionButton onClick={ () => {getVisual()}}>Info</FunctionButton>
            <Link to='/select-playlist'><FunctionButton onClick={() => props.setSongToAdd(songInfo)}>Add</FunctionButton></Link>
        </Functionality>

    </SuggestedSongContainer>
        
    </>)
}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer,
        suggestionsOnProps: state.suggestionsReducer,
        visualsOnProps: state.graphReducer,
        playlistsOnProps: state.playlistReducer,
    }
}

export default connect(
    mapStateToProps,
    {setGraphData, setSongToAdd}
)(SuggestedSong)