import React, {useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

const NavContainer = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    background-image: linear-gradient(black, #666666);
`

const NavItem = styled.div`
    width: 90px;
    font-weight: 700;
    height: 20px;
    text-align: center;
    
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    background-color: black;

    &:hover {
        background-color: #1DB954;
        cursor: pointer;
    }
`

const NavUser = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 2%;
    text-align: center;

    @media (max-width: 510px) {
        top: 0;
        right: calc(50% - 26px);
    }

`

const NavBar = (props) => {

    function signOut() {
        localStorage.removeItem('auth-token')
        window.localStorage.removeItem('spotify-auth')
        window.location.href='/'
    }

    return(
        <NavContainer>
            <NavItem><Link to='/dashboard'>Home</Link></NavItem>
            {/* <NavItem><Link to='/saved-songs'>Saved Songs</Link></NavItem> */}
            <NavItem><Link to='/playlists'>Playlists</Link></NavItem>
            <NavItem><a href='https://spotify-build-dh.netlify.app/'>About</a></NavItem>

            {localStorage.getItem('auth-token') ? (
            <NavUser>
                <div className='username'>{props.userOnProps.user}</div>
                <div onClick={signOut} className='sign-out'>Sign Out</div>
            </NavUser>
            ) : (
                <></>
            )}
        </NavContainer>
    )
}

const mapStateToProps = state => {
    return {
        userOnProps: state.signInReducer
    }
}

export default connect(
    mapStateToProps,
    {}
)(NavBar)