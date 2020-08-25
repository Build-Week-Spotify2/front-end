import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;
`

const SearchBar = styled.input`
    width: 425px;
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

`

const SearchImage = styled.div`
    width: 100px;
    height: 100px;
`

const SearchText = styled.div`
    color: white;
    line-height: .5em;
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
`

const Search = () => {
    return(<>

        <SearchContainer>
            <SearchBar type='text' placeholder='Search For A Song'></SearchBar>
            {/* This is placeholder data, will map thruogh search results when it's encorporated to the backend */}
                <SearchResults>
                    <SearchImage>
                            <img src='https://i.scdn.co/image/ab67616d00001e02eaccf766c181fa3ff24048d4' alt='Album Artwork'/>
                    </SearchImage>
                    <SearchText>
                        <p>Artist: The Ghost Inside</p>
                        <p>Album: Get What You Give</p>
                        <p>Song: Engine 45</p>
                    </SearchText>
                    <Functionality>
                        <AddSong>Save</AddSong>
                        <AddSong>Suggest</AddSong>
                    </Functionality>
                    
                </SearchResults>
        </SearchContainer>
        
    </>)
}

export default Search;