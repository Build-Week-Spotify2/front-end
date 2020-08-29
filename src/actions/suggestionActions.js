export const setSuggestions = suggestions => {
    return {type: 'SET_SUGGESTIONS', payload: suggestions}
}

export const setSuggestedData = suggestions => {
    return {type: 'SET_SUGGESTED_DATA', payload: suggestions}
}