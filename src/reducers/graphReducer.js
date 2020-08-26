export const initialOptions = {
    Danceability: 10,
    Instrumantalism: 10,
    Acousticness: 10,
    Loudness: 10
}

export const graphReducer = (state = initialOptions, action) => {
    switch (action.type) {
        case 'SET_OPTIONS':
            return {
                ...state,
                dataPoints: action.payload
            };

            default:
                return state;
    }
}