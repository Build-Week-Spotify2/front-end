import React, {useEffect} from 'react';
import styled from 'styled-components';
import Search from './Search';
import {axiosWithAuth} from '../utils/axiosWithAuth';


const DashboardContainer = styled.div`
    max-width: 750px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Dashboard = () => {

    useEffect(() => {
        axiosWithAuth()
        .delete('/songs/46')
        .then((res) => console.log(res))
        .catch((res) => console.log(res))
    })
    

    return (<>
        <DashboardContainer>
            <Search />
        </DashboardContainer>
    </>)
}

export default Dashboard;