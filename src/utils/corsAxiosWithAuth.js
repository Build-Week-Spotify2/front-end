import axios from 'axios';

export const corsAxiosWithAuth = () => {
    const token = localStorage.getItem('auth-token')

    return axios.create({
        baseURL: 'https://cors-anywhere.herokuapp.com/https://sss-2020.herokuapp.com/api',
        headers: {
            authorization: token
        }
    })
}