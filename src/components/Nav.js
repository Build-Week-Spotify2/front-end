import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const NavContainer = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    background-image: linear-gradient(black, #666666);
`

const NavItem = styled.div`
    width: 95px;
    font-weight: 700;
    height: 20px;
    text-align: center;
    
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    background-color: white;

    &:hover {
        background-color: #1DB954;
    }
`

const NavUser = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 2%;
    text-align: center;

`

const NavBar = () => {
    return(
        <NavContainer>
            <NavItem><Link to='/dashboard'>Home</Link></NavItem>
            <NavItem><Link to='/saved-songs'>Saved Songs</Link></NavItem>
            <NavItem><Link to='/search-songs'>Search</Link></NavItem>
            <NavUser><div>Username</div><div>Sign Out</div></NavUser>
        </NavContainer>
    )
}

export default NavBar;