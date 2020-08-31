import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {createPlaylist, addPlaylist, addNewPlaylist, cancelAdd} from '../actions/playlistActions';
import Playlist from './Playlist';


const FormContainer = styled.div`
    padding: 10px 10px;
    box-shadow: 2px 2px 5px 5px black;
    margin: 0 auto;
    max-width: 500px;
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

    &:hover {
        background-color: #1DB954;
        cursor: pointer;
        font-weight: 900;
    }
`

const PlaylistsContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;
`
const CreatePlaylist = styled.div`
    margin: 0 auto;
    color: white;
    text-align: center;
    width: 100px;
    padding: 5px 3px;
    border-radius: 20px;
    background-color: black;

    &:hover {
        background-color: #1DB954;
        cursor: pointer;
        font-weight: 900;
    }
`

const Playlists = (props) => {
    //my user id is 2


    const [formState, setFormState] = useState({
        title: '',
        user_id: localStorage.getItem('user-id')
        //this will need to be updated to pull in user's Id dynamically
    })

    useEffect(() => {
      fetchPlaylists();
    }, [])

    const fetchPlaylists = () => {
        axiosWithAuth()
        .get(`/playlists/${formState.user_id}`)
        .then((res) => {
            console.log('users playlists', res)
            props.addPlaylist(res.data)
        })
        .catch((res) => {
            console.log('failed to retrieve playlists', res)
        })
    }
        
    

    const inputChange = (e) => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]: e.target.value
        }
        setFormState(newFormData)
    }

    const createNewPlaylist = () => {
        props.createPlaylist()
    }

    const submitNewPlaylist = (e) => {
        e.preventDefault();
        axiosWithAuth()  
            .post('/playlists/', formState)
            .then((res) => {
                console.log('succesful playlist creation', res)
                addNewPlaylist(res.data[0])
            })
            .then(fetchPlaylists())
            .catch((res) => {
                console.log('failed playlist creation', res)
            })
    }

    return(<>

        {props.playlistOnProps.isAdding ? (

            <FormContainer>
                <Close onClick={() => {props.cancelAdd()}}>X</Close>
                <form id='playlist-form' onSubmit={submitNewPlaylist}>
                    <label htmlFor="title">
                        Playlist Name
                        <input
                        type="text"
                        name="title"
                        value={formState.title}
                        onChange={inputChange}
                        />
                    </label>
                    <button type="submit" >Create</button>
                </form>
            </FormContainer>            


        ) : (

        <PlaylistsContainer>
            <CreatePlaylist onClick={() => {createNewPlaylist()}}>New Playlist</CreatePlaylist>

            {props.playlistOnProps.usersPlaylists.map(list => (
                // <Link to={`/playlist/${list.id}`} >
                    <Playlist key={list.id} playlistData={list} />
                // </Link>
                
            ))}

        </PlaylistsContainer>
        
        )}

        
        
        
    </>)
}

const mapStateToProps = state => {
    return {
        playlistOnProps: state.playlistReducer,
        activeLists: state.activePlaylistReducer

    }
}

export default connect(
    mapStateToProps,
    {createPlaylist, addPlaylist, addNewPlaylist, cancelAdd}
)(Playlists)