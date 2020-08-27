import React, {useState} from 'react';
import{connect} from 'react-redux';
import styled from 'styled-components';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import SpotifyWebApi from 'spotify-web-api-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {setSearchedSongs} from '../actions/searchActions';

const SearchContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;

    @media (max-width: 500px) {
        max-width: 450px;
    }
`

const SearchBar = styled.input`
    max-width: 425px;
    height: 15px;
    margin: 0 auto;
    background-color: white;
    border-radius: 15px; 
    color: black;
    text-align: center;

`
const SearchResults = styled.div`
    max-height: 350px;
    overflow-y : auto;

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

const Functionality = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;

    @media (max-width: 500px) {
        flex-direction: row;
        justify-content: space-evenly;
    }
`

const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SearchButton = styled.div`
    margin-left: 5px;
    background-color: black;
    padding: 10px;
    border-radius: 10px;

    &:hover {
        background-color: #1DB954;
        cursor: pointer;
        font-weight: 900;
    }
`
const LinkButton = styled.button`
    font-size: 12px;
    text-transform: lowercase;
    width: 115px;
    padding: 5px;
`

const SearchInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const SearchFunctions = styled.div`
    margin: 5px;
`

const SearchBarGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ResultsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 500px) {
        flex-direction: column;
    }
`

const Search = (props) => {
    const spotify = new SpotifyWebApi();
    const clientId = 'c1a6838f444249b69a78c89074c2e47e';
    const clientSecret = '89ba1ad2b279472fa33565b8394a748e';

    const [searchText, setSearchText] = useState({
        searchString: ''
    })
    const [spotifyToken, setToken] = useState()
    const [songs, setSongs] = useState()

    const searchSongs = (e) => {
        e.preventDefault();
        spotify.searchTracks(searchText.searchString)
        .then((res) => {
            // console.log(res.tracks.items)
            props.setSearchedSongs(res.tracks.items)
            console.log('props', props)
        })
        
        .catch((res) => {
            console.log(res)
        })
    }
    
    const handleChanges = e => {
        e.persist();
    
        const newSearchString = {
            ...searchText,
            [e.target.name]: e.target.value,
        }
        setSearchText(newSearchString)
        // console.log(searchText.searchString)
    }

    const getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret, 'utf-8').toString('base64'))
            },
            body: 'grant_type=client_credentials'
        })
        const data = result.json()
        .then((res) => {
            console.log(res.access_token)
            setToken(res.access_token)
            spotify.setAccessToken(spotifyToken)
            return data.access_token
        })
        
    }



    return(<>

        <SearchContainer>
            <SearchBarContainer>
                <SearchBarGroup>
                    <SearchBar onChange={handleChanges} onSubmit={searchSongs} type='text' name='searchString' placeholder='Search For A Song'></SearchBar>
                    <SearchButton onClick={searchSongs}><FontAwesomeIcon icon={faSearch} /></SearchButton>
                </SearchBarGroup>
                
                <SearchFunctions>
                    <LinkButton onClick={getToken}>Link Spotify</LinkButton>
                </SearchFunctions>
            </SearchBarContainer>
            
               {props.searchedSongs.hasSearched ? (
           
                <SearchResults>
                    {props.searchedSongs.songs.map((song) => (
                    <ResultsContainer key={song.id}>
                    
                        <SearchInfo >  
                            <SearchImage>
                                <img src={song.album.images[0].url} alt='Album Artwork'/>    
                            </SearchImage>
                            <SearchText>
                                <p>Artist: {song.artists[0].name}</p>
                                <p>Album: {song.album.name}</p>
                                <p>Song: {song.name}</p>
                            </SearchText>   
                        </SearchInfo>
    
                        <Functionality>
                            <AddSong>Save</AddSong>
                            <AddSong>Suggest</AddSong>
                        </Functionality>
                    
                    </ResultsContainer>
                    ))}
                </SearchResults>
               ) : (
                   <></>
                )}
        </SearchContainer>
        
    </>)
}

const mapStateToProps = state => {
    return {
        searchedSongs: state.searchReducer
    }
}

export default connect(
    mapStateToProps,
    {setSearchedSongs}
)(Search)