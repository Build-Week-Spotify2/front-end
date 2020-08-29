export const initialState = {
    suggestionIds: [],
    suggestionsMade: false,
    suggestedSongData: []
}

export const suggestionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SUGGESTIONS':
            return {
                ...state,
                suggestionIds: action.payload,
                suggestionsMade: true
            };

        case 'SET_SUGGESTED_DATA':
            return {
                ...state,
                suggestedSongData: action.payload
            }

            default:
                return state;
    }
}