import {combineReducers} from 'redux';

import {signInReducer} from '../reducers/signInReducer';

export const rootReducer = combineReducers({
    signInReducer
})