import React from 'react';
import styled from 'styled-components'

const SavedSongsContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #393C41;
`
const SavedSong = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 10px;

`

const SongImage = styled.div`
    width: 100px;
    height: 100px;
`

const SongInfo = styled.div`
    color: white;
    line-height: .5em;
`

const RemoveSong = styled.div`
    color: white;
    text-align: center;
    width: 30px;
    padding: 5px 0px;
    border-radius: 20px;
    background-color: #1DB954;

    &:hover {
        background-color: red;
        cursor: pointer;
        font-weight: 900;
        color: black;
    }
`

const SavedSongs = () => {
    return(<>
        <SavedSongsContainer>
            <SavedSong>
                <SongImage>
                <img src='https://i.scdn.co/image/ab67616d00001e02eaccf766c181fa3ff24048d4' alt='Album Artwork'/>
                </SongImage>
                <SongInfo>
                    <p>Artist: The Ghost Inside</p>
                    <p>Album: Get What You Give</p>
                    <p>Song: Engine 45</p>
                </SongInfo>
                <RemoveSong>
                    X
                </RemoveSong>
            </SavedSong>
        </SavedSongsContainer>
    </>)
}

export default SavedSongs;