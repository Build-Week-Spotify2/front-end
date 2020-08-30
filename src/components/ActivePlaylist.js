import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {connect} from 'react-redux';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {setUserSongs, focusSongsOnPlaylist, songsOnPlaylist, purgePlaylistData} from '../actions/activePlaylistActions';

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
        {/* {props.activePlaylistOnProps.songsOnPlaylist.length ? (<>
            <p onClick={() => {history.goBack(); props.purgePlaylistData()}}>GoBack</p>

            {props.activePlaylistOnProps.songsOnPlaylist.map(item => (
                <div>
                    <h2>{item.artist}</h2> | <p>{item.title}</p>
                </div>

            ))}
            

        </>) : (
            <p>Just a sec while we load your playlist</p>
        )} */}
<p onClick={() => {history.goBack(); props.purgePlaylistData()}}>GoBack</p>
{props.activePlaylistOnProps.songsOnPlaylist.map(item => (<>
    
                <div>
                    <h2>{item.artist}</h2> | <p>{item.title}</p>
                </div>

            </>))}
        
    </>)
}

const mapStateToProps = state => {
    return {
        activePlaylistOnProps: state.activePlaylistReducer

    }
}

export default connect(
    mapStateToProps,
    {setUserSongs, focusSongsOnPlaylist, songsOnPlaylist, purgePlaylistData}
)(ActivePlaylist)