import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {spotifyWithAuth} from '../utils/spotifyWithAuth';
import {connect} from 'react-redux';
import {setFaves} from '../actions/favesActions';
import {setSuggestions, setSuggestedData} from '../actions/suggestionActions';
import {selectPlaylist, setSongToAdd} from '../actions/playlistActions';
import {useHistory, Link} from 'react-router-dom';

const ResultsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 800px;

    @media (max-width: 500px) {
        flex-direction: column;
    }
`
const SearchInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const SearchImage = styled.div`
    width: 100px;
    height: 100px;
`
const SearchText = styled.div`
    color: white;
    line-height: 1.2em;
    margin-left: 7px;
`
const Functionality = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;

    @media (max-width: 500px) {
        flex-direction: row;
        justify-content: space-evenly;
    }
`
const AddSong = styled.div`
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

const SearchResults = (props) => {

    const [suggestedSongs, setSuggestedSongs] = useState([])

    useEffect(() => {
        spotifyWithAuth()
        .get(`tracks/?ids=${props.suggestionsOnProps.suggestionIds.toString()}`)
        .then((res) => {
            console.log('suggested song data', res)
            props.setSuggestedData(res.data.tracks)
            setSuggestedSongs(res.data.tracks)    
        })
    }, [props.suggestionsOnProps.suggestionsMade])
    

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

    const addFavorite = () => {
        axiosWithAuth()
        .post('/songs', songInfo)
        .then((res) => console.log('succesul post', res))
        .then((res) => {
            props.setFaves(songInfo)
        })
        .catch((err) => console.log(err))
    }


    let history = useHistory();
    const suggestSongs = () => {
        axios
            .post(`https://ds-bw-spotify.herokuapp.com/predict?item=${props.songData.id}`)
            .then((res) => {
                console.log('song suggestions pulled', res)
                props.setSuggestions(res.data.recommendations)
                history.push('/suggested-songs')
            })
            .catch((res) => console.log('failed song suggestions', res))
    }




    return(<>
            
            <ResultsContainer>

            <SearchInfo >  
                <SearchImage>
                    <img src={props.songData.album.images[0].url} alt='Album Artwork'/>   
                </SearchImage>
                <SearchText>
                    <p>Artist: {props.songData.artists[0].name}</p>
                    <p>Album: {props.songData.album.name}</p>
                    <p>Song: {props.songData.name}</p>
                </SearchText>   
            </SearchInfo>
    
            <Functionality>
                {/* <AddSong onClick={ () => props.selectPlaylist()}>Save</AddSong> */}
                <Link to='/select-playlist'><AddSong onClick={() => props.setSongToAdd(songInfo)}>Add</AddSong></Link>
                <AddSong onClick={ () => {suggestSongs()}}>Similar</AddSong>
            </Functionality>
        
        </ResultsContainer>
        


</>)
}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer,
        suggestionsOnProps: state.suggestionsReducer,
        playlistsOnProps: state.playlistReducer,
        searchOnProps: state.searchReducer
    }
}

export default connect(
    mapStateToProps,
    {setFaves, setSuggestions, setSuggestedData, selectPlaylist, setSongToAdd}
)(SearchResults)