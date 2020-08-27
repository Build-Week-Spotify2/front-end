import React, {useEffect} from 'react';
import styled from 'styled-components';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {connect} from 'react-redux';
import {setFaves} from '../actions/favesActions';


const ResultsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

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
    // useEffect(() => {
    //     props.setFaves(props.songData)
    // }, [])

    const addFavorite = () => {
        props.setFaves(props.songData)
        axiosWithAuth()
        .post('/songs', props.favesOnProps)
        .then((res) => console.log('succesul post', res))
        .catch((err) => console.log(err))
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
            <AddSong onClick={ () => addFavorite()}>Save</AddSong>
            <AddSong>Suggest</AddSong>
        </Functionality>
    
    </ResultsContainer>

</>)
}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer
    }
}

export default connect(
    mapStateToProps,
    {setFaves}
)(SearchResults)