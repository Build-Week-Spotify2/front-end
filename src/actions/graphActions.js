export const setGraphData = graphData => {
    return {type: 'SET_OPTIONS', payload: graphData}
}

export const purgeOptions = purge => {
    return {type: 'PURGE_OPTIONS', payload: purge}
}