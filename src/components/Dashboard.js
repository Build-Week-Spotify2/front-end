import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import Graph from './Graph';

const DashboardContainer = styled.div`
    max-width: 750px;
    max-height: 750px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const SongGraph = styled.div`
    color: black;
    border: 1px solid white;
    margin: 5px;
`

const Dashboard = () => {
    return (<>
        <DashboardContainer>
            <Search />

            <SongGraph>
                <Graph />
            </SongGraph>
        </DashboardContainer>
    </>)
}

export default Dashboard;