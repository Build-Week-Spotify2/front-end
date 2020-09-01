import React from 'react';
import CanvasJSReact from '../canvasjs.react'
import {connect} from 'react-redux';
import {setGraphData, purgeOptions} from '../actions/graphActions';
import styled from 'styled-components';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphContainer = styled.div`
    max-width: 700px;
    margin: 0 auto
`
const Functionality = styled.div`
    position: relative;
    display: inline-block;
    top: 0%;
    left: 95%;
    font-weight: 900;
    border: 1px solid black;
    background-color: grey;
    padding: 5px 10px 5px 10px;
    border-radius: 10px;
    margin: 5px;

    &:hover {
        background-color: black;
        color: red;
    }
`


const Graph = (props) => {

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        title:{
            // text: props.graphOnProps.dataPoints.song_name
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}",		
            startAngle: -90,
            dataPoints: [
                { y: (props.graphOnProps.dataPoints.danceability * 100), label: "Danceability" },
                { y: (props.graphOnProps.dataPoints.energy * 100), label: "Energy" },
                { y: (props.graphOnProps.dataPoints.acousticness * 100), label: "Acousticness" },
                { y: (props.graphOnProps.dataPoints.liveness * 100), label: "Loudness" }	
            ]
        }]
    }

    return(<>
        <GraphContainer>
            <Functionality onClick={() => {props.purgeOptions()}}>
                x
            </Functionality>
            <CanvasJSChart options = {options} />
        </GraphContainer>
    </>)
}

const mapStateToProps = state => {
    return {
        graphOnProps: state.graphReducer
    }
}

export default connect(
    mapStateToProps,
    {setGraphData, purgeOptions}
)(Graph)