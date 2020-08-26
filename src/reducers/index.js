import {combineReducers} from 'redux';

import {signInReducer} from '../reducers/signInReducer';
import {graphReducer} from '../reducers/graphReducer';

export const rootReducer = combineReducers({
    signInReducer,
    graphReducer
});