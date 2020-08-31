export const initialState = {
    usersPlaylists: [{}],
    isAdding: false,
    isEditing: false,
    isSelecting: false,
    songToAdd: {}
}

export const playlistReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATE_PLAYLIST':
            return {
                ...state,
                isAdding: true
            };
        
        case 'CANCEL_CREATE_PLAYLIST':
            return{
                ...state,
                isAdding: false
            };

        case 'ADD_PLAYLIST':
            return {
                ...state,
                usersPlaylists: action.payload,
                isAdding: false
            };
        
        case 'ADD_NEW_PLAYLIST':
            return {
                ...state,
                userPlaylists: state.userPlaylists.concat(action.payload)
            }

        case 'SELECT_PLAYLIST':
            return {
                ...state,
            isSelecting: true
            };

        case 'SET_SONG_TO_ADD':
            return {
                ...state,
                songToAdd: action.payload
            };

        case 'EDIT_PLAYLIST':
            return {
                ...state,
                isEditing: true
            };
        
        case 'PLAYLIST_UPDATED':
            return {
                ...state,
                isEditing: false
            };

        case 'DELETE_PLAYLIST':
            return {
                usersPlaylists: [
                    ...state.usersPlaylists.filter(list => list !== action.payload)
                ]
            };

            default:
                return state;
    }
}