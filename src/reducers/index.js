import {combineReducers} from 'redux';

import {signInReducer} from '../reducers/signInReducer';
import {graphReducer} from '../reducers/graphReducer';
import {searchReducer} from '../reducers/searchReducer';
import {favesReducer} from '../reducers/favesReducer';
import {suggestionsReducer} from '../reducers/suggestionsReducer';
import {playlistReducer} from '../reducers/playlistReducer';
import {activePlaylistReducer} from '../reducers/activePlaylistReducer';

export const rootReducer = combineReducers({
    signInReducer,
    graphReducer,
    searchReducer,
    favesReducer,
    suggestionsReducer,
    playlistReducer,
    activePlaylistReducer
});