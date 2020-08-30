export const initialState = {
    isLoggedIn: false,
    user: ''
}

export const signInReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload

            };

            default:
                return state;
    }
}