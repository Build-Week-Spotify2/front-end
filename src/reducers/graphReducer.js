export const initialOptions = {
    dataPoints: {},
    isHidden: true
}

export const graphReducer = (state = initialOptions, action) => {
    switch (action.type) {
        case 'SET_OPTIONS':
            return {
                ...state,
                dataPoints: action.payload,
                isHidden: false
            };

        case 'PURGE_OPTIONS':
            return {
                ...state,
                dataPoints: {},
                isHidden: true
            };

            default:
                return state;
    }
}