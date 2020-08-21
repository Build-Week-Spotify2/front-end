import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const NavContainer = styled.div`
    border: 1px solid black;
    margin: 0 auto;
`

const NavBar = () => {
    return(
        <NavContainer>
            <div><Link to='/dashboard'>Home</Link></div>
            <div><Link to='/saved-songs'>Saved Songs</Link></div>
            <div><Link to='/search-songs'>Search</Link></div>
            <div><Link to='/'>Sign Out</Link></div>
        </NavContainer>
    )
}

export default NavBar;