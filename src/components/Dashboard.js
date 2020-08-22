import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
    max-width: 750px;
    max-height: 750px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;
    display: flex;
    justify-content: center;
`

const SongInfo = styled.div`
    color: black;
    border: 1px solid white;
    margin: 5px;
`

const SongGraph = styled.div`
    color: black;
    border: 1px solid white;
    margin: 5px;
`
const SongImage = styled.div`
    width: 200px;
    height: 200px;
`

const SongText = styled.div`
    color: white;
    line-height: .5em;
`

const Dashboard = () => {
    return (<>
        <DashboardContainer>
            <SongInfo>
                <SongImage>
                <img src='https://i.scdn.co/image/ab67616d00001e02eaccf766c181fa3ff24048d4' alt='Album Artwork'/>
                </SongImage>
                <SongText>
                    <p>Artist: The Ghost Inside</p>
                    <p>Album: Get What You Give</p>
                    <p>Song: Engine 45</p>
                </SongText>
            </SongInfo>
            <SongGraph>
                <p>graph here</p>
            </SongGraph>
        </DashboardContainer>
    </>)
}

export default Dashboard;