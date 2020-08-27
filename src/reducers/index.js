import {combineReducers} from 'redux';

import {signInReducer} from '../reducers/signInReducer';
import {graphReducer} from '../reducers/graphReducer';
import {searchReducer} from '../reducers/searchReducer';

export const rootReducer = combineReducers({
    signInReducer,
    graphReducer,
    searchReducer
});