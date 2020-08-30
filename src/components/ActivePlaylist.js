import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {connect} from 'react-redux';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import SongOnPlaylist from './SongOnPlaylist';
import styled from 'styled-components';
import Graph from './Graph';
import {setUserSongs, focusSongsOnPlaylist, songsOnPlaylist, purgePlaylistData} from '../actions/activePlaylistActions';

const SongContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;
`

const ActivePlaylist = (props) => {
    let history = useHistory();
    const params = useParams();

    const [playlistIds, setPlaylistIds] = useState()

    

    useEffect(() => {
        axiosWithAuth()
        .get('/songs')
        .then((res) => {
            console.log('pulled songs', res)
            props.setUserSongs(res.data)
        })
        .catch((res) => console.log('failed song pull', res))
    }, [])

    const getPlaylistTracks = () => {
        props.activePlaylistOnProps.songIds.map(song => (
            axiosWithAuth()
            .get(song)
            .then((res) => {
                console.log('individual song pull', res)
                props.songsOnPlaylist(res.data)
            })
            .catch((res) => console.log('failed individual song pull', res))

        ))
    }

    useEffect(() => {
        getPlaylistTracks()
    }, [props.activePlaylistOnProps.songIds])
        
   
  

    useEffect(() => {
        const id = params.id

        axiosWithAuth()
            .get(`/playlist_songs/${id}`)
            .then((res) => {
                console.log('succesful playlist pull', res)
                props.focusSongsOnPlaylist(res.data.map(item => {
                    return ('/songs/' + item.song_id)
                }))
            })
            .catch((res) => console.log('failed playlist pull', res))
    }, [params.id])

    return(<>

        {props.visualsOnProps.isHidden ? (
            <SongContainer>
                <p onClick={() => {history.goBack(); props.purgePlaylistData()}}> ← </p>
                {props.activePlaylistOnProps.songsOnPlaylist.map(item => (
                <SongOnPlaylist playlistId={params.id} key={item.spotify_id} songData={item} />
                ))}
            </SongContainer>

                ) : (

            <Graph />

        )}
        
    </>)
}

const mapStateToProps = state => {
    return {
        activePlaylistOnProps: state.activePlaylistReducer,
        visualsOnProps: state.graphReducer

    }
}

export default connect(
    mapStateToProps,
    {setUserSongs, focusSongsOnPlaylist, songsOnPlaylist, purgePlaylistData}
)(ActivePlaylist)