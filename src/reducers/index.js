import {combineReducers} from 'redux';

import {signInReducer} from '../reducers/signInReducer';
import {graphReducer} from '../reducers/graphReducer';
import {searchReducer} from '../reducers/searchReducer';
import {favesReducer} from '../reducers/favesReducer';

export const rootReducer = combineReducers({
    signInReducer,
    graphReducer,
    searchReducer,
    favesReducer
});