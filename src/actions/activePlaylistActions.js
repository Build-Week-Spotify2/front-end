export const setUserSongs = songs => {
    return {type: 'SET_USER_SONGS', payload: songs}
}

export const focusSongsOnPlaylist = songs => {
    return {type: 'FOCUS_SONGS_ON_PLAYLIST', payload: songs}
}

export const songsOnPlaylist = songs => {
    return {type: 'SONGS_ON_PLAYLIST', payload: songs}
}

export const purgePlaylistData = data => {
    return {type: 'PURGE_PLAYLIST_DATA', payload: data}
}