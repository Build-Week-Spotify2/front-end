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
    border: 1px solid white;
`
const Playlist = (props) => {

    useEffect(() => {
        props.purgePlaylistData()
    }, [])


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
        <p>{playlistName}</p>
        <div onClick={() => {setEdit()}}>edit</div>
        <div onClick={() => {deletePlaylistEntry(); props.deletePlaylist(props.playlistData)}}>Delete</div>
        <Link to={`/playlist/${props.playlistData.id}`}>View</Link>
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