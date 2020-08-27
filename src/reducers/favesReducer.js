export const initialState = {
    title: '',
    album: '',
    artist: '',
    image_url: '',
    song_id: ''

}

export const favesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FAVORITE_SONG':
            return {
                ...state,
                title: action.payload.name,
                album: action.payload.album.name,
                artist: action.payload.artists[0].name,
                image_url: action.payload.album.images[0].url,
                song_id: action.payload.id
            }

            default:
                return state;
    }
}