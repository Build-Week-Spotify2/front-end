import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('auth-token')

    return axios.create({
        baseURL: 'https://spotify-song-suggester2020.herokuapp.com/api',
        headers: {
            authorization: token
        }
    })
}