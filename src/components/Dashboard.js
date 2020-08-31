import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import Graph from './Graph';
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
    const deleteSong = () => {
        axiosWithAuth()
        .delete('/songs/29')
        .then((res) => {
            console.log('succesfully deleted', res)
        })
        
        .catch((res) => {
            console.log('failed deletion', res)
        })
    }


const Dashboard = () => {



    return (<>
        <DashboardContainer>
            <Search />
        </DashboardContainer>
    </>)
}

export default Dashboard;