import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {selectToEdit, playlistUpdated, deletePlaylist} from '../actions/playlistActions'
import {Link} from 'react-router-dom';
import {purgePlaylistData} from '../actions/activePlaylistActions';

const FormContainer = styled.div`
    border: 1px solid white;
    border-radius: 10px;
    padding-bottom: 5px;
`
const Close = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color white;
    height: 20px;
    width: 20px;
    margin: 5px;
    border-radius: 10px;
`
const PlaylistContainer = styled.div`
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 5px 5px black;
    margin: 20px;
`
const PlaylistTitle = styled.h2`
    text-align: center;
    font-size: 20px;
`
const PlaylistFunctionality = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`
const FunctionButton = styled.div`
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

const Playlist = (props) => {




    const [formState, setFormState] = useState({
        title: ''
        //this will need to be updated to pull in user's Id dynamically
    })

    const [playlistName, setPlaylistName] = useState(props.playlistData.title)

    const inputChange = (e) => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]: e.target.value
        }
        setFormState(newFormData)
    }

    const setEdit = () => {
        props.selectToEdit()
    }

    const submitEdit = (e) => {
        e.preventDefault();
        axiosWithAuth()  
            .put(`/playlists/${props.playlistData.id}`, formState)
            .then((res) => {
                console.log('succesful playlist edit', res)
                setPlaylistName(formState.title)
                props.playlistUpdated()
            })
            .catch((res) => {
                console.log('failed playlist edit', res)
            })
    }

    const deletePlaylistEntry = (e) => {
        axiosWithAuth()
            .delete(`/playlists/${props.playlistData.id}`)
            .then((res) => {
                console.log('succesful playlist deletion', res)
            })
            .catch((res) => {
                console.log('playlist deletion failed', res)
            })
    }

    return(<>

        {props.playlistOnProps.isEditing ? (

    <FormContainer>
        <Close onClick={() => props.playlistUpdated()}>X</Close>
        <form id='playlist-form' onSubmit={submitEdit}>
            <label htmlFor="title">
                New Name
                <input
                type="text"
                name="title"
                value={formState.title}
                onChange={inputChange}
                />
            </label>
            <button type="submit" >Update</button>
        </form>
    </FormContainer>


        ) : (

        
        <PlaylistContainer>
            <PlaylistTitle>{playlistName}</PlaylistTitle>
            <PlaylistFunctionality>
                <FunctionButton onClick={() => {setEdit()}}>Edit</FunctionButton>
                <FunctionButton onClick={() => {deletePlaylistEntry(); props.deletePlaylist(props.playlistData)}}>Delete</FunctionButton>
                <FunctionButton><Link to={`/playlist/${props.playlistData.id}`}>View</Link></FunctionButton>
            </PlaylistFunctionality>
        </PlaylistContainer>

        )}

    </>)
}

const mapStateToProps = state => {
    return {
        playlistOnProps: state.playlistReducer,
        activePlaylists: state.activePlaylistReducer

    }
}

export default connect(
    mapStateToProps,
    {selectToEdit, playlistUpdated, deletePlaylist, purgePlaylistData}
)(Playlist)