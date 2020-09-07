export const  createPlaylist = toggle => {
    return {type: 'CREATE_PLAYLIST', payload: toggle}
}

export const addPlaylist = playlistToAdd => {
    return {type: 'ADD_PLAYLIST', payload: playlistToAdd}
}

export const cancelAdd = canceledList => {
    return {type: 'CANCEL_CREATE_PLAYLIST', payload: canceledList}
}

export const addNewPlaylist = newPlaylist => {
    return {type: 'ADD_NEW_PLAYLIST', payload: newPlaylist}
}

export const selectPlaylist = list => {
    return {type: 'SELECT_PLAYLIST', payload: list}
}

export const setSongToAdd = song => {
    return {type: 'SET_SONG_TO_ADD', payload: song}
}

export const selectToEdit = list => {
    return {type: 'EDIT_PLAYLIST', payload: list}
}

export const playlistUpdated = list => {
    return {type: 'PLAYLIST_UPDATED', payload: list}
}

export const deletePlaylist = list => {
    return {type: 'DELETE_PLAYLIST', payload: list}
}

export const purgeUserPlaylists = list => {
    return {type: 'PURGE_USER_PLAYLIST', payload: list}
}