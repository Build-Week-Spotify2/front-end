import axios from 'axios';

export const spotifyWithAuth = () => {
    const token = localStorage.getItem('spotify-auth')

    return axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        headers: {'Authorization': 'Bearer ' + token}
    })
}