import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import SuggestedSong from './SuggestedSong';
import {useHistory} from 'react-router-dom';
import Graph from './Graph';

const SuggestionsContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;
`
const Back = styled.span`
    font-size: 25px;
    font-weight: 900;

    &:hover {
        background-color: #1DB954;
        border-radius: 10px;
        padding: 0px 5px;
        cursor: pointer;
        font-weight: 900;
    }

`


const SuggestedSongs = (props) => {
    let history = useHistory();

    return(<>
        {props.visualsOnProps.isHidden ? (

            <SuggestionsContainer>
            <Back onClick={() => history.goBack()}>← </Back>
            {props.suggestionsOnProps.suggestedSongData.map(song => (
            <SuggestedSong key={song.id} songData={song} />
            ))}
            </SuggestionsContainer>

        ) : (

            <Graph />

        )}
   
    </>)
}


const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer,
        suggestionsOnProps: state.suggestionsReducer,
        visualsOnProps: state.graphReducer
    }
}

export default connect(
    mapStateToProps,
    {}
)(SuggestedSongs)
