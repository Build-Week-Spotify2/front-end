export const initialState = {
   favoriteSongs: []
  

}

export const favesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FAVORITE_SONG':
            return {
                ...state,
                favoriteSongs: state.favoriteSongs.concat(action.payload)
                
            }

            default:
                return state;
    }
}