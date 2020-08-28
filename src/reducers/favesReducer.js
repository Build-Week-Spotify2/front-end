export const initialState = {
   favoriteSongs: []
  

}

export const favesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FAVORITE_SONG':
            return {
                ...state, 
                favoriteSongs: state.favoriteSongs.concat(action.payload)
                // favoriteSongs: [...state.favoriteSongs, action.payload]   
            }
            //there is a bug in this reducer. I need to figue out how to make sure that it sifts through the existing state & remove any duplicate Ids to return an array of objects with no duplicate vlaues


        case 'REMOVE_FAVORITE_SONG':
            return {
                ...state,
                favoriteSongs: state.favoriteSongs.filter(item => {
                    if (item.id !== action.payload.id) {
                        return {
                            ...state,
                            favoriteSongs: state.favoriteSongs.concat(item)
                        }
                    }
                    return state
                })
            };

            default:
                return state;
    }
}