export const initialState = {
    isLoggedIn: false,
    username: ''
}

export const signInReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                isLoggedIn: true,
                username: action.payload

            };

            default:
                return state;
    }
}