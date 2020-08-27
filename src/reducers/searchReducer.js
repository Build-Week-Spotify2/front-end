export const initialState = {
    hasSearched: false,
    songs: [{}]
}

export const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SEARCHED_SONGS':
            return {
                ...state,
                hasSearched: true,
                songs: action.payload
            };

            default:
                return state;
    }
}