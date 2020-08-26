import React from 'react';
import CanvasJSReact from '../canvasjs.react'
import {connect} from 'react-redux';
import {setGraphData} from '../actions/graphActions';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;




const Graph = (props) => {

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        title:{
            text: "Song Name Features"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}",		
            startAngle: -90,
            dataPoints: [
                { y: props.graphOnProps.Danceability, label: "Danceability" },
                { y: props.graphOnProps.Instrumantalism, label: "Instrumantalism" },
                { y: props.graphOnProps.Acousticness, label: "Acousticness" },
                { y: props.graphOnProps.Loudness, label: "Loudness" }	
            ]
        }]
    }

    return(<>
    
        <CanvasJSChart options = {options} />
        
    </>)
}

const mapStateToProps = state => {
    return {
        graphOnProps: state.graphReducer
    }
}

export default connect(
    mapStateToProps,
    {setGraphData}
)(Graph)