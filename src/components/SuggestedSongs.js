import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import SuggestedSong from './SuggestedSong';

const SuggestionsContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;
`

const SuggestedSongs = (props) => {

    return(<>
        <SuggestionsContainer>
        {props.suggestionsOnProps.suggestedSongData.map(song => (
            <SuggestedSong key={song.id} songData={song} />
        ))}
        </SuggestionsContainer>
    </>)
}


const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer,
        suggestionsOnProps: state.suggestionsReducer
    }
}

export default connect(
    mapStateToProps,
    {}
)(SuggestedSongs)
