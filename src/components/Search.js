import React, {useState} from 'react';
import styled from 'styled-components';
import {axiosWithAuth} from '../utils/axiosWithAuth';

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
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 10px;

    @media (max-width: 500px) {
        flex-direction: column;
    }

`

const SearchImage = styled.div`
    width: 100px;
    height: 100px;
`

const SearchText = styled.div`
    color: white;
    line-height: .5em;
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
    justify-content: center;
    align-items: center;
`

const SearchButton = styled.button`
    font-size: 15px;
    width: 85px;
    height: 30px;
    text-align: center;
    margin: 0 auto;
    padding: 5px;
    text-transform: lowercase;
    margin-left: 5px;

    @media (max-width: 550px) {
        display: none;
    }
`

const SearchInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`





const Search = () => {

    const [searchText, setSearchText] = useState()

    const searchSongs = (e) => {
        e.preventDefault();
        
        axiosWithAuth()
        .get('/songs/', searchText)
        .then((res) => console.log('search results', res))
        .catch((res) => console.log('failed search', res))
    }
    
    const handleChanges = (e) => {
        e.persist();
    
        const newSearchString = {
            ...searchText,
            [e.target.name]: e.target.value
        }
        setSearchText(newSearchString)
    }

    return(<>

        <SearchContainer>
            <SearchBarContainer>
                <SearchBar onChange={handleChanges} onSubmit={searchSongs} type='text' placeholder='Search For A Song'></SearchBar>
                <SearchButton onSubmit={searchSongs}>Search</SearchButton>
            </SearchBarContainer>
            
            
            {/* This is placeholder data, will map thruogh search results when it's encorporated to the backend */}
                <SearchResults>
                    <SearchInfo>
                        <SearchImage>
                                <img src='https://i.scdn.co/image/ab67616d00001e02eaccf766c181fa3ff24048d4' alt='Album Artwork'/>
                        </SearchImage>
                        <SearchText>
                            <p>Artist: The Ghost Inside</p>
                            <p>Album: Get What You Give</p>
                            <p>Song: Engine 45</p>
                        </SearchText>
                    </SearchInfo>
                    <Functionality>
                        <AddSong>Save</AddSong>
                        <AddSong>Suggest</AddSong>
                    </Functionality>
                    
                </SearchResults>
        </SearchContainer>
        
    </>)
}

export default Search;