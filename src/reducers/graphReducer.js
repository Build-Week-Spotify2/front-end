export const initialOptions = {
    dataPoints: {}
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