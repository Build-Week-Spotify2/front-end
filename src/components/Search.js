import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
    width: 450px;
    margin: 0 auto;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SearchBar = styled.input`
    width: 425px;
    height: 25px;
    margin: 10px 5px;
    background-color: white;
    border-radius: 15px;    

`

const Search = () => {
    return(<>

        <SearchContainer>
            <SearchBar></SearchBar>

        </SearchContainer>
        
    </>)
}

export default Search;