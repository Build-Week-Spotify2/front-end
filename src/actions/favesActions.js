export const setFaves = selectedFave => {
    return {type: 'SET_FAVORITE_SONG', payload: selectedFave}
}

export const removeFaves = faveToRemove => {
    return {type: 'REMOVE_FAVORITE_SONG', payload: faveToRemove}
}