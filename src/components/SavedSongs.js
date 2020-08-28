import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import SavedSong from './SavedSong'
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {connect} from 'react-redux';
import {setFaves, removeFaves} from '../actions/favesActions';
import Graph from './Graph';

const SavedSongsContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;
`



const SavedSongs = (props) => {

    const [favoriteSongs, setFavorites] = useState([{}])

    useEffect(() => {
        axiosWithAuth()
        .get('/songs')
        .then((res) => {
            console.log('song pull', res)
            setFavorites(res.data)
            props.setFaves(res.data)
        })
        .catch((res) => {
            console.log('failed song pull', res)
        })
    }, [])



    return(<>
    {props.visualsOnProps.isHidden ? (

        <SavedSongsContainer>
        {favoriteSongs.map(song => (
            <SavedSong key={song.id} songData={song} />
        ))}
        </SavedSongsContainer>

        ) : (
        <Graph />  
        )}
        
    </>)
}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer,
        visualsOnProps: state.graphReducer

    }
}

export default connect(
    mapStateToProps,
    {setFaves, removeFaves}
)(SavedSongs)