export const initialState = {
    usersSongs: [],
    songIds: [],
    songsOnPlaylist: []
}

export const activePlaylistReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER_SONGS':
            return {
                ...state,
                usersSongs: action.payload
            };

        case 'FOCUS_SONGS_ON_PLAYLIST':
            return {
               ...state,
               songIds: action.payload
               
            };

        case 'SONGS_ON_PLAYLIST':
            return {
                ...state,
                songsOnPlaylist: state.songsOnPlaylist.concat(action.payload)
            }

        case 'PURGE_PLAYLIST_DATA':
            return initialState

        case 'DELETE_SONG_FROM_PLAYLIST':
            return {
                songsOnPlaylist: [
                    ...state.songsOnPlaylist.filter(list => list ===action.payload)
                ]
            }

            default:
                return state;
    }
}