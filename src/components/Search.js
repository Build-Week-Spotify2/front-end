import React, {useState} from 'react';
import{connect} from 'react-redux';
import styled from 'styled-components';
import SpotifyWebApi from 'spotify-web-api-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {setSearchedSongs} from '../actions/searchActions';
import SearchResults from './SearchResults';

const SearchBar = styled.input`
    max-width: 425px;
    height: 15px;
    margin: 0 auto;
    background-color: white;
    border-radius: 15px; 
    color: black;
    text-align: center;

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
const SearchFunctions = styled.div`
    margin: 5px;
`

const SearchBarGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SearchContainer = styled.div`
    max-height: 350px;
    overflow-y: auto;

`

const Search = (props) => {
    
//Search Logic
    const [searchText, setSearchText] = useState({
        searchString: ''
    })

    
    const searchSongs = (e) => {
        e.preventDefault();
        spotify.searchTracks(searchText.searchString)
        .then((res) => {
            props.setSearchedSongs(res.tracks.items)
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
    }

//Spotify Auth logic
    const spotify = new SpotifyWebApi();
    const clientId = 'c1a6838f444249b69a78c89074c2e47e';
    const clientSecret = '89ba1ad2b279472fa33565b8394a748e';
    const [spotifyToken, setToken] = useState()

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

               {props.searchedSongs.hasSearched ? (<>

                {props.searchedSongs.songs.map(song => (
                    <SearchContainer>
                        <SearchResults key={song.id} songData={song} />
                    </SearchContainer>
                    
                ))}
                
              </>) : (
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